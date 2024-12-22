import React from 'react';
import { Wallet } from 'lucide-react';

interface HeaderProps {
  email: string;
  balance: number;
  onLogout: () => void;
}

export default function Header({ email, balance, onLogout }: HeaderProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Color Trading</h2>
          <p className="text-gray-600">Welcome, {email}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
            <Wallet className="text-blue-500" />
            <span className="text-xl font-bold text-blue-700">${balance.toFixed(2)}</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}