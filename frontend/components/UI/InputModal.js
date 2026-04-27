'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';

export default function InputModal({ isOpen, onClose, onConfirm, title, message, placeholder = "0.00" }) {
  const [value, setValue] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[-1]"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                  <DollarSign size={28} />
                </div>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 font-heading">{title}</h3>
              <p className="text-slate-500 text-lg mb-6 leading-relaxed">{message}</p>

              <div className="relative">
                <span className="absolute left-5 top-4.5 text-slate-400 font-bold text-xl">$</span>
                <input
                  autoFocus
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full pl-10 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold text-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder={placeholder}
                />
              </div>
            </div>

            <div className="p-8 bg-slate-50/80 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-100 transition-all hover:shadow-sm"
              >
                Cancel
              </button>
              <button
                disabled={!value || isNaN(value)}
                onClick={() => {
                  onConfirm(parseFloat(value));
                  setValue('');
                  onClose();
                }}
                className="flex-1 px-6 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-slate-200"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
