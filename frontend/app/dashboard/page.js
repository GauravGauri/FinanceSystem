'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionSlice';
import { getPortfolio } from '../../store/slices/portfolioSlice';
import { getGoals } from '../../store/slices/goalSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DashboardCharts from '../../components/Charts/DashboardCharts';
import { FaArrowUp, FaArrowDown, FaWallet, FaBuilding } from 'react-icons/fa';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const { assets, liabilities } = useSelector((state) => state.portfolio);
  const { goals } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getPortfolio());
    dispatch(getGoals());
  }, [dispatch]);

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalAssets = assets.reduce((acc, a) => acc + a.value, 0);
  const totalLiabilities = liabilities.reduce((acc, l) => acc + l.value, 0);

  const netWorth = totalAssets - totalLiabilities;
  const monthlyBalance = totalIncome - totalExpense;

  const summaryCards = [
    { title: 'Total Income', value: totalIncome, icon: <FaArrowUp className="text-emerald-500" />, color: 'bg-emerald-100' },
    { title: 'Total Expenses', value: totalExpense, icon: <FaArrowDown className="text-red-500" />, color: 'bg-red-100' },
    { title: 'Total Assets', value: totalAssets, icon: <FaBuilding className="text-blue-500" />, color: 'bg-blue-100' },
    { title: 'Total Liabilities', value: totalLiabilities, icon: <FaWallet className="text-orange-500" />, color: 'bg-orange-100' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Financial Overview</h1>
        <p className="text-slate-500 mt-2">Here is a summary of your current financial status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center transition-transform hover:-translate-y-1">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">${card.value.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white col-span-1 lg:col-span-1 flex flex-col justify-center">
          <h2 className="text-lg font-medium opacity-80">Net Worth</h2>
          <div className="text-4xl font-bold mt-2 mb-4">${netWorth.toLocaleString()}</div>
          <div className="h-px bg-white/20 w-full my-4"></div>
          <h2 className="text-lg font-medium opacity-80">Monthly Balance</h2>
          <div className="text-3xl font-bold mt-2">${monthlyBalance.toLocaleString()}</div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 font-heading">Income vs Expenses Overview</h3>
          <div className="h-64">
            <DashboardCharts transactions={transactions} assets={assets} liabilities={liabilities} />
          </div>
        </div>
      </div>
      
      {goals && goals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4 font-heading">Recent Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.slice(0, 3).map(goal => {
              const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-slate-800">{goal.name}</h4>
                    <span className="text-sm font-medium text-slate-500">{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: goal.color }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-700">${goal.currentAmount.toLocaleString()}</span>
                    <span className="text-slate-400">Target: ${goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
    </DashboardLayout>
  );
}
