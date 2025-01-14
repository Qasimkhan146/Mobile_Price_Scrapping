import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:4501/auth';
const API_URL = 'https://7842.mobileprice.biz.pk/auth';

// Initialize from localStorage
// const savedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
// const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState = {
  // user: savedUser,
  // token: savedToken,
  loading: false,
  error: null,
  adminInfo:null
};

// Async thunk for user login
export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
// import { createAsyncThunk } from '@reduxjs/toolkit';

export const adminUser = createAsyncThunk(
  'user/admin',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/DashboardAdmin`, {
        method: 'GET', // Explicitly set method if needed
        credentials: 'include', // Use 'include' to send cookies with the request
        headers: {
          'Content-Type': 'application/json', // Set headers if necessary
        },
      });

      if (!response.ok) {
        // Handle HTTP errors
      const data = await response.json();
 
        throw new Error(`${data.message}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Use rejectWithValue to handle errors
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Create user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        // localStorage.setItem('user', JSON.stringify(action.payload.user));
        // localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload.user;
        // state.token = action.payload;
        // localStorage.setItem('user', JSON.stringify(action.payload.user));
        // localStorage.setItem('token', action.payload.token);
      })
      .addCase(adminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const selectErrors = (state) => state.user.error;
export const selectAdmin = (state) => state.user.adminInfo;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
