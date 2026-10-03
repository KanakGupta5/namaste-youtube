import { configureStore } from "@reduxjs/toolkit";
import appDataSlice from "./appDataSlice";

const appStore = configureStore({
    reducer: {
        app: appDataSlice
    }
})

export default appStore;