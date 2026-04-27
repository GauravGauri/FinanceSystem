'use client';

import { motion } from 'framer-motion';
import PublicLayout from '../../components/Layout/PublicLayout';

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">Our Mission</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            We believe that everyone deserves to feel confident about their finances. That's why we built GauravMoney—to give you the clarity and control you need to achieve your financial goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">Why we started</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Personal finance is often needlessly complex. Spreadsheets are powerful but hard to maintain. Other apps are either too simple to be useful or so complicated they require a degree in accounting.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We wanted a tool that was both powerful and beautiful. Something that felt less like a chore and more like a dashboard for your life.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-100 rounded-2xl p-8 border border-slate-200 flex flex-col justify-center"
          >
            <div className="text-4xl font-bold text-emerald-600 mb-2">10k+</div>
            <div className="text-slate-700 font-medium mb-8">Active Users</div>
            <div className="text-4xl font-bold text-blue-600 mb-2">$500M+</div>
            <div className="text-slate-700 font-medium">Assets Tracked</div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
