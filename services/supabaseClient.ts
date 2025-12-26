import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jlfscyobofwzvuznwfsj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpsZnNjeW9ib2Z3enZ1em53ZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0NjkwNTAsImV4cCI6MjA4MjA0NTA1MH0.W_87Q-3bQzfpU9PxS6ZHtTIxdM9JJ6ArexWvYO3p3DI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================= BOOKINGS API =================
export const bookingAPI = {
  async createBooking(booking: any) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
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
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateBookingStatus(id: number, status: string, providerId?: string) {
    const { error } = await supabase
      .from('bookings')
      .update({
        status,
        provider_id: providerId ?? null
      })
      .eq('id', id);

    if (error) throw error;
  }
};

// ================= PROVIDERS =================
export const providerAPI = {
  async registerProvider(form: any) {
    const { error } = await supabase.from('registrations').insert({
      full_name: form.fullName,
      phone: form.phone,
      category: form.category,
      experience: form.experience,
      city: form.city,
      submitted_at: new Date().toISOString()
    });

    if (error) throw error;
  }
};
