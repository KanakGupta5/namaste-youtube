import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        isShowMenu: true,
        isOnline: true
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
            state.isShowMenu = true;
        },
        closeMenu: (state) => {
            state.isShowMenu = false;
        },
        setOnlineStatus: (state, action) => {
            state.isOnline = action.payload
        }
    }
})

export const {toggleMenu, closeMenu, setOnlineStatus} = appDataSlice.actions;

export default appDataSlice.reducer;