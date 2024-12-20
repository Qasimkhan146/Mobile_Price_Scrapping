//store.js
import { configureStore } from "@reduxjs/toolkit";
import mobileReducer from "./mobileSlicer";

export const store = configureStore({
    reducer: {
        mobile: mobileReducer,
    },
});

