import { createSlice } from "@reduxjs/toolkit";

const appDataSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen: true,
        isShowMenu: true,
        isOnline: true,
        videoCategoryId: null
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
        },
        setVideoCategoryId: (state, action) => {
            state.videoCategoryId = action.payload.videoCategoryId
        }
    }
})

export const {toggleMenu, closeMenu, setOnlineStatus, setVideoCategoryId} = appDataSlice.actions;

export default appDataSlice.reducer;