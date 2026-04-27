'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { FiHome, FiList, FiPieChart, FiFileText, FiLogOut } from 'react-redux';
// We will use react-icons. Let's fix the import.
import { FaHome, FaList, FaBriefcase, FaFilePdf, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function Sidebar({ isOpen, closeSidebar }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaHome className="mr-3 text-lg" /> },
    { name: 'Transactions', href: '/transactions', icon: <FaList className="mr-3 text-lg" /> },
    { name: 'Budgets', href: '/budgets', icon: <FaBriefcase className="mr-3 text-lg" /> },
    { name: 'Goals', href: '/goals', icon: <FaFilePdf className="mr-3 text-lg" /> },
    { name: 'Portfolio', href: '/portfolio', icon: <FaBriefcase className="mr-3 text-lg" /> },
    { name: 'Reports', href: '/reports', icon: <FaFilePdf className="mr-3 text-lg" /> },
  ];

  return (
    <div className={`flex flex-col w-64 bg-slate-900 h-screen text-white shadow-xl fixed top-0 left-0 bottom-0 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex items-center justify-between px-6 h-20 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 relative">
            <Image src="/logo.png" alt="GauravMoney Logo" width={32} height={32} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300 font-heading">
            Gaurav<span className="text-emerald-500">Money</span>
          </h1>
        </div>
        <button className="md:hidden text-slate-400 hover:text-white" onClick={closeSidebar}>
          <FaTimes size={20} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto pt-6">
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                pathname === item.href
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <FaSignOutAlt className="mr-3 text-lg" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
