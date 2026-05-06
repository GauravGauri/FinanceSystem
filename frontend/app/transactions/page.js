'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions, deleteTransaction } from '../../store/slices/transactionSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import TransactionForm from '../../components/Forms/TransactionForm';
import ConfirmModal from '../../components/UI/ConfirmModal';
import FormModal from '../../components/UI/FormModal';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaArrowUp, FaArrowDown, FaEdit, FaDownload } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Transactions() {
  const dispatch = useDispatch();
  const { transactions, isLoading } = useSelector((state) => state.transactions);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Pagination logic
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      dispatch(deleteTransaction(transactionToDelete));
      toast.success('Transaction deleted successfully');
      setTransactionToDelete(null);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingTransaction(null);
    setShowForm(!showForm);
  };

  const exportCSV = () => {
    const headers = ['Description', 'Category', 'Date', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        `"${t.text}"`,
        `"${t.category}"`,
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-500 mt-2">Manage your income and expenses.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <button
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex-1 sm:flex-none min-w-[140px]"
          >
            <FaDownload /> Export CSV
          </button>
          <button
            onClick={handleAddNew}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm flex-1 sm:flex-none min-w-[140px]"
          >
            <FaPlus /> {showForm && !editingTransaction ? 'Close' : 'Add Transaction'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 items-start">
        <div className="w-full transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                    <th className="py-4 px-6 font-medium">Description</th>
                    <th className="py-4 px-6 font-medium">Category</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Amount</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500">
                        No transactions found. Start by adding one!
                      </td>
                    </tr>
                  ) : (
                    currentTransactions.map((transaction) => (
                      <tr key={transaction._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-emerald-100 text-emerald-500' : 'bg-red-100 text-red-500'}`}>
                              {transaction.type === 'income' ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                            </div>
                            <span className="font-medium text-gray-800">{transaction.text}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-500 text-sm">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className={`py-4 px-6 font-semibold ${transaction.type === 'income' ? 'text-emerald-500' : 'text-gray-800'}`}>
                          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-gray-400 hover:text-blue-500 transition-colors p-2"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(transaction._id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-medium text-gray-900">{Math.min(currentPage * itemsPerPage, transactions.length)}</span> of <span className="font-medium text-gray-900">{transactions.length}</span> results
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <FormModal 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
      >
        <TransactionForm onClose={() => setShowForm(false)} initialData={editingTransaction} />
      </FormModal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
      />
    </DashboardLayout>
  );
}
