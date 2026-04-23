'use client';

import { useSelector } from 'react-redux';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center md:hidden">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500">FinTrack</h1>
      </div>
      <div className="hidden md:block">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, {user ? user.name : 'Guest'}! 👋
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md">
          {user ? user.name.charAt(0).toUpperCase() : 'G'}
        </div>
      </div>
    </div>
  );
}
