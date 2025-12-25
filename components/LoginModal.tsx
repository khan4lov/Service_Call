import React, { useState } from 'react';
import { X, Lock, User as UserIcon } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const usernameToEmail = (uname: string) =>
    `${uname}@serviceoncall.local`.toLowerCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const email = usernameToEmail(username);

    // 1️⃣ Auth login
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !authData.user) {
      setError('Invalid username or password');
      return;
    }

    // 2️⃣ Fetch user profile from public.users
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      setError('User profile not found');
      return;
    }

    // 3️⃣ Role check
    if (profile.role !== 'ADMIN') {
      setError('Unauthorized access');
      return;
    }

    // 4️⃣ Login success
    onLogin(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="bg-primary p-6 text-center">
          <h2 className="text-2xl font-bold text-white">Partner Login</h2>
          <p className="text-blue-200 text-sm mt-1">Access your dashboard</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-accent text-white py-3 rounded-lg font-bold"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <strong>Admin:</strong> admin / password
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
