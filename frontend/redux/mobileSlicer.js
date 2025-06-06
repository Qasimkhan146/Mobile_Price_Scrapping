//productSlicer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetch10LatestMobiles = createAsyncThunk(
  "mobile/fetchCreateMobile",
  async ({brand,Ram,Rom,Back_Cam,model,Year}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetch10LatestMobilesWithHistory?brand=${brand}&Ram=${Ram}&Rom=${Rom}&Back_Cam=${Back_Cam}&model=${model}&Year=${Year}`
        
      );
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//all Mobiles 
export const fetchAllMobiles = createAsyncThunk(
  "mobile/fetchAllMobiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetchAllMobiles`
        
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchMobileDetail = createAsyncThunk(
  "mobile/fetchMobileDetail",
  async (model, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetchSingleMobile/${model}`
        
      );
      const data = await response.json();

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

export const editPrices = createAsyncThunk(
  "mobile/editPrices",
  async ({ model, updatedPrices }, { rejectWithValue }) => {
    try {
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/updateMobileWithHistory/${model}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPrices),
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
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/mobileFilters?brand=${brand}`
        
      );
      const data = await response.json();
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
      
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/fetchAdvanceFilters?brand=${brand}&model=${model}&minRam=${minRam}&maxRam=${maxRam}&minRom=${minRom}&maxRom=${maxRom}&min_Back_Cam=${min_Back_Cam}&max_Back_Cam=${max_Back_Cam}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&Year=${Year}`
        
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk("comments/fetchComments",async (model, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://7842.mobileprice.biz.pk/mobile/viewComments/${model}`);
      const data = await response.json();
      return data; // Assuming your API returns comments under `comments` key
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitComment = createAsyncThunk(
  "NewsData/submitComment",
  async ({ data, commentId }, thunkAPI) => {
      try {
      const response = await fetch(
        `https://7842.mobileprice.biz.pk/mobile/postComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      const result = await response.json();
       return result;
    } catch (error) {
      console.error("Error in submitComment:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNewArrivalMobiles = createAsyncThunk("mobile/fetchNewArrivalMobiles",async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://7842.mobileprice.biz.pk/mobile/fetchNewArrivalMobiles`);
      const data = await response.json();
      console.log("what us ",data);
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
    fetchNewArrivalMobiles:[],
    comments:[],
    allComments: { comments: [] },
    mobileDetail: null,
    filterMobiles : [],
    allMobiles:[],
    advanceFilterMobiles:[],
    brandData:[],
    editMobileData:null,
    error: null,
    updatedPrice: null,
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
      .addCase(fetchAllMobiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMobiles.fulfilled, (state, action) => {
        state.loading = false;
        // state.createMobile.push(action.payload);
        state.allMobiles = action.payload;
      })
      .addCase(fetchAllMobiles.rejected, (state, action) => {
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
      .addCase(editMobile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMobile.fulfilled, (state, action) => {
        state.loading = false;
        state.editMobileData = action.payload;
      })
      .addCase(editMobile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedPrice = action.payload;
      })
      .addCase(editPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //for comments on mobiles
      .addCase(submitComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); 
        state.error = null;
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      //for all comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
        state.error = null;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNewArrivalMobiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivalMobiles.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchNewArrivalMobiles = action.payload;
      })
      .addCase(fetchNewArrivalMobiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectFetch10Mobiles = (state) => state.mobile.fetch10Mobiles;
export const selectMobileDetail = (state) => state.mobile.mobileDetail;
export const selectAllBrands = (state) => state.mobile.brandData;
export const filterMobiles = (state) => state.mobile.filterMobiles;
export const selectError = (state) => state.mobile.error;
export const selectEditMobile = (state) => state.mobile.editMobileData;
export const selectAdvanceFilterMobiles = (state) => state.mobile.advanceFilterMobiles;
export const selectAllMobiles = (state) => state.mobile.allMobiles;
export const selectUpdatedPrice = (state) => state.mobile.updatedPrice;
export const selectNewArrivalMobiles = (state) => state.mobile.fetchNewArrivalMobiles;
//for comments
export const selectComment = (state) => state.mobile.comments;
export const selectAllComments = (state) => state.mobile.allComments;
export default mobileSlice.reducer;



