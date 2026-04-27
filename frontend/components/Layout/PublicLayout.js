'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PublicLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 relative flex items-center justify-center">
                <Image src="/logo.png" alt="GauravMoney Logo" width={40} height={40} className="object-contain" />
              </div>
              <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 font-heading">
                Gaurav<span className="text-emerald-500">Money</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/' ? 'text-emerald-600' : 'text-slate-600'}`}>Home</Link>
              <Link href="/about" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/about' ? 'text-emerald-600' : 'text-slate-600'}`}>About</Link>
              <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${pathname === '/contact' ? 'text-emerald-600' : 'text-slate-600'}`}>Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors hidden sm:block">
                Log in
              </Link>
              <Link href="/signup">
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image src="/logo.png" alt="GauravMoney Logo" width={32} height={32} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white font-heading">GauravMoney</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              The modern way to track your net worth, budget your life, and achieve your financial goals.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} GauravMoney. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex gap-4">
            {/* Social Icons would go here */}
          </div>
        </div>
      </footer>
    </div>
  );
}
