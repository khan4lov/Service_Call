import { createClient } from '@supabase/supabase-js';

// ============================================================================
// SUPABASE CLIENT (ONE LOGIN SYSTEM FOR ALL USERS)
// ============================================================================

// (🔥 You ALREADY provided these — safe to embed or use via .env)
const SUPABASE_URL = "https://jlfscyobofwzvuznwfsj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnNjeW9ib2Z3enZ1em53ZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjkwNTAsImV4cCI6MjA4MjA0NTA1MH0.W_87Q-3bQzfpU9PxS6ZHtTIxdM9JJ6ArexWvYO3p3DI";

// Create the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// USER AUTH API (Login / Signup / Logout)
// ============================================================================

export const authAPI = {
  signup: async (email: string, password: string, fullName: string, phone: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: "user"      // all users default role
        }
      }
    });

    if (authError) throw authError;

    return authData;
  },

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;

    return data;
  },

  logout: async () => {
    await supabase.auth.signOut();
  },

  getCurrentUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user || null;
  }
};

// ============================================================================
// BOOKINGS API
// ============================================================================

export const bookingAPI = {
  createBooking: async (booking: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        service_id: booking.serviceId,
        service_name: booking.serviceName,
        category: booking.category,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        customer_name: booking.customerName,
        customer_phone: booking.customerPhone,
        price: booking.price,
        status: "PENDING",
        provider_id: booking.providerId || null
      }])
      .select();

    if (error) throw error;
    return data[0];
  },

  updateBookingStatus: async (bookingId: string, status: string, providerId?: string) => {
    const updates: any = { status };
    if (providerId) updates.provider_id = providerId;

    const { error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId);

    if (error) throw error;
  },

  getAllBookings: async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
};

// ============================================================================
// PROVIDER REGISTRATION API
// ============================================================================

export const providerAPI = {
  registerProvider: async (form: any) => {
    const { error } = await supabase.from('registrations').insert([
      {
        full_name: form.fullName,
        phone: form.phone,
        category: form.category,
        experience: form.experience,
        city: form.city,
        submitted_at: new Date().toISOString()
      }
    ]);

    if (error) throw error;
  },

  getAllRegistrations: async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data;
  }
};
