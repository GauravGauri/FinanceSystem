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
        position: 'right',
      },
    },
    cutout: '70%',
  };

  // Monthly income vs expense (Mocking for current month for simplicity, ideally group by month)
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
        borderRadius: 4,
      },
      {
        label: 'Expenses',
        data: [currentMonthExpense],
        backgroundColor: '#ef4444', // red
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#f3f4f6',
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    },
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full w-full">
      <div className="flex-1 min-w-0 h-full relative">
        <Bar data={barData} options={barOptions} />
      </div>
      <div className="flex-1 min-w-0 h-full relative">
        <h4 className="text-center text-sm font-medium text-gray-500 mb-2">Expenses by Category</h4>
        <div className="h-[90%]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </div>
  );
}
