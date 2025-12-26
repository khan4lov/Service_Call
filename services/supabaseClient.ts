import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Key if they are different
const SUPABASE_URL = "https://jlfscyobofwzvuznwfsj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnNjeW9ib2Z3enZ1em53ZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjkwNTAsImV4cCI6MjA4MjA0NTA1MH0.W_87Q-3bQzfpU9PxS6ZHtTIxdM9JJ6ArexWvYO3p3DI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =======================================================
// BOOKINGS API
// =======================================================

export const bookingAPI = {
  // ✅ Create Booking (Handles Number conversion safely)
  createBooking: async (booking: any) => {
    console.log("🚀 Receiving Booking Data:", booking);

    // 1. Force convert ID and Price to Numbers to prevent "text" vs "int8" mismatch
    const safeServiceId = booking.serviceId ? Number(booking.serviceId) : null;
    const safePrice = booking.price ? Number(booking.price) : 0;

    // 2. Prepare Payload mapping (Frontend Keys -> DB Columns)
    const payload = {
      service_id: safeServiceId,       // DB column: service_id
      service_name: booking.serviceName,
      category: booking.category,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      customer_name: booking.customerName, // Your modal sends 'customerName'
      customer_phone: booking.customerPhone,
      price: safePrice,
      status: 'PENDING',
      provider_id: null // Explicitly sending null for new bookings
    };

    console.log("📤 Sending Payload to Supabase:", payload);

    // 3. Insert into DB
    const { data, error } = await supabase
      .from('bookings')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("❌ SUPABASE INSERT ERROR:", error);
      throw error;
    }

    console.log("✅ Booking Saved Successfully:", data);
    return data;
  },

  // ✅ Get All Bookings
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

  // ✅ Update Booking Status (For Admin/Provider)
  updateBookingStatus: async (bookingId: number, status: string, providerUsername?: string) => {
    const updateData: any = { status };
    if (providerUsername) {
        updateData.provider_id = providerUsername;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select();

    if (error) {
      console.error("❌ UPDATE STATUS ERROR:", error);
      throw error;
    }
    return data;
  }
};

// =======================================================
// PROVIDER API (For Registration)
// =======================================================
export const providerAPI = {
  registerProvider: async (providerData: any) => {
    const { data, error } = await supabase
      .from('registrations')
      .insert([providerData])
      .select();

    if (error) {
      console.error("❌ REGISTRATION ERROR:", error);
      throw error;
    }
    return data;
  }
};
