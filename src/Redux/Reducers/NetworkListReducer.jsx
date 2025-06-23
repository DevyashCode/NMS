import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

const initialState = {data}

const NetworkListSlice = createSlice({
    name:"NetworkList",
    initialState,
    reducers:{}
});

export const NetworkListReducer = NetworkListSlice.reducer;
export const NetworkListSelector = (state)=>state.NetworkList.data;
