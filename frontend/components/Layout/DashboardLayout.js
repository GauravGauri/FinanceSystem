'use client';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logout } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import ConfirmModal from '../UI/ConfirmModal';

export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [user, router, mounted]);

  const confirmLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/login');
  };

  if (!mounted) {
    return null; // Match server render
  }

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      {/* Mobile sidebar overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isMobileSidebarOpen} closeSidebar={() => setIsMobileSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col md:ml-64 w-full h-screen overflow-y-auto">
        <Navbar 
          toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
          onLogoutRequest={() => setShowLogoutModal(true)}
        />
        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Log Out"
        message="Are you sure you want to log out of GauravMoney?"
        confirmText="Log Out"
        cancelText="Stay Logged In"
      />
    </div>
  );
}
