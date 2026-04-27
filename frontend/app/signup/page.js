'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Lock, Mail } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success('Account created successfully!');
      router.push('/login');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, router, dispatch]);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative py-12">
        <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2">
          <div className="w-10 h-10 relative flex items-center justify-center">
            <Image src="/logo.png" alt="GauravMoney Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="text-2xl font-bold text-slate-900 font-heading">Gaurav<span className="text-emerald-600">Money</span></span>
        </div>

        <div className="max-w-md w-full mx-auto mt-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2 font-heading">Create an account</h1>
          <p className="text-slate-500 mb-10">Start taking control of your financial future today.</p>

          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              const { name, email, password } = values;
              dispatch(register({ name, email, password }));
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="text-slate-400" size={20} />
                    </div>
                    <Field
                      type="text"
                      name="name"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm font-medium mt-1" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="text-slate-400" size={20} />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm font-medium mt-1" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-slate-400" size={20} />
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm font-medium mt-1" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="text-slate-400" size={20} />
                    </div>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm font-medium mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-center text-slate-600 font-medium">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-slate-900 z-0"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-lg px-8">
          <div className="w-24 h-24 relative mx-auto mb-8 bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/20">
            <Image src="/logo.png" alt="GauravMoney Logo" layout="fill" className="object-contain p-2" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 font-heading">A better way to budget.</h2>
          <p className="text-xl text-slate-300 leading-relaxed">Stop using complicated spreadsheets. GauravMoney brings all your finances together in one beautiful dashboard.</p>
        </div>
      </div>
    </div>
  );
}
