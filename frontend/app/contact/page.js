'use client';

import { motion } from 'framer-motion';
import PublicLayout from '../../components/Layout/PublicLayout';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-heading"
          >
            Get in touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Have a question or need help? Our support team is here for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email</h3>
                <p className="text-slate-600">bhattg439@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Live Chat</h3>
                <p className="text-slate-600">Available Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Office</h3>
                <p className="text-slate-600">New Tehri, Uttarakhand<br />India, 249001</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea id="message" rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
