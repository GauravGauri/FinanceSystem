'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart3, PieChart, Target, ShieldCheck } from 'lucide-react';
import PublicLayout from '../components/Layout/PublicLayout';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 5800 },
  { name: 'May', value: 5100 },
  { name: 'Jun', value: 6800 },
  { name: 'Jul', value: 7200 },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const features = [
    {
      icon: <BarChart3 className="text-emerald-500" size={32} />,
      title: "Track Everything",
      description: "Connect all your accounts in one place to see your complete financial picture at a glance."
    },
    {
      icon: <PieChart className="text-blue-500" size={32} />,
      title: "Smart Budgeting",
      description: "Create custom budgets that adapt to your lifestyle. Know exactly where your money goes."
    },
    {
      icon: <Target className="text-purple-500" size={32} />,
      title: "Achieve Goals",
      description: "Set financial goals and let us help you track your progress automatically."
    },
    {
      icon: <ShieldCheck className="text-slate-500" size={32} />,
      title: "Bank-Level Security",
      description: "Your data is encrypted and strictly read-only. We never sell your information."
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/50 text-emerald-700 font-medium text-sm mb-6 border border-emerald-200"
            >
              🎉 The new standard in personal finance
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 font-heading"
            >
              Master your money. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Design your life.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              Track all your accounts, manage your budget, and achieve your financial goals with the most powerful personal finance platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/signup">
                <button className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 flex items-center justify-center gap-2">
                  Start for free <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="/about">
                <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-full font-semibold text-lg transition-all shadow-sm border border-slate-200">
                  See how it works
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="rounded-2xl border border-slate-200/50 bg-white/50 backdrop-blur-sm shadow-2xl p-2 md:p-4 ring-1 ring-black/5">
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50 aspect-[16/9] flex items-center justify-center relative">
                {/* Mockup Dashboard UI using Tailwind */}
                <div className="absolute inset-0 bg-slate-50 flex overflow-hidden rounded-xl">
                  {/* Mock Sidebar */}
                  <div className="w-1/4 h-full bg-slate-900 p-4 flex flex-col gap-4 border-r border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-emerald-500"></div>
                      <div className="h-4 w-24 bg-slate-700 rounded"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 w-full bg-emerald-600 rounded"></div>
                      <div className="h-3 w-3/4 bg-slate-800 rounded"></div>
                      <div className="h-3 w-5/6 bg-slate-800 rounded"></div>
                      <div className="h-3 w-4/5 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                  {/* Mock Main Content */}
                  <div className="flex-1 p-6 flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="h-6 w-32 bg-slate-200 rounded"></div>
                      <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                    </div>
                    {/* Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-2"></div>
                        <div className="h-6 w-24 bg-slate-800 rounded"></div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-2"></div>
                        <div className="h-6 w-24 bg-emerald-600 rounded"></div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="h-3 w-16 bg-slate-200 rounded mb-2"></div>
                        <div className="h-6 w-24 bg-blue-600 rounded"></div>
                      </div>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="bg-white flex-1 rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col">
                      <h4 className="text-sm font-bold text-slate-700 mb-4">Net Worth Over Time</h4>
                      <div className="flex-1 min-h-[150px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={mockChartData}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                            <YAxis hide={true} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-heading">Everything you need to succeed</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">We built GauravMoney to give you complete visibility and control over your financial life.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-heading">Ready to take control?</h2>
          <p className="text-xl text-slate-300 mb-10">Join thousands of others who have transformed their financial lives with GauravMoney.</p>
          <Link href="/signup">
            <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-1">
              Create your free account
            </button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
