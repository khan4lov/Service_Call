
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import type { RegistrationForm } from '../types';
import { CheckCircle, Briefcase, DollarSign, Clock, ChevronRight } from 'lucide-react';

interface RegisterProfessionalProps {
  onSubmit: (data: RegistrationForm) => void;
}

const RegisterProfessional: React.FC<RegisterProfessionalProps> = ({ onSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    category: '',
    experience: '',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
        const registration: RegistrationForm = {
            id: `R${Math.floor(Math.random() * 10000)}`,
            fullName: formData.fullName,
            phone: formData.phone,
            category: formData.category,
            experience: formData.experience,
            city: formData.city,
            submittedAt: new Date().toISOString()
        };
        onSubmit(registration);
        setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Registration Successful!</h2>
        <p className="text-lg text-slate-600 max-w-md">
          Thank you for showing interest in joining "Service on Call". Our partner support team will contact you on <strong>{formData.phone}</strong> within 24 hours for verification.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 text-accent font-semibold hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Grow Your Business with Us</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join 500+ professionals who are earning more and getting regular customers through Service on Call.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column: Benefits */}
          <div className="flex-1 space-y-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg text-accent">
                   <DollarSign size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">0% Joining Fee</h3>
                   <p className="text-slate-600">Start your journey without any investment. Pay only a small commission on completed jobs.</p>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg text-green-600">
                   <Briefcase size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Guaranteed Jobs</h3>
                   <p className="text-slate-600">Get consistent bookings in your local area. No more waiting for work.</p>
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
                   <Clock size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-2">Flexible Timings</h3>
                   <p className="text-slate-600">Be your own boss. Choose your working hours and availability.</p>
                </div>
             </div>
             
             <div className="bg-primary text-white p-8 rounded-2xl mt-8">
                <h3 className="text-2xl font-bold mb-4">Partner Success Story</h3>
                <p className="italic mb-4 text-slate-300">"Since joining Service on Call, my monthly income has doubled. The app is easy to use and payments are always on time."</p>
                <div className="flex items-center gap-3">
                   <img src="https://picsum.photos/50/50?random=100" className="w-12 h-12 rounded-full border-2 border-white" alt="Partner" />
                   <div>
                      <p className="font-bold">Ramesh Gupta</p>
                      <p className="text-sm text-slate-400">AC Technician, Karnal</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Register as a Professional</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    placeholder="Enter your name as per ID"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-sm">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      placeholder="98765 43210"
                      className="w-full p-3 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Select Your Profession</label>
                  <select 
                    name="category"
                    required
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none bg-white"
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Experience (Years)</label>
                    <input 
                      type="number" 
                      name="experience"
                      required
                      placeholder="e.g. 5"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      placeholder="e.g. Panipat"
                      className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Submit Application <ChevronRight size={20} />
                </button>
                
                <p className="text-xs text-center text-slate-500 mt-4">
                  By clicking Submit, you agree to our Terms & Conditions and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProfessional;
