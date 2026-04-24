'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../store/slices/transactionSlice';

const TransactionSchema = Yup.object().shape({
  text: Yup.string().required('Required'),
  amount: Yup.number()
    .required('Required')
    .positive('Must be positive (select Expense type for deductions)'),
  type: Yup.string().oneOf(['income', 'expense']).required('Required'),
  category: Yup.string().required('Required'),
});

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Other'],
  expense: ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Other'],
};

export default function TransactionForm({ onClose, initialData }) {
  const dispatch = useDispatch();

  const isEdit = !!initialData;

  const defaultValues = initialData ? {
    text: initialData.text,
    amount: initialData.amount,
    type: initialData.type,
    category: initialData.category,
  } : { text: '', amount: '', type: 'expense', category: 'Food' };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            &times;
          </button>
        )}
      </div>

      <Formik
        initialValues={defaultValues}
        validationSchema={TransactionSchema}
        onSubmit={(values, { resetForm }) => {
          if (isEdit) {
            import('../../store/slices/transactionSlice').then(({ updateTransaction }) => {
              dispatch(updateTransaction({ id: initialData._id, ...values }));
            });
          } else {
            dispatch(createTransaction(values));
          }
          resetForm();
          if (onClose) onClose();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <Field type="radio" name="type" value="income" className="mr-2 text-emerald-500 focus:ring-emerald-500" />
                  <span className="text-gray-700">Income</span>
                </label>
                <label className="flex items-center">
                  <Field type="radio" name="type" value="expense" className="mr-2 text-red-500 focus:ring-red-500" />
                  <span className="text-gray-700">Expense</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Field
                type="text"
                name="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="E.g., Groceries"
              />
              <ErrorMessage name="text" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <Field
                  type="number"
                  name="amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="0.00"
                />
              </div>
              <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Field as="select" name="category" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 font-medium text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white transition-all shadow-sm">
                {CATEGORIES[values.type]?.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors mt-4"
            >
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
