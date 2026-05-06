'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createBudget, updateBudget } from '../../store/slices/budgetSlice';
import { toast } from 'react-toastify';

const BudgetSchema = Yup.object().shape({
  category: Yup.string().required('Required'),
  amount: Yup.number().required('Required').positive('Must be positive'),
  color: Yup.string().required('Required'),
});

export default function BudgetForm({ onClose, initialData }) {
  const dispatch = useDispatch();
  const isEdit = !!initialData;

  const defaultValues = initialData ? {
    category: initialData.category,
    amount: initialData.amount,
    color: initialData.color || '#3b82f6',
  } : { category: '', amount: '', color: '#3b82f6' };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={BudgetSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          if (isEdit) {
            dispatch(updateBudget({ id: initialData._id, budgetData: values }));
            toast.success('Budget updated!');
          } else {
            dispatch(createBudget(values));
            toast.success('Budget created!');
          }
          resetForm();
          if (onClose) onClose();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <Field
                type="text"
                name="category"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 font-medium text-base bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="e.g. Groceries"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-medium">$</span>
                <Field
                  type="number"
                  name="amount"
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl text-slate-900 font-medium text-base bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="0.00"
                />
              </div>
              <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Theme Color</label>
              <Field
                type="color"
                name="color"
                className="w-full h-12 rounded-xl cursor-pointer border border-slate-300 shadow-sm px-1 py-1"
              />
              <ErrorMessage name="color" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 mt-4"
            >
              {isEdit ? 'Update Budget' : 'Save Budget'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
