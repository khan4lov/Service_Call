import React, { useState } from 'react';
import type { Service, BookingDetails } from '../types';
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (details: BookingDetails) => Promise<void>;
}

const BookingModal: React.FC<BookingModalProps> = ({
  service,
  isOpen,
  onClose,
  onConfirmBooking
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    name: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload: BookingDetails = {
      // ❌ id mat bhejo (Supabase khud banata hai)
      serviceId: service.id,
      serviceName: service.name,
      category: service.category,
      date: formData.date,
      time: formData.time,
      address: formData.address,
      customerName: formData.name,
      customerPhone: formData.phone,
      price: service.price,
      status: 'PENDING'
    };

    try {
      await onConfirmBooking(bookingPayload); // ✅ REAL INSERT
      setStep(3);
    } catch (err) {
      alert('Booking failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData({ date: '', time: '', address: '', name: '', phone: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">

        {step < 3 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-1">Book {service.name}</h2>
            <p className="text-sm text-gray-500 mb-6">Step 1 of 2</p>

            <form onSubmit={() => setStep(2)}>
              <div className="space-y-4">
                <div>
                  <label className="flex gap-2 items-center text-sm font-medium">
                    <Calendar size={16} /> Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="flex gap-2 items-center text-sm font-medium">
                    <Clock size={16} /> Time
                  </label>
                  <select
                    name="time"
                    required
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-white"
                  >
                    <option value="">Select time</option>
                    <option value="09:00 AM">09–10 AM</option>
                    <option value="11:00 AM">11–12 PM</option>
                    <option value="02:00 PM">02–03 PM</option>
                    <option value="05:00 PM">05–06 PM</option>
                  </select>
                </div>
              </div>

              <button className="mt-6 w-full bg-accent text-white py-3 rounded-lg">
                Next
              </button>
            </form>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-1">Confirm Details</h2>
            <p className="text-sm text-gray-500 mb-6">Step 2 of 2</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <input
                name="address"
                placeholder="Address"
                required
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />

              <div className="bg-blue-50 p-3 rounded text-sm">
                Estimated Total: ₹{service.price}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border py-3 rounded-lg"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg"
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="p-8 text-center">
            <CheckCircle size={40} className="mx-auto text-green-600 mb-4" />
            <h2 className="text-xl font-bold mb-2">Booking Successful</h2>
            <p className="text-sm text-gray-500 mb-6">
              Your booking has been saved successfully.
            </p>
            <button
              onClick={resetAndClose}
              className="w-full bg-accent text-white py-3 rounded-lg"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
