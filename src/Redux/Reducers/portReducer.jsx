import { createSlice } from "@reduxjs/toolkit";
import ports from "../../components/PortsAvailable/portData";

const initialState = ports;

const portSlice = createSlice({
    name:"ports",
    initialState,
    reducers:{}
});

export const portReducer = portSlice.reducer;
export const portSelector = (state)=>state.ports;