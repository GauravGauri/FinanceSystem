'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardCharts({ transactions, assets, liabilities }) {
  // Aggregate expenses by category
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const doughnutData = {
    labels: Object.keys(expensesByCategory).length > 0 ? Object.keys(expensesByCategory) : ['No Expenses'],
    datasets: [
      {
        data: Object.keys(expensesByCategory).length > 0 ? Object.values(expensesByCategory) : [1],
        backgroundColor: [
          '#ef4444', // red
          '#f97316', // orange
          '#eab308', // yellow
          '#22c55e', // green
          '#3b82f6', // blue
          '#a855f7', // purple
          '#ec4899', // pink
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: typeof window !== 'undefined' && window.innerWidth < 768 ? 'bottom' : 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      }
    },
    cutout: '70%',
  };

  const currentMonthIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const currentMonthExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const barData = {
    labels: ['Current Month'],
    datasets: [
      {
        label: 'Income',
        data: [currentMonthIncome],
        backgroundColor: '#10b981', // emerald
        borderRadius: 8,
        barThickness: 40,
      },
      {
        label: 'Expenses',
        data: [currentMonthExpense],
        backgroundColor: '#ef4444', // red
        borderRadius: 8,
        barThickness: 40,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          font: { size: 12 }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#f3f4f6',
        },
        ticks: {
          font: { size: 11 }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 }
        }
      }
    },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full w-full py-2">
      <div className="flex-1 min-w-0 h-[300px] lg:h-full relative">
        <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-emerald-500 rounded-full"></div>
          Income vs Expenses
        </h4>
        <div className="h-[calc(100%-2rem)]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className="flex-1 min-w-0 h-[350px] lg:h-full relative flex flex-col">
        <h4 className="text-sm font-semibold text-slate-500 mb-4 flex items-center gap-2">
          <div className="w-2 h-4 bg-blue-500 rounded-full"></div>
          Expenses by Category
        </h4>
        <div className="flex-1 relative">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
