import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen
        }
    }
})

export const {toggleMenu} = appDataSlice.actions;

export default appDataSlice.reducer;