import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jlfscyobofwzvuznwfsj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnNjeW9ib2Z3enZ1em53ZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjkwNTAsImV4cCI6MjA4MjA0NTA1MH0.W_87Q-3bQzfpU9PxS6ZHtTIxdM9JJ6ArexWvYO3p3DI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =======================================================
// BOOKINGS API ✅ FINAL WORKING VERSION
// =======================================================

export const bookingAPI = {
  createBooking: async (booking: any) => {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        service_id: Number(booking.serviceId),   // 🔴 ensure int8
        service_name: booking.serviceName,
        category: booking.category,
        date: booking.date,
        time: booking.time,
        address: booking.address,
        customer_name: booking.customerName,
        customer_phone: booking.customerPhone,
        price: booking.price,
        status: 'PENDING',
        provider_id: null  // ✅ OK only if column allows NULL
      })
      .select()
      .single();

    if (error) {
      console.error("❌ SUPABASE BOOKING INSERT ERROR:", error);
      throw error;
    }

    console.log("✅ BOOKING SAVED:", data);
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
  }
};
