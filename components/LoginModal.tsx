
import React, { useState } from 'react';
import type { User } from '../types';
import { X, Lock, User as UserIcon } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  users: User[];
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin(user);
      onClose();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <div className="bg-primary p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Partner Login</h2>
            <p className="text-blue-200 text-sm mt-1">Access your dashboard</p>
        </div>

        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-lg font-bold shadow-md transition-colors"
                >
                    Login
                </button>
            </form>
            
            <div className="mt-6 text-center bg-slate-50 p-3 rounded text-xs text-slate-500 border border-slate-100">
                <p><strong>Admin Demo:</strong> admin / password</p>
                <p><strong>Provider Demo:</strong> electrician / password</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
