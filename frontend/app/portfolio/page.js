'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolio, deleteAsset, deleteLiability } from '../../store/slices/portfolioSlice';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import PortfolioForm from '../../components/Forms/PortfolioForm';
import ConfirmModal from '../../components/UI/ConfirmModal';
import { toast } from 'react-toastify';
import { FaTrash, FaPlus, FaBuilding, FaCreditCard } from 'react-icons/fa';

export default function Portfolio() {
  const dispatch = useDispatch();
  const { assets, liabilities, isLoading } = useSelector((state) => state.portfolio);
  const [showForm, setShowForm] = useState(false);

  // Modal state
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, type: null });

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  const handleDeleteClick = (id, type) => {
    setDeleteModal({ isOpen: true, id, type });
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'asset') {
      dispatch(deleteAsset(deleteModal.id));
      toast.success('Asset deleted successfully');
    } else {
      dispatch(deleteLiability(deleteModal.id));
      toast.success('Liability deleted successfully');
    }
    setDeleteModal({ isOpen: false, id: null, type: null });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Portfolio</h1>
          <p className="text-gray-500 mt-2">Manage your assets and liabilities.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm w-full sm:w-auto"
        >
          <FaPlus /> {showForm ? 'Close' : 'Add Item'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className={`w-full ${showForm ? 'lg:w-2/3' : ''} transition-all duration-300 space-y-8`}>
          
          {/* Assets Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-blue-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <FaBuilding className="text-blue-500 text-xl" />
              <h2 className="text-lg font-semibold text-gray-800">Assets</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                    <th className="py-4 px-6 font-medium">Name</th>
                    <th className="py-4 px-6 font-medium">Value</th>
                    <th className="py-4 px-6 font-medium">Description</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No assets found. Start by adding one!
                      </td>
                    </tr>
                  ) : (
                    assets.map((asset) => (
                      <tr key={asset._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-800">{asset.name}</td>
                        <td className="py-4 px-6 font-semibold text-blue-600">${asset.value.toLocaleString()}</td>
                        <td className="py-4 px-6 text-gray-500 text-sm">{asset.description || '-'}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteClick(asset._id, 'asset')}
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
          </div>

          {/* Liabilities Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-orange-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <FaCreditCard className="text-orange-500 text-xl" />
              <h2 className="text-lg font-semibold text-gray-800">Liabilities</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                    <th className="py-4 px-6 font-medium">Name</th>
                    <th className="py-4 px-6 font-medium">Value</th>
                    <th className="py-4 px-6 font-medium">Interest Rate</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {liabilities.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-500">
                        No liabilities found. Start by adding one!
                      </td>
                    </tr>
                  ) : (
                    liabilities.map((liability) => (
                      <tr key={liability._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-800">{liability.name}</td>
                        <td className="py-4 px-6 font-semibold text-orange-600">${liability.value.toLocaleString()}</td>
                        <td className="py-4 px-6 text-gray-500 text-sm">{liability.interestRate}%</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteClick(liability._id, 'liability')}
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
          </div>

        </div>

        {showForm && (
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
              <PortfolioForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.type === 'asset' ? 'Asset' : 'Liability'}`}
        message={`Are you sure you want to delete this ${deleteModal.type}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </DashboardLayout>
  );
}
