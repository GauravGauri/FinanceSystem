import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transactionReducer from './slices/transactionSlice';
import portfolioReducer from './slices/portfolioSlice';
import budgetReducer from './slices/budgetSlice';
import goalReducer from './slices/goalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    portfolio: portfolioReducer,
    budgets: budgetReducer,
    goals: goalReducer,
  },
});
