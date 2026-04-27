import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/budgets/';

// Get user budgets
export const getBudgets = createAsyncThunk('budgets/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new budget
export const createBudget = createAsyncThunk('budgets/create', async (budgetData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(API_URL, budgetData, config);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update budget
export const updateBudget = createAsyncThunk('budgets/update', async ({ id, budgetData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(API_URL + id, budgetData, config);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete budget
export const deleteBudget = createAsyncThunk('budgets/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  budgets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.budgets = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.budgets.push(action.payload);
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        const index = state.budgets.findIndex((budget) => budget._id === action.payload._id);
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.budgets = state.budgets.filter((budget) => budget._id !== action.payload.id);
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
