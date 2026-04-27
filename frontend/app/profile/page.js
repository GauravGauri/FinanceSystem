'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../store/slices/budgetSlice';
import { getGoals } from '../../store/slices/goalSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import Link from 'next/link';
import { User, Mail, Shield, Camera, Edit2, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { budgets } = useSelector((state) => state.budgets);
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getGoals());
  }, [dispatch]);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 font-heading">User Information</h1>
          <p className="text-slate-500 mt-2">Manage your personal information and account security.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-center p-8">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-xl shadow-lg border-2 border-white hover:bg-slate-800 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 text-sm mb-6 capitalize">Premium Member</p>
              
              <div className="flex justify-center gap-4 border-t border-slate-50 pt-6">
                <Link href="/budgets" className="text-center hover:bg-slate-50 px-4 py-2 rounded-2xl transition-colors">
                  <p className="text-lg font-bold text-slate-900">{budgets.length}</p>
                  <p className="text-xs text-slate-400">Budgets</p>
                </Link>
                <div className="w-px h-8 bg-slate-100 self-center"></div>
                <Link href="/goals" className="text-center hover:bg-slate-50 px-4 py-2 rounded-2xl transition-colors">
                  <p className="text-lg font-bold text-slate-900">{goals.length}</p>
                  <p className="text-xs text-slate-400">Goals</p>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details & Settings */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User size={20} className="text-emerald-600" />
                  Personal Information
                </h3>
                <button className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-slate-900 font-medium">{user.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-slate-900 font-medium">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-slate-900 font-medium">+1 (555) 000-0000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="text-slate-900 font-medium">New York, USA</p>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-6">
                <Shield size={20} className="text-emerald-600" />
                Account Security
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/80 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-600">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-500">Protect your account with an extra layer of security.</p>
                    </div>
                  </div>
                  <div className="w-10 h-5 bg-slate-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100/80 transition-colors cursor-pointer border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-600">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">Change Password</p>
                      <p className="text-xs text-slate-500">Update your account password regularly.</p>
                    </div>
                  </div>
                  <div className="text-emerald-600">
                    <Edit2 size={18} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
