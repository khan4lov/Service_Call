import { createClient } from '@supabase/supabase-js';

// ============================================================================
// SUPABASE CLIENT
// ============================================================================

const SUPABASE_URL = "https://jlfscyobofwzvuznwfsj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // same key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
// BOOKINGS API  ✅ FIXED
// ============================================================================

export const bookingAPI = {
  createBooking: async (booking: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        // ❌ id NEVER SEND (Supabase auto generates)
        service_id: booking.serviceId,
        service_name: booking.serviceName,
        category: booking.category,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        customer_name: booking.customerName,
        customer_phone: booking.customerPhone,
        price: booking.price,
        status: 'PENDING',
        provider_id: null
      })
      .select()
      .single();

    if (error) {
      console.error("❌ BOOKING INSERT ERROR:", error);
      throw error;
    }

    return data;
  },

  getAllBookings: async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("❌ FETCH BOOKINGS ERROR:", error);
      throw error;
    }

    return data;
  },

  updateBookingStatus: async (id: number, status: string, providerId?: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({
        status,
        provider_id: providerId || null
      })
      .eq('id', id);

    if (error) throw error;
  }
};

// ============================================================================
// PROVIDER REGISTRATION (UNCHANGED)
// ============================================================================

export const providerAPI = {
  registerProvider: async (form: any) => {
    const { error } = await supabase.from('registrations').insert({
      full_name: form.fullName,
      phone: form.phone,
      category: form.category,
      experience: form.experience,
      city: form.city,
      submitted_at: new Date().toISOString()
    });

    if (error) throw error;
  },

  getAllRegistrations: async () => {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
