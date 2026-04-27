'use client';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [user, router, mounted]);

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
        <Navbar toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
