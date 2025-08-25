import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import data from "../data";

export const fetchNetworkList = createAsyncThunk(
  "NetworkList/fetchNetworkList",
  async () => {
    const response = await fetch('http://127.0.0.1:8000/Network/');
    // const response = await fetch('https://gc21q80j-8000.inc1.devtunnels.ms/Network/');
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return await response.json();
  }
);

export const scanIp = createAsyncThunk(
  "NetworkList/searchIp",
  async (ip, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Scan/', {
      // const response = await fetch('https://gc21q80j-8000.inc1.devtunnels.ms/Scan/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ip),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const addNetwork = createAsyncThunk(
  "NetworkList/addNetwork",
  async (networkData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/Network/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(networkData),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error);
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const updateNetwork = createAsyncThunk(
  "NetworkList/updateNetwork",
  async ({ mac, networkData }, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
      // const response = await fetch(`https://gc21q80j-8000.inc1.devtunnels.ms/${mac}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(networkData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const deleteNetwork = createAsyncThunk(
  "NetworkList/deleteNetwork",
  async ({ mac }, thunkAPI) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
      // const response = await fetch(`https://gc21q80j-8000.inc1.devtunnels.ms/${mac}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete Network');
      }
      return mac;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

const initialState = {
  data: data,
  scannedData: "",
  addedNetwork:"",
  loading: false,
  loadingScan: false,
  addLoading: false,
  error: null,
};

const NetworkListSlice = createSlice({
  name: "NetworkList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetworkList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkList.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(fetchNetworkList.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      })
      .addCase(scanIp.pending, (state) => {
        state.loadingScan = true;
        state.error = null;
      })
      .addCase(scanIp.fulfilled, (state, action) => {
        state.loadingScan = false;
        state.scannedData = action.payload;
      })
      .addCase(scanIp.rejected, (state, action) => {
        state.loadingScan = false;
        state.error = action.error.message;
      })
      .addCase(addNetwork.pending, (state) => {
        state.addLoading = true;
        state.error = null;
      })
      .addCase(addNetwork.fulfilled, (state, action) => {
        state.addLoading = false;
        const addedNetwork = action.payload;
        state.data.unshift(addedNetwork);
        state.addedNetwork = addedNetwork;
      })
      .addCase(addNetwork.rejected, (state, action) => {
        state.addLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateNetwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNetwork.fulfilled, (state, action) => {
        state.loading = false;
        const updatedNetwork = action.payload;
        const index = state.data.findIndex(network => network.mac_address === updatedNetwork.mac_address);
        if (index !== -1) {
          state.data[index] = updatedNetwork;
        }
      })
      .addCase(updateNetwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteNetwork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNetwork.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(item => item.mac_address !== action.payload);
      })
      .addCase(deleteNetwork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const NetworkListReducer = NetworkListSlice.reducer;
export const NetworkListSelector = (state) => state.NetworkList.data;
export const NetworkScannedDataSelector = (state) => state.NetworkList.scannedData;
export const AddedNetworkSelector = (state) => state.NetworkList.addedNetwork;
export const NetworkListLoading = (state) => state.NetworkList.loading;
export const NetworkLoadingScan = (state) => state.NetworkList.loadingScan;
export const NetworkAddLoading = (state) => state.NetworkList.loadingAdd;
export const NetworkListError = (state) => state.NetworkList.error;
