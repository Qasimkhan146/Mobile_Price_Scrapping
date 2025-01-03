//productSlicer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetch10LatestMobiles = createAsyncThunk(
  "mobile/fetchCreateMobile",
  async ({brand,Ram,Rom,Back_Cam,model,Year}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetch10LatestMobiles?brand=${brand}&Ram=${Ram}&Rom=${Rom}&Back_Cam=${Back_Cam}&model=${model}&Year=${Year}`
        
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/brand/fetchAllBrands`
        
      );
      const data = await response.json();
      // console.log("Brand Data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const editMobile = createAsyncThunk(
  "mobile/editMobile",
  async ({ model, updatedData }, { rejectWithValue }) => {
    try {
      // console.log(model,"Model");
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/updateMobile/${model}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilterMobiles = createAsyncThunk(
  "mobile/fetchFilterMobiles",
  async ({brand}, { rejectWithValue }) => {
    try {
      // console.log(brand,"Select Brand");
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/mobileFilters?brand=${brand}`
        
      );
      const data = await response.json();
      // console.log("Filter Data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchAdvanceFilters = createAsyncThunk(
  "mobile/fetchAdvanceFilters",
  async ({brand,model,minRam,maxRam,minRom,maxRom,min_Back_Cam,max_Back_Cam,minPrice,maxPrice,page,Year}, { rejectWithValue }) => {
    try {
      // console.log(Year,"dsdsada");
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetchAdvanceFilters?brand=${brand}&model=${model}&minRam=${minRam}&maxRam=${maxRam}&minRom=${minRom}&maxRom=${maxRom}&min_Back_Cam=${min_Back_Cam}&max_Back_Cam=${max_Back_Cam}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&Year=${Year}`
        
      );
      const data = await response.json();
      // console.log("Filter Data", data);
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
    filterMobiles : [],
    advanceFilterMobiles:[],
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
      .addCase(fetchFilterMobiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilterMobiles.fulfilled, (state, action) => {
        state.loading = false;
        state.filterMobiles = action.payload;
      })
      .addCase(fetchFilterMobiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdvanceFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdvanceFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.advanceFilterMobiles = action.payload;
      })
      .addCase(fetchAdvanceFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const selectFetch10Mobiles = (state) => state.mobile.fetch10Mobiles;
export const selectMobileDetail = (state) => state.mobile.mobileDetail;
export const selectAllBrands = (state) => state.mobile.brandData;
export const filterMobiles = (state) => state.mobile.filterMobiles;
export const selectError = (state) => state.mobile.error;
export const selectAdvanceFilterMobiles = (state) => state.mobile.advanceFilterMobiles;
export default mobileSlice.reducer;