import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ports from "../../components/PortsAvailable/portData";

export const fetchPortList = createAsyncThunk(
    "ports/fetchPortList",
    async () => {
        const response = await fetch('http://127.0.0.1:8000/Port/');
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        return await response.json();
    }
);

const initialState = {
    data: "",
    loading: false,
    error: null,
};

const portSlice = createSlice({
    name: "ports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPortList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPortList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const portReducer = portSlice.reducer;
export const portSelector = (state) => state.ports.data;
export const portListLoading = (state) => state.ports.loading;
export const portsError = (state) => state.ports.error;