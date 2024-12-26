import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// const Base_Url = "http://localhost:4500"
export const loginUser = createAsyncThunk("auth/loginUser",async(credentials,{rejectWithValue})=>{
    try {
        const response = await fetch(`http://localhost:4500/auth/login`,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const registerUser = createAsyncThunk("auth/registerUser",async(userData,{rejectWithValue})=>{
    try {
        console.log("redux form data ",userData)
        const response = await fetch('http://localhost:4500/auth/register',
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
      loading: false,
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
      error: null,
    },
    reducers: {
      logoutUser: (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
  
          // Save data to localStorage
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

export const selectUserAuth = (state) => state.auth;
 export const {logoutUser} = authSlice.actions;
 export default authSlice.reducer
