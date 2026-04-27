'use client';

import { useSelector } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';

export default function Navbar({ toggleSidebar }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center md:hidden gap-3">
        <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 -ml-2">
          <FaBars size={24} />
        </button>
        <div className="w-8 h-8 relative">
          <Image src="/logo.png" alt="GauravMoney Logo" width={32} height={32} className="object-contain" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 font-heading">Gaurav<span className="text-emerald-500">Money</span></h1>
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
