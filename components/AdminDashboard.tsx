import { useEffect, useState } from "react";
import { Database } from "lucide-react";
import { bookingAPI, providerAPI } from "../services/supabaseClient";
import { BookingDetails, RegistrationForm, User } from "../types";

interface AdminDashboardProps {
  bookings: BookingDetails[];
  registrations: RegistrationForm[];
  users: User[];
  onAddUser: (user: User) => Promise<void>;
  onDeleteUser: (username: string) => Promise<void>;
  onAssignBooking: (bookingId: number, providerUsername: string) => Promise<void>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  bookings,
  registrations
}) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"BOOKINGS" | "REGISTRATIONS">(
    "BOOKINGS"
  );

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-50 border border-green-200 text-green-700">
            <Database size={12} />
            SUPABASE CONNECTED
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("BOOKINGS")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "BOOKINGS"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab("REGISTRATIONS")}
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "REGISTRATIONS"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
          >
            Registrations ({registrations.length})
          </button>
        </div>

        {/* BOOKINGS */}
        {activeTab === "BOOKINGS" && (
          <div className="bg-white rounded-lg shadow border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="border-t">
                      <td className="p-3">{b.customerName}</td>
                      <td className="p-3">{b.customerPhone}</td>
                      <td className="p-3">{b.serviceName}</td>
                      <td className="p-3">{b.date}</td>
                      <td className="p-3">{b.time}</td>
                      <td className="p-3 font-semibold">{b.status}</td>
                      <td className="p-3">₹{b.price}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* REGISTRATIONS */}
        {activeTab === "REGISTRATIONS" && (
          <div className="bg-white rounded-lg shadow border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Experience</th>
                  <th className="p-3 text-left">City</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      No registrations found
                    </td>
                  </tr>
                ) : (
                  registrations.map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{r.fullName}</td>
                      <td className="p-3">{r.phone}</td>
                      <td className="p-3">{r.category}</td>
                      <td className="p-3">{r.experience}</td>
                      <td className="p-3">{r.city}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
