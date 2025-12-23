
import { createClient } from '@supabase/supabase-js';
import { INITIAL_USERS, INITIAL_BOOKINGS, INITIAL_REGISTRATIONS } from '../constants';
import type { User, BookingDetails, RegistrationForm, CategoryType } from '../types';

// ============================================================================
// CONFIGURATION
// ============================================================================

// Declare process to avoid TypeScript errors
declare const process: any;

// Get keys from injected process.env (configured in vite.config.ts)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

// Checks if the user has actually set the keys
export const isSupabaseConfigured = 
  SUPABASE_URL.length > 0 && 
  SUPABASE_ANON_KEY.length > 0 && 
  SUPABASE_URL.startsWith('https://');

// Create the client
export const supabase = isSupabaseConfigured 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ============================================================================
// DATA API (Handles switching between Local Memory and Real Database)
// ============================================================================

// Local memory storage (fallback if no DB connected)
let localUsers = [...INITIAL_USERS];
let localBookings = [...INITIAL_BOOKINGS];
let localRegistrations = [...INITIAL_REGISTRATIONS];

export const api = {
  
  fetchAllData: async () => {
    if (!supabase) {
      console.log('Using Local Demo Data (No Database Connected)');
      return {
        users: localUsers,
        bookings: localBookings,
        registrations: localRegistrations
      };
    }

    try {
      const [usersRes, bookingsRes, regRes] = await Promise.all([
        supabase.from('users').select('*'),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('registrations').select('*').order('submitted_at', { ascending: false })
      ]);

      if (usersRes.error) throw usersRes.error;

      const mapBooking = (b: any): BookingDetails => ({
        id: b.id.toString(),
        serviceId: b.service_id,
        serviceName: b.service_name,
        category: b.category as CategoryType,
        date: b.date,
        time: b.time,
        address: b.address,
        customerName: b.customer_name,
        customerPhone: b.customer_phone,
        price: Number(b.price),
        status: b.status,
        providerId: b.provider_id,
        createdAt: b.created_at
      });

      const mapReg = (r: any): RegistrationForm => ({
        id: r.id.toString(),
        fullName: r.full_name,
        phone: r.phone,
        category: r.category,
        experience: r.experience,
        city: r.city,
        submittedAt: r.submitted_at
      });

      return {
        users: usersRes.data || [],
        bookings: (bookingsRes.data || []).map(mapBooking),
        registrations: (regRes.data || []).map(mapReg)
      };

    } catch (error) {
      console.error("Supabase connection error:", error);
      return { users: localUsers, bookings: localBookings, registrations: localRegistrations };
    }
  },

  createBooking: async (booking: BookingDetails) => {
    if (!supabase) {
      localBookings = [booking, ...localBookings];
      return booking;
    }

    const { data, error } = await supabase.from('bookings').insert([{
      service_id: booking.serviceId,
      service_name: booking.serviceName,
      category: booking.category,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      customer_name: booking.customerName,
      customer_phone: booking.customerPhone,
      price: booking.price,
      status: 'PENDING'
    }]).select();
    
    if (error) throw error;
    return data[0];
  },

  updateBooking: async (bookingId: string, updates: Partial<BookingDetails>) => {
    if (!supabase) {
      localBookings = localBookings.map(b => b.id === bookingId ? { ...b, ...updates } : b);
      return;
    }

    const dbUpdates: any = {};
    if (updates.status) dbUpdates.status = updates.status;
    if (updates.providerId) dbUpdates.provider_id = updates.providerId;

    await supabase.from('bookings').update(dbUpdates).eq('id', bookingId);
  },

  createRegistration: async (reg: RegistrationForm) => {
    if (!supabase) {
      localRegistrations = [reg, ...localRegistrations];
      return;
    }

    await supabase.from('registrations').insert([{
      full_name: reg.fullName,
      phone: reg.phone,
      category: reg.category,
      experience: reg.experience,
      city: reg.city
    }]);
  },

  createUser: async (user: User) => {
    if (!supabase) {
      localUsers = [...localUsers, user];
      return;
    }

    await supabase.from('users').insert([user]);
  },

  deleteUser: async (username: string) => {
    if (!supabase) {
      localUsers = localUsers.filter(u => u.username !== username);
      return;
    }

    await supabase.from('users').delete().eq('username', username);
  }
};
