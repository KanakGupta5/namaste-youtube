import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        isShowMenu: true
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
            state.isShowMenu = true;
        },
        closeMenu: (state) => {
            state.isShowMenu = false;
        }
    }
})

export const {toggleMenu, closeMenu} = appDataSlice.actions;

export default appDataSlice.reducer;