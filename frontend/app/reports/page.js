'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/slices/transactionSlice';
import { getPortfolio } from '../../store/slices/portfolioSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import dynamic from 'next/dynamic';

// Dynamically import the PDF component to avoid SSR issues with react-pdf
const DownloadReport = dynamic(
  () => import('../../components/PdfReport/PdfDocument'),
  { ssr: false }
);

export default function Reports() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);
  const { assets, liabilities } = useSelector((state) => state.portfolio);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getPortfolio());
  }, [dispatch]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Financial Reports</h1>
        <p className="text-gray-500 mt-2">Generate and download your financial statements.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Report Preview</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Cash Flow Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <p className="text-emerald-800 text-sm font-medium">Total Income</p>
                <p className="text-2xl font-bold text-emerald-600">${totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="text-red-800 text-sm font-medium">Total Expense</p>
                <p className="text-2xl font-bold text-red-600">${totalExpense.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Transactions</h3>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              {transactions.slice(0, 5).map((t, index) => (
                <div key={t._id || index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800">{t.text}</p>
                    <p className="text-xs text-gray-500">{new Date(t.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`font-medium ${t.type === 'income' ? 'text-emerald-600' : 'text-gray-800'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </p>
                </div>
              ))}
              {transactions.length === 0 && <p className="text-gray-500 text-sm">No transactions yet.</p>}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-8 flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-4 text-center">Download your comprehensive financial report including all transactions, assets, and liabilities.</p>
          <DownloadReport transactions={transactions} assets={assets} liabilities={liabilities} user={user} />
        </div>
      </div>
    </DashboardLayout>
  );
}
