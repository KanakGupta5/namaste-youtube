import { createSlice } from "@reduxjs/toolkit";
import {OFFSET_LIVE_CHAT} from "../utils/constants";

const liveChatSlice = createSlice({
    name:"livechat",
    initialState: {
        messages: []
    },
    reducers: {
        addMessages: (state, action) => {
            state.messages.push(action.payload);
            if(state.messages.length > OFFSET_LIVE_CHAT){
                state.messages = state.messages.slice(-1 * OFFSET_LIVE_CHAT);
            }
        }
    }
})

export const {addMessages} = liveChatSlice.actions;

export default liveChatSlice.reducer;