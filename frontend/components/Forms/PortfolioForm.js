'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addAsset, addLiability } from '../../store/slices/portfolioSlice';

const PortfolioSchema = Yup.object().shape({
  type: Yup.string().oneOf(['asset', 'liability']).required('Required'),
  name: Yup.string().required('Required'),
  value: Yup.number().required('Required').positive('Must be positive'),
  interestRate: Yup.number().min(0, 'Must be positive or zero'),
  description: Yup.string(),
});

export default function PortfolioForm({ onClose }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Add Item</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            &times;
          </button>
        )}
      </div>

      <Formik
        initialValues={{ type: 'asset', name: '', value: '', interestRate: 0, description: '' }}
        validationSchema={PortfolioSchema}
        onSubmit={(values, { resetForm }) => {
          if (values.type === 'asset') {
            dispatch(addAsset({ name: values.name, value: values.value, description: values.description }));
          } else {
            dispatch(addLiability({ 
              name: values.name, 
              value: values.value, 
              interestRate: values.interestRate, 
              description: values.description 
            }));
          }
          resetForm();
          if (onClose) onClose();
        }}
      >
        {({ values }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field type="radio" name="type" value="asset" className="mr-2 text-blue-500 focus:ring-blue-500" />
                  <span className="text-gray-700">Asset</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="type" value="liability" className="mr-2 text-orange-500 focus:ring-orange-500" />
                  <span className="text-gray-700">Liability</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                placeholder={values.type === 'asset' ? 'E.g., House, Stock' : 'E.g., Mortgage, Car Loan'}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
              <Field
                type="number"
                name="value"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                placeholder="0.00"
              />
              <ErrorMessage name="value" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {values.type === 'liability' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <Field
                  type="number"
                  name="interestRate"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                  placeholder="E.g., 5.5"
                />
                <ErrorMessage name="interestRate" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <Field
                type="text"
                name="description"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                placeholder="Details..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-medium rounded-lg shadow-md transition-colors mt-4"
            >
              Add {values.type === 'asset' ? 'Asset' : 'Liability'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
