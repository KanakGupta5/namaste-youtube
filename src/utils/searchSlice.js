import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {

    },
    reducers: {
        putInCache: (state, action) => {
            return {...state, ...action?.payload}
        }
    }
})

export const {putInCache} = searchSlice.actions;

export default searchSlice.reducer;