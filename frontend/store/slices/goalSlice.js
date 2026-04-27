import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Get user goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/goals');
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new goal
export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
  try {
    const response = await api.post('/goals', goalData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update goal
export const updateGoal = createAsyncThunk('goals/update', async ({ id, goalData }, thunkAPI) => {
  try {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete goal
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const index = state.goals.findIndex((goal) => goal._id === action.payload._id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.id);
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;

