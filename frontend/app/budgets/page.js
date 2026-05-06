'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets, createBudget, deleteBudget } from '../../store/slices/budgetSlice';
import { getTransactions } from '../../store/slices/transactionSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import ConfirmModal from '../../components/UI/ConfirmModal';
import FormModal from '../../components/UI/FormModal';
import BudgetForm from '../../components/Forms/BudgetForm';
import { toast } from 'react-toastify';
import { Plus, Trash2, PieChart as PieChartIcon, Edit2 } from 'lucide-react';

export default function Budgets() {
  const dispatch = useDispatch();
  const { budgets } = useSelector((state) => state.budgets);
  const { transactions } = useSelector((state) => state.transactions);
  
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  // Modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);

  const handleAddNew = () => {
    setEditingBudget(null);
    setShowForm(true);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      dispatch(deleteBudget(deleteModal.id));
      toast.success('Budget deleted successfully');
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const calculateSpent = (category) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(t => t.type === 'expense' && t.category?.toLowerCase() === category?.toLowerCase())
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((acc, t) => acc + t.amount, 0);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Budgets</h1>
          <p className="text-slate-500 mt-2">Manage your spending limits.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-emerald-500/20 w-full sm:w-auto"
        >
          <Plus size={20} /> {showForm && !editingBudget ? 'Cancel' : 'New Budget'}
        </button>
      </div>

      <FormModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        title={editingBudget ? "Edit Budget" : "New Budget"}
      >
        <BudgetForm onClose={() => setShowForm(false)} initialData={editingBudget} />
      </FormModal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.length === 0 && !showForm ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <PieChartIcon size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No budgets yet</h3>
            <p className="text-slate-500">Create a budget to start tracking your spending categories.</p>
          </div>
        ) : (
          budgets.map((budget) => {
            const spent = calculateSpent(budget.category);
            const percentage = Math.min((spent / budget.amount) * 100, 100);
            const isOver = spent > budget.amount;
            
            return (
              <div key={budget._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: budget.color }}></div>
                    <h3 className="text-lg font-bold text-slate-800">{budget.category}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(budget)} className="text-slate-400 hover:text-blue-500 p-2 transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDeleteClick(budget._id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-end mb-2 text-sm">
                  <div>
                    <span className={`font-bold text-xl ${isOver ? 'text-red-600' : 'text-slate-900'}`}>${spent.toLocaleString()}</span>
                    <span className="text-slate-500 ml-1">of ${budget.amount.toLocaleString()}</span>
                  </div>
                  <span className={`font-medium ${isOver ? 'text-red-500' : 'text-slate-500'}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${isOver ? 'bg-red-500' : ''}`}
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: !isOver ? budget.color : undefined
                    }}
                  ></div>
                </div>
                {isOver && (
                  <p className="text-xs text-red-500 mt-2 font-medium">You have exceeded this budget.</p>
                )}
              </div>
            );
          })
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        title="Delete Budget"
        message="Are you sure you want to delete this budget? This will stop tracking your spending limit for this category."
        confirmText="Delete"
      />
    </DashboardLayout>
  );
}
