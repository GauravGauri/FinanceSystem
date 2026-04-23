import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  assets: [],
  liabilities: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get user portfolio
export const getPortfolio = createAsyncThunk(
  'portfolio/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add asset
export const addAsset = createAsyncThunk(
  'portfolio/addAsset',
  async (assetData, thunkAPI) => {
    try {
      const response = await api.post('/portfolio/asset', assetData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete asset
export const deleteAsset = createAsyncThunk(
  'portfolio/deleteAsset',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/portfolio/asset/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add liability
export const addLiability = createAsyncThunk(
  'portfolio/addLiability',
  async (liabilityData, thunkAPI) => {
    try {
      const response = await api.post('/portfolio/liability', liabilityData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete liability
export const deleteLiability = createAsyncThunk(
  'portfolio/deleteLiability',
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/portfolio/liability/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolio.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPortfolio.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.assets = action.payload.assets;
        state.liabilities = action.payload.liabilities;
      })
      .addCase(getPortfolio.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addAsset.fulfilled, (state, action) => {
        state.assets.push(action.payload);
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.assets = state.assets.filter((asset) => asset._id !== action.payload.id);
      })
      .addCase(addLiability.fulfilled, (state, action) => {
        state.liabilities.push(action.payload);
      })
      .addCase(deleteLiability.fulfilled, (state, action) => {
        state.liabilities = state.liabilities.filter((liability) => liability._id !== action.payload.id);
      });
  },
});

export const { reset } = portfolioSlice.actions;
export default portfolioSlice.reducer;
