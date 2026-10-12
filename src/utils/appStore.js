import { configureStore } from "@reduxjs/toolkit";
import appDataSlice from "./appDataSlice";
import searchSlice from "./searchSlice";

const appStore = configureStore({
    reducer: {
        app: appDataSlice,
        search: searchSlice
    }
})

export default appStore;