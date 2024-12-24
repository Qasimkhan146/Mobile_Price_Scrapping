//store.js
import { configureStore } from "@reduxjs/toolkit";
import mobileReducer from "./mobileSlicer";
import authReducer from "./authSlicer";
export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
        auth: authReducer,
    },
});

