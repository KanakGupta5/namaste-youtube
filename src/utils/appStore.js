import { configureStore } from "@reduxjs/toolkit";
import appDataSlice from "./appDataSlice";
import searchSlice from "./searchSlice";
import liveChatSlice from "./liveChatSlice";

const appStore = configureStore({
    reducer: {
        app: appDataSlice,
        search: searchSlice,
        livechat: liveChatSlice
    }
})

export default appStore;