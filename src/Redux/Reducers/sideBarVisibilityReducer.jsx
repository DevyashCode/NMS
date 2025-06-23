import { createSlice } from "@reduxjs/toolkit";

const sidebarVisibilitySlice = createSlice({
    name:"sidebarVisibility",
    initialState:false,
    reducers:{
        svToggle:(state,action)=>{
            return action.payload;
        }
    }
});

export const svReducer = sidebarVisibilitySlice.reducer;
export const svSelector = (state)=>state.sidebarVisibility;
export const svActions = sidebarVisibilitySlice.actions;




