
import React from 'react';
import type { BookingDetails, User } from '../types';
import { Briefcase, Calendar, MapPin, CheckCircle, Lock } from 'lucide-react';

interface ProviderDashboardProps {
  user: User;
  bookings: BookingDetails[];
  onAcceptBooking: (bookingId: string) => void;
}

const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ user, bookings, onAcceptBooking }) => {
  // Filter bookings:
  // 1. Matches provider's category
  // 2. AND (Status is PENDING OR Status is ASSIGNED to this user)
  const myBookings = bookings.filter(b => 
    b.category === user.category && 
    (b.status === 'PENDING' || (b.status === 'ASSIGNED' && b.providerId === user.username))
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome, {user.name}</h1>
                <p className="text-slate-500">Provider Dashboard • <span className="text-accent font-semibold">{user.category}</span></p>
            </div>
            <div className="flex gap-4">
                <div className="bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg font-medium text-sm">
                    {myBookings.filter(b => b.status === 'PENDING').length} Available
                </div>
                <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg font-medium text-sm">
                    {myBookings.filter(b => b.status === 'ASSIGNED' && b.providerId === user.username).length} My Jobs
                </div>
            </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Job Requests</h2>

        {myBookings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Briefcase size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-700">No requests yet</h3>
                <p className="text-slate-500">Wait for the admin to assign or new bookings to arrive.</p>
            </div>
        ) : (
            <div className="space-y-4">
                {myBookings.map(booking => {
                    const isAssignedToMe = booking.status === 'ASSIGNED' && booking.providerId === user.username;
                    
                    return (
                        <div key={booking.id} className={`bg-white p-6 rounded-xl shadow-sm border transition-colors ${isAssignedToMe ? 'border-accent' : 'border-slate-200 hover:border-slate-300'}`}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-lg text-slate-800">{booking.serviceName}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                            isAssignedToMe ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {isAssignedToMe ? 'ACCEPTED' : 'NEW REQUEST'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">Booking ID: <span className="font-mono text-slate-700">{booking.id}</span></p>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold text-slate-900">₹{booking.price}</div>
                                    <div className="text-xs text-slate-400">Cash/Online</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-slate-100 p-2 rounded text-slate-500"><Calendar size={18} /></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase">Date & Time</p>
                                            <p className="text-sm font-medium text-slate-800">{booking.date} at {booking.time}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Location Info (Partially hidden if pending) */}
                                    <div className="flex items-start gap-3">
                                        <div className="bg-slate-100 p-2 rounded text-slate-500"><MapPin size={18} /></div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-semibold uppercase">Location</p>
                                            {isAssignedToMe ? (
                                                <p className="text-sm font-medium text-slate-800">{booking.address}</p>
                                            ) : (
                                                <div className="flex items-center gap-2 text-slate-400 mt-1">
                                                    <Lock size={12} />
                                                    <span className="text-sm italic">Accept to view address</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Details (Hidden if pending) */}
                                {isAssignedToMe ? (
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Customer Details</p>
                                        <p className="font-bold text-slate-800">{booking.customerName}</p>
                                        <a href={`tel:${booking.customerPhone}`} className="text-accent font-mono text-sm hover:underline flex items-center gap-2 mt-1">
                                            {booking.customerPhone}
                                        </a>
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                                        <Lock className="text-slate-400 mb-2" size={24} />
                                        <p className="text-sm font-semibold text-slate-600">Customer details locked</p>
                                        <button 
                                            onClick={() => onAcceptBooking(booking.id)}
                                            className="mt-3 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                                        >
                                            <CheckCircle size={16} /> Accept Job
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

      </div>
    </div>
  );
};

export default ProviderDashboard;
