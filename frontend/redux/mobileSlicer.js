//productSlicer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetch10LatestMobiles = createAsyncThunk(
  "mobile/fetchCreateMobile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://7842.mobileprice.biz.pk/mobile/fetch10LatestMobiles"
        
      );
      const data = await response.json();
      // console.log("what is coming in the data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchMobileDetail = createAsyncThunk(
  "mobile/fetchMobileDetail",
  async (model, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetchSingleMobile/${model}`
        
      );
      const data = await response.json();
      // console.log("Model Data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAllBrands = createAsyncThunk(
  "mobile/fetchAllBrands",
  async (model, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/brand/fetchAllBrands`
        
      );
      const data = await response.json();
      console.log("Brand Data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const mobileSlice = createSlice({
  name: "mobile",
  initialState: {
    loading: false,
    fetch10Mobiles: [],
    mobileDetail: null,
    brandData:[],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch10LatestMobiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch10LatestMobiles.fulfilled, (state, action) => {
        state.loading = false;
        // state.createMobile.push(action.payload);
        state.fetch10Mobiles = action.payload;
      })
      .addCase(fetch10LatestMobiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMobileDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobileDetail.fulfilled, (state, action) => {
        state.loading = false;
        // state.createMobile.push(action.payload);
        state.mobileDetail = action.payload;
      })
      .addCase(fetchMobileDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        // state.createMobile.push(action.payload);
        state.brandData = action.payload;
      })
      
      
  },
});

export const selectFetch10Mobiles = (state) => state.mobile.fetch10Mobiles;
export const selectMobileDetail = (state) => state.mobile.mobileDetail;
export const selectAllBrands = (state) => state.mobile.brandData;

export default mobileSlice.reducer;
