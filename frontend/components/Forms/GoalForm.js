'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createGoal, updateGoal } from '../../store/slices/goalSlice';
import { toast } from 'react-toastify';

const GoalSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  targetAmount: Yup.number().required('Required').positive('Must be positive'),
  deadline: Yup.date().nullable(),
  color: Yup.string().required('Required'),
});

export default function GoalForm({ onClose, initialData }) {
  const dispatch = useDispatch();
  const isEdit = !!initialData;

  const defaultValues = initialData ? {
    name: initialData.name,
    targetAmount: initialData.targetAmount,
    deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
    color: initialData.color || '#10b981',
  } : { name: '', targetAmount: '', deadline: '', color: '#10b981' };

  return (
    <>
      <Formik
        initialValues={defaultValues}
        validationSchema={GoalSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          if (isEdit) {
            dispatch(updateGoal({ id: initialData._id, goalData: values }));
            toast.success('Goal updated!');
          } else {
            dispatch(createGoal(values));
            toast.success('Goal created!');
          }
          resetForm();
          if (onClose) onClose();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Goal Name</label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                placeholder="e.g. New Car, Vacation"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-medium">$</span>
                <Field
                  type="number"
                  name="targetAmount"
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl text-slate-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="0.00"
                />
              </div>
              <ErrorMessage name="targetAmount" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Date (Optional)</label>
              <Field
                type="date"
                name="deadline"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 font-medium text-base bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
              <ErrorMessage name="deadline" component="div" className="text-red-500 text-xs mt-1" />
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
              {isEdit ? 'Update Goal' : 'Save Goal'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
