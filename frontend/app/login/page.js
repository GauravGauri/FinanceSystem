'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Lock, Mail, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success('Welcome back!');
      setIsRedirecting(true);
      setTimeout(() => {
        router.push('/dashboard');
        dispatch(reset());
      }, 1500);
    }
    if (user && !isSuccess && !isRedirecting) {
      router.push('/dashboard');
    }
  }, [user, isError, isSuccess, message, router, dispatch, isRedirecting]);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-20 xl:px-32 relative bg-white overflow-hidden">
        {/* Decorative background for mobile */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50 lg:hidden"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-3 z-10"
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
            <Image src="/logo.png" alt="GauravMoney" width={24} height={24} className="invert brightness-0" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Gaurav<span className="text-emerald-600">Money</span></span>
        </motion.div>

        <div className="max-w-md w-full mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {isRedirecting ? (
              <motion.div
                key="redirecting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-emerald-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Success!</h2>
                <p className="text-slate-500">Redirecting you to your dashboard...</p>
                <div className="mt-8 flex justify-center">
                  <Loader2 className="animate-spin text-emerald-600" size={24} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="mb-10">
                  <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight font-heading">Welcome Back</h1>
                  <p className="text-slate-500 text-lg">Sign in to manage your wealth and track your goals.</p>
                </div>

                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    dispatch(login(values));
                  }}
                >
                  {({ isSubmitting, errors, touched }) => (
                    <Form className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                            <Mail size={20} className="text-slate-400 group-focus-within:text-emerald-500" />
                          </div>
                          <Field
                            type="email"
                            name="email"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.email && touched.email ? 'border-red-500' : 'border-slate-200'} rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200`}
                            placeholder="name@example.com"
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs font-bold mt-1 ml-1" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                          <label className="text-sm font-bold text-slate-700">Password</label>
                          <Link href="#" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Forgot?</Link>
                        </div>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                            <Lock size={20} className="text-slate-400 group-focus-within:text-emerald-500" />
                          </div>
                          <Field
                            type="password"
                            name="password"
                            className={`w-full pl-12 pr-4 py-4 bg-slate-50 border ${errors.password && touched.password ? 'border-red-500' : 'border-slate-200'} rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200`}
                            placeholder="••••••••"
                          />
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-500 text-xs font-bold mt-1 ml-1" />
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group w-full py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden relative"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" size={22} />
                        ) : (
                          <>
                            <span>Sign In</span>
                            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                  <p className="text-slate-600 font-medium">
                    New to GauravMoney?{' '}
                    <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors decoration-2 underline-offset-4 hover:underline">
                      Create an account
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side - Visual / Marketing */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        {/* Animated background blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full filter blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full filter blur-[120px]"
        />
        
        <div className="relative z-10 text-center max-w-lg px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="w-24 h-24 relative mx-auto mb-10 bg-white/5 p-5 rounded-[2rem] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/20 flex items-center justify-center"
          >
             <Image src="/logo.png" alt="GauravMoney" width={48} height={48} className="brightness-125 contrast-125" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6 leading-tight font-heading"
          >
            The simplest way to <span className="text-emerald-400">master</span> your finances.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl text-slate-400 leading-relaxed font-medium"
          >
            "GauravMoney completely changed how I track my net worth. The AI insights are a game changer."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                  U{i}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Joined by 10k+ users</p>
          </motion.div>
        </div>

        {/* Floating card mockup for premium feel */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 right-10 w-64 h-40 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 hidden xl:block"
        >
          <div className="flex justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20"></div>
            <div className="w-20 h-3 bg-white/20 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-white/10 rounded"></div>
            <div className="h-4 w-3/4 bg-white/10 rounded"></div>
            <div className="h-10 w-full bg-emerald-500/20 rounded-xl mt-4"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

