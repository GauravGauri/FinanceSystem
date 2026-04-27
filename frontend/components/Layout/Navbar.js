'use client';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ toggleSidebar, onLogoutRequest }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50 w-full">
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

        </h2>
      </div>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
            {user ? user.name.charAt(0).toUpperCase() : 'G'}
          </div>
          <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu with Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm text-gray-500 font-medium">Signed in as</p>
                <p className="text-base font-bold text-slate-900 truncate">{user ? user.name : 'Guest User'}</p>
                <p className="text-xs text-gray-400 truncate">{user ? user.email : ''}</p>
              </div>

              <div className="py-1">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <User size={18} />
                  <span>User Info</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                >
                  <Settings size={18} />
                  <span>Account Settings</span>
                </Link>
              </div>

              <div className="border-t border-gray-50 py-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogoutRequest();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
