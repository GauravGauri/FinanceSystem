'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess || user) {
      router.push('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20 z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-300">Enter your details to access your account.</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            dispatch(login(values));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-400" />
                  </div>
                  <Field
                    type="email"
                    name="email"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900/40 border border-white/10 rounded-xl text-white font-medium text-base placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-slate-900/60 transition-all shadow-inner"
                    placeholder="Enter your email"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm ml-1" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <Field
                    type="password"
                    name="password"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-900/40 border border-white/10 rounded-xl text-white font-medium text-base placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-slate-900/60 transition-all shadow-inner"
                    placeholder="Enter your password"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm ml-1" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-bold rounded-xl shadow-lg transform transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
