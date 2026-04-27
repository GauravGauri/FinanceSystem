'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGoals, createGoal, deleteGoal, updateGoal } from '../../store/slices/goalSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import ConfirmModal from '../../components/UI/ConfirmModal';
import InputModal from '../../components/UI/InputModal';
import { toast } from 'react-toastify';
import { Plus, Trash2, Target, PlusCircle } from 'lucide-react';

export default function Goals() {
  const dispatch = useDispatch();
  const { goals } = useSelector((state) => state.goals);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', targetAmount: '', deadline: '', color: '#10b981' });

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [fundsModal, setFundsModal] = useState({ isOpen: false, goal: null });

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal(formData));
    toast.success('Savings goal created!');
    setShowForm(false);
    setFormData({ name: '', targetAmount: '', deadline: '', color: '#10b981' });
  };

  const handleDeleteClick = (id) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteModal.id) {
      dispatch(deleteGoal(deleteModal.id));
      toast.success('Goal deleted successfully');
      setDeleteModal({ isOpen: false, id: null });
    }
  };

  const handleAddFundsClick = (goal) => {
    setFundsModal({ isOpen: true, goal });
  };

  const confirmAddFunds = (amount) => {
    if (fundsModal.goal && amount > 0) {
      const newAmount = fundsModal.goal.currentAmount + amount;
      dispatch(updateGoal({ id: fundsModal.goal._id, goalData: { ...fundsModal.goal, currentAmount: newAmount } }));
      toast.success(`Added $${amount.toLocaleString()} to ${fundsModal.goal.name}`);
      setFundsModal({ isOpen: false, goal: null });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Goals</h1>
          <p className="text-slate-500 mt-2">Track your savings targets.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-md shadow-blue-500/20 w-full sm:w-auto"
        >
          <Plus size={20} /> {showForm ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 max-w-2xl">
          <h2 className="text-xl font-bold mb-4 font-heading text-slate-800">Create a Savings Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Goal Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. New Car, Vacation" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount</label>
                <input type="number" required min="0" step="0.01" value={formData.targetAmount} onChange={(e) => setFormData({...formData, targetAmount: e.target.value})} className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Target Date (Optional)</label>
                <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Theme Color</label>
              <input type="color" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="w-full h-10 rounded-lg cursor-pointer" />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors">
              Save Goal
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.length === 0 && !showForm ? (
          <div className="col-span-full bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Target size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No goals yet</h3>
            <p className="text-slate-500">Set a financial goal to start tracking your progress.</p>
          </div>
        ) : (
          goals.map((goal) => {
            const percentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const isCompleted = goal.currentAmount >= goal.targetAmount;
            
            return (
              <div key={goal._id} className={`bg-white rounded-2xl shadow-sm border ${isCompleted ? 'border-emerald-400' : 'border-slate-200'} p-6 hover:shadow-md transition-shadow relative overflow-hidden`}>
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    COMPLETED
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: goal.color }}>
                      <Target size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 leading-tight">{goal.name}</h3>
                      {goal.deadline && (
                        <p className="text-xs text-slate-500 mt-1">
                          Target: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteClick(goal._id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-end mb-2 text-sm">
                    <span className="font-bold text-2xl text-slate-900">${goal.currentAmount.toLocaleString()}</span>
                    <span className="text-slate-500 font-medium">of ${goal.targetAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: goal.color
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700 mix-blend-overlay">
                      {percentage.toFixed(0)}%
                    </div>
                  </div>
                </div>
                
                {!isCompleted && (
                  <button 
                    onClick={() => handleAddFundsClick(goal)}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    <PlusCircle size={16} /> Add Funds
                  </button>
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
        title="Delete Savings Goal"
        message="Are you sure you want to delete this goal? This progress will be lost."
        confirmText="Delete"
      />

      <InputModal
        isOpen={fundsModal.isOpen}
        onClose={() => setFundsModal({ isOpen: false, goal: null })}
        onConfirm={confirmAddFunds}
        title="Add Funds"
        message={`Enter the amount you'd like to contribute to your "${fundsModal.goal?.name}" goal.`}
        placeholder="0.00"
      />
    </DashboardLayout>
  );
}
