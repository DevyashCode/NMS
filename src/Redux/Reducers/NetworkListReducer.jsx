// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import data from "../data";

// // export const fetchNetworkList = createAsyncThunk(
// //   "NetworkList/fetchNetworkList",
// //   async () => {
// //     const AccessToken = localStorage.getItem("access");
// //     const googleToken = localStorage.getItem("google_access_token");
// //     const token = AccessToken ? AccessToken : googleToken;
// //     console.log("Using token:", token);

// //     const response = await fetch('http://127.0.0.1:8000/Network/', {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${token}`
// //       }
// //     });
// //     // const response = await fetch('https://gc21q80j-8000.inc1.devtunnels.ms/Network/');
// //     if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
// //     return await response.json();
// //   }
// // );

// // export const scanIp = createAsyncThunk(
// //   "NetworkList/searchIp",
// //   async (ip, { rejectWithValue }) => {
// //     const AccessToken = localStorage.getItem("access");
// //     const googleToken = localStorage.getItem("google_access_token");
// //     const token = AccessToken ? AccessToken : googleToken;
// //     console.log("Using token:", token);
// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/Scan/', {
// //         // const response = await fetch('https://gc21q80j-8000.inc1.devtunnels.ms/Scan/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
// //         body: JSON.stringify(ip),
// //       });
// //       if (!response.ok) {
// //         const error = await response.json();
// //         return rejectWithValue(error);
// //       }
// //       const data = await response.json();
// //       return data;
// //     }
// //     catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // )

// // export const addNetwork = createAsyncThunk(
// //   "NetworkList/addNetwork",
// //   async (networkData, { rejectWithValue }) => {
// //     const AccessToken = localStorage.getItem("access");
// //     const googleToken = localStorage.getItem("google_access_token");
// //     const token = AccessToken ? AccessToken : googleToken;
// //     console.log("Using token:", token);
// //     try {
// //       const response = await fetch('http://127.0.0.1:8000/Network/', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
// //         body: JSON.stringify(networkData),
// //       });
// //       if (!response.ok) {
// //         const error = await response.json();
// //         return rejectWithValue(error);
// //       }
// //       const data = await response.json();
// //       return data;
// //     }
// //     catch (error) {
// //       return rejectWithValue(error.message);
// //     }
// //   }
// // )

// // export const updateNetwork = createAsyncThunk(
// //   "NetworkList/updateNetwork",
// //   async ({ mac, networkData }, thunkAPI) => {
// //     const AccessToken = localStorage.getItem("access");
// //     const googleToken = localStorage.getItem("google_access_token");
// //     const token = AccessToken ? AccessToken : googleToken;
// //     console.log("Using token:", token);
// //     try {
// //       const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
// //         // const response = await fetch(`https://gc21q80j-8000.inc1.devtunnels.ms/${mac}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(networkData)
// //       });
// //       if (!response.ok) {
// //         throw new Error('Failed to update user');
// //       }
// //       const data = await response.json();
// //       return data;
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // )

// // export const deleteNetwork = createAsyncThunk(
// //   "NetworkList/deleteNetwork",
// //   async ({ mac }, thunkAPI) => {
// //     const AccessToken = localStorage.getItem("access");
// //     const googleToken = localStorage.getItem("google_access_token");
// //     const token = AccessToken ? AccessToken : googleToken;
// //     try {
// //       const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
// //         // const response = await fetch(`https://gc21q80j-8000.inc1.devtunnels.ms/${mac}/`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
// //       if (!response.ok) {
// //         throw new Error('Failed to delete Network');
// //       }
// //       return mac;
// //     }
// //     catch (error) {
// //       return thunkAPI.rejectWithValue(error.message);
// //     }
// //   }
// // )

// // const initialState = {
// //   data: [],
// //   scannedData: "",
// //   addedNetwork: "",
// //   loading: false,
// //   loadingScan: false,
// //   addLoading: false,
// //   error: null,
// // };

// // const NetworkListSlice = createSlice({
// //   name: "NetworkList",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchNetworkList.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchNetworkList.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.data = action.payload;
// //       })
// //       .addCase(fetchNetworkList.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       })
// //       .addCase(scanIp.pending, (state) => {
// //         state.loadingScan = true;
// //         state.error = null;
// //       })
// //       .addCase(scanIp.fulfilled, (state, action) => {
// //         state.loadingScan = false;
// //         state.scannedData = action.payload;
// //       })
// //       .addCase(scanIp.rejected, (state, action) => {
// //         state.loadingScan = false;
// //         state.error = action.error.message;
// //       })
// //       .addCase(addNetwork.pending, (state) => {
// //         state.addLoading = true;
// //         state.error = null;
// //       })
// //       .addCase(addNetwork.fulfilled, (state, action) => {
// //         state.addLoading = false;
// //         const addedNetwork = action.payload;
// //         state.data.unshift(addedNetwork);
// //         state.addedNetwork = addedNetwork;
// //       })
// //       .addCase(addNetwork.rejected, (state, action) => {
// //         state.addLoading = false;
// //         state.error = action.error.message;
// //       })
// //       .addCase(updateNetwork.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(updateNetwork.fulfilled, (state, action) => {
// //         state.loading = false;
// //         const updatedNetwork = action.payload;
// //         const index = state.data.findIndex(network => network.mac_address === updatedNetwork.mac_address);
// //         if (index !== -1) {
// //           state.data[index] = updatedNetwork;
// //         }
// //       })
// //       .addCase(updateNetwork.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       })
// //       .addCase(deleteNetwork.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(deleteNetwork.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.data = state.data.filter(item => item.mac_address !== action.payload);
// //       })
// //       .addCase(deleteNetwork.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const NetworkListReducer = NetworkListSlice.reducer;
// // export const NetworkListSelector = (state) => state.NetworkList.data;
// // export const NetworkScannedDataSelector = (state) => state.NetworkList.scannedData;
// // export const AddedNetworkSelector = (state) => state.NetworkList.addedNetwork;
// // export const NetworkListLoading = (state) => state.NetworkList.loading;
// // export const NetworkLoadingScan = (state) => state.NetworkList.loadingScan;
// // export const NetworkAddLoading = (state) => state.NetworkList.loadingAdd;
// // export const NetworkListError = (state) => state.NetworkList.error;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // SSE connection action (not async thunk since it's event-based)
// export const connectToNetworkSSE = createAsyncThunk(
//   "NetworkList/connectToSSE",
//   async (url, { dispatch, getState }) => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
    
//     return new Promise((resolve, reject) => {
//       try {
//         const eventSource = new EventSource(url, {
//           withCredentials: true,
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         eventSource.onopen = () => {
//           dispatch(sseConnected());
//           resolve('connected');
//         };

//         eventSource.onmessage = (event) => {
//           try {
//             const data = JSON.parse(event.data);
//             console.log('SSE Data received:', data);
            
//             // Handle different message types from SSE
//             switch (data.type) {
//               case 'initial':
//                 dispatch(sseInitialData(data.networks || data.devices || []));
//                 break;
//               case 'network_update':
//               case 'status_update':
//                 dispatch(updateNetworksFromSSE(data.networks || data.devices || []));
//                 break;
//               case 'network_added':
//                 dispatch(addNetworkFromSSE(data.network));
//                 break;
//               case 'network_updated':
//                 dispatch(updateNetworkFromSSE(data.network));
//                 break;
//               case 'network_deleted':
//                 dispatch(deleteNetworkFromSSE(data.mac_address));
//                 break;
//               default:
//                 console.log('Unhandled SSE message type:', data.type);
//             }
//           } catch (error) {
//             console.error('Error parsing SSE data:', error);
//             dispatch(sseError('Failed to parse SSE data'));
//           }
//         };

//         eventSource.onerror = (error) => {
//           console.error('SSE connection error:', error);
//           dispatch(sseError('SSE connection failed'));
//           eventSource.close();
//           reject(error);
//         };

//         // Store the event source for cleanup
//         return eventSource;
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
// );

// export const fetchNetworkList = createAsyncThunk(
//   "NetworkList/fetchNetworkList",
//   async () => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
//     console.log("Using token:", token);

//     const response = await fetch('http://127.0.0.1:8000/Network/', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
//     return await response.json();
//   }
// );

// export const scanIp = createAsyncThunk(
//   "NetworkList/searchIp",
//   async (ip, { rejectWithValue }) => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
//     console.log("Using token:", token);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/Scan/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify(ip),
//       });
//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error);
//       }
//       const data = await response.json();
//       return data;
//     }
//     catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// )

// export const addNetwork = createAsyncThunk(
//   "NetworkList/addNetwork",
//   async (networkData, { rejectWithValue }) => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
//     console.log("Using token:", token);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/Network/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify(networkData),
//       });
//       if (!response.ok) {
//         const error = await response.json();
//         return rejectWithValue(error);
//       }
//       const data = await response.json();
//       return data;
//     }
//     catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// )

// export const updateNetwork = createAsyncThunk(
//   "NetworkList/updateNetwork",
//   async ({ mac, networkData }, thunkAPI) => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
//     console.log("Using token:", token);
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(networkData)
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update user');
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// )

// export const deleteNetwork = createAsyncThunk(
//   "NetworkList/deleteNetwork",
//   async ({ mac }, thunkAPI) => {
//     const AccessToken = localStorage.getItem("access");
//     const googleToken = localStorage.getItem("google_access_token");
//     const token = AccessToken ? AccessToken : googleToken;
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete Network');
//       }
//       return mac;
//     }
//     catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// )

// const initialState = {
//   data: [],
//   scannedData: "",
//   addedNetwork: "",
//   loading: false,
//   loadingScan: false,
//   addLoading: false,
//   error: null,
//   // SSE specific state
//   sseStatus: 'disconnected', // 'disconnected', 'connecting', 'connected', 'error'
//   sseError: null,
//   lastUpdate: null,
// };

// const NetworkListSlice = createSlice({
//   name: "NetworkList",
//   initialState,
//   reducers: {
//     // SSE specific reducers
//     sseConnecting: (state) => {
//       state.sseStatus = 'connecting';
//       state.sseError = null;
//     },
//     sseConnected: (state) => {
//       state.sseStatus = 'connected';
//       state.sseError = null;
//     },
//     sseDisconnected: (state) => {
//       state.sseStatus = 'disconnected';
//     },
//     sseError: (state, action) => {
//       state.sseStatus = 'error';
//       state.sseError = action.payload;
//     },
//     // SSE data handlers
//     sseInitialData: (state, action) => {
//       state.data = action.payload;
//       state.lastUpdate = new Date().toISOString();
//     },
//     updateNetworksFromSSE: (state, action) => {
//       // Update multiple networks
//       const updatedNetworks = action.payload;
//       updatedNetworks.forEach(updatedNetwork => {
//         const index = state.data.findIndex(network => 
//           network.mac_address === updatedNetwork.mac_address || 
//           network.id === updatedNetwork.id
//         );
//         if (index !== -1) {
//           state.data[index] = { ...state.data[index], ...updatedNetwork };
//         } else {
//           state.data.push(updatedNetwork);
//         }
//       });
//       state.lastUpdate = new Date().toISOString();
//     },
//     addNetworkFromSSE: (state, action) => {
//       // Add single network from SSE
//       const newNetwork = action.payload;
//       const exists = state.data.find(network => 
//         network.mac_address === newNetwork.mac_address || 
//         network.id === newNetwork.id
//       );
//       if (!exists) {
//         state.data.unshift(newNetwork);
//         state.lastUpdate = new Date().toISOString();
//       }
//     },
//     updateNetworkFromSSE: (state, action) => {
//       // Update single network from SSE
//       const updatedNetwork = action.payload;
//       const index = state.data.findIndex(network => 
//         network.mac_address === updatedNetwork.mac_address || 
//         network.id === updatedNetwork.id
//       );
//       if (index !== -1) {
//         state.data[index] = updatedNetwork;
//         state.lastUpdate = new Date().toISOString();
//       }
//     },
//     deleteNetworkFromSSE: (state, action) => {
//       // Delete network from SSE
//       const macAddress = action.payload;
//       state.data = state.data.filter(network => network.mac_address !== macAddress);
//       state.lastUpdate = new Date().toISOString();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Existing cases
//       .addCase(fetchNetworkList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchNetworkList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchNetworkList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(scanIp.pending, (state) => {
//         state.loadingScan = true;
//         state.error = null;
//       })
//       .addCase(scanIp.fulfilled, (state, action) => {
//         state.loadingScan = false;
//         state.scannedData = action.payload;
//       })
//       .addCase(scanIp.rejected, (state, action) => {
//         state.loadingScan = false;
//         state.error = action.error.message;
//       })
//       .addCase(addNetwork.pending, (state) => {
//         state.addLoading = true;
//         state.error = null;
//       })
//       .addCase(addNetwork.fulfilled, (state, action) => {
//         state.addLoading = false;
//         const addedNetwork = action.payload;
//         state.data.unshift(addedNetwork);
//         state.addedNetwork = addedNetwork;
//       })
//       .addCase(addNetwork.rejected, (state, action) => {
//         state.addLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(updateNetwork.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateNetwork.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedNetwork = action.payload;
//         const index = state.data.findIndex(network => network.mac_address === updatedNetwork.mac_address);
//         if (index !== -1) {
//           state.data[index] = updatedNetwork;
//         }
//       })
//       .addCase(updateNetwork.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(deleteNetwork.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteNetwork.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = state.data.filter(item => item.mac_address !== action.payload);
//       })
//       .addCase(deleteNetwork.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       // SSE connection cases
//       .addCase(connectToNetworkSSE.pending, (state) => {
//         state.sseStatus = 'connecting';
//         state.sseError = null;
//       })
//       .addCase(connectToNetworkSSE.fulfilled, (state) => {
//         state.sseStatus = 'connected';
//         state.sseError = null;
//       })
//       .addCase(connectToNetworkSSE.rejected, (state, action) => {
//         state.sseStatus = 'error';
//         state.sseError = action.error.message;
//       });
//   },
// });

// export const {
//   sseConnecting,
//   sseConnected,
//   sseDisconnected,
//   sseError,
//   sseInitialData,
//   updateNetworksFromSSE,
//   addNetworkFromSSE,
//   updateNetworkFromSSE,
//   deleteNetworkFromSSE,
// } = NetworkListSlice.actions;

// export const NetworkListReducer = NetworkListSlice.reducer;

// // Selectors
// export const NetworkListSelector = (state) => state.NetworkList.data;
// export const NetworkScannedDataSelector = (state) => state.NetworkList.scannedData;
// export const AddedNetworkSelector = (state) => state.NetworkList.addedNetwork;
// export const NetworkListLoading = (state) => state.NetworkList.loading;
// export const NetworkLoadingScan = (state) => state.NetworkList.loadingScan;
// export const NetworkAddLoading = (state) => state.NetworkList.addLoading;
// export const NetworkListError = (state) => state.NetworkList.error;

// // SSE Selectors
// export const NetworkSSEStatus = (state) => state.NetworkList.sseStatus;
// export const NetworkSSEError = (state) => state.NetworkList.sseError;
// export const NetworkLastUpdate = (state) => state.NetworkList.lastUpdate;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// SSE connection thunk
export const connectToNetworkSSE = createAsyncThunk(
  "NetworkList/connectToSSE",
  async (url, { dispatch, getState }) => {
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    
    return new Promise((resolve, reject) => {
      try {
        // Note: EventSource doesn't support custom headers in the constructor
        // If your backend requires auth, use query parameters or cookies
        const eventSource = new EventSource(url);

        eventSource.onopen = () => {
          console.log('✅ SSE connection established');
          dispatch(sseConnected());
          resolve('connected');
        };

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('📨 SSE data received:', data);
            
            // Handle different message types from SSE
            switch (data.type) {
              case 'initial':
                dispatch(sseInitialData(data.networks || data.devices || []));
                break;
              case 'network_update':
              case 'status_update':
                dispatch(updateNetworksFromSSE(data.networks || data.devices || []));
                break;
              case 'network_added':
                dispatch(addNetworkFromSSE(data.network));
                break;
              case 'network_updated':
                dispatch(updateNetworkFromSSE(data.network));
                break;
              case 'network_deleted':
                dispatch(deleteNetworkFromSSE(data.mac_address));
                break;
              default:
                console.log('Unhandled SSE message type:', data.type);
            }
          } catch (error) {
            console.error('Error parsing SSE data:', error);
            dispatch(sseError('Failed to parse SSE data'));
          }
        };

        eventSource.onerror = (error) => {
          console.error('SSE connection error:', error);
          dispatch(sseError('SSE connection failed'));
          eventSource.close();
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }
);

// Disconnect SSE thunk
export const disconnectNetworkSSE = createAsyncThunk(
  "NetworkList/disconnectSSE",
  async (_, { getState, dispatch }) => {
    // Since we don't store EventSource in state, we rely on component cleanup
    // This just updates the state to reflect disconnection
    dispatch(sseDisconnected());
    return 'disconnected';
  }
);

export const fetchNetworkList = createAsyncThunk(
  "NetworkList/fetchNetworkList",
  async () => {
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);

    const response = await fetch('http://127.0.0.1:8000/Network/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return await response.json();
  }
);

export const scanIp = createAsyncThunk(
  "NetworkList/searchIp",
  async (ip, { rejectWithValue }) => {
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch('http://127.0.0.1:8000/Scan/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch('http://127.0.0.1:8000/Network/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
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
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
    const AccessToken = localStorage.getItem("access");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    try {
      const response = await fetch(`http://127.0.0.1:8000/Network/${mac}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
  data: [],
  scannedData: "",
  addedNetwork: "",
  loading: false,
  loadingScan: false,
  addLoading: false,
  error: null,
  // SSE specific state
  sseStatus: 'disconnected', // 'disconnected', 'connecting', 'connected', 'error'
  sseError: null,
  lastUpdate: null,
};

const NetworkListSlice = createSlice({
  name: "NetworkList",
  initialState,
  reducers: {
    // SSE specific reducers
    sseConnecting: (state) => {
      state.sseStatus = 'connecting';
      state.sseError = null;
    },
    sseConnected: (state) => {
      state.sseStatus = 'connected';
      state.sseError = null;
    },
    sseDisconnected: (state) => {
      state.sseStatus = 'disconnected';
      state.sseError = null;
    },
    sseError: (state, action) => {
      state.sseStatus = 'error';
      state.sseError = action.payload;
    },
    // SSE data handlers
    sseInitialData: (state, action) => {
      state.data = action.payload;
      state.lastUpdate = new Date().toISOString();
    },
    updateNetworksFromSSE: (state, action) => {
      // Update multiple networks
      const updatedNetworks = action.payload;
      updatedNetworks.forEach(updatedNetwork => {
        const index = state.data.findIndex(network => 
          network.mac_address === updatedNetwork.mac_address
        );
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...updatedNetwork };
        } else {
          state.data.push(updatedNetwork);
        }
      });
      state.lastUpdate = new Date().toISOString();
    },
    addNetworkFromSSE: (state, action) => {
      // Add single network from SSE
      const newNetwork = action.payload;
      const exists = state.data.find(network => 
        network.mac_address === newNetwork.mac_address
      );
      if (!exists) {
        state.data.unshift(newNetwork);
        state.lastUpdate = new Date().toISOString();
      }
    },
    updateNetworkFromSSE: (state, action) => {
      // Update single network from SSE
      const updatedNetwork = action.payload;
      const index = state.data.findIndex(network => 
        network.mac_address === updatedNetwork.mac_address
      );
      if (index !== -1) {
        state.data[index] = updatedNetwork;
        state.lastUpdate = new Date().toISOString();
      }
    },
    deleteNetworkFromSSE: (state, action) => {
      // Delete network from SSE
      const macAddress = action.payload;
      state.data = state.data.filter(network => network.mac_address !== macAddress);
      state.lastUpdate = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing cases
      .addCase(fetchNetworkList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNetworkList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNetworkList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      // SSE connection cases
      .addCase(connectToNetworkSSE.pending, (state) => {
        state.sseStatus = 'connecting';
        state.sseError = null;
      })
      .addCase(connectToNetworkSSE.fulfilled, (state) => {
        state.sseStatus = 'connected';
        state.sseError = null;
      })
      .addCase(connectToNetworkSSE.rejected, (state, action) => {
        state.sseStatus = 'error';
        state.sseError = action.error.message;
      })
      .addCase(disconnectNetworkSSE.fulfilled, (state) => {
        state.sseStatus = 'disconnected';
        state.sseError = null;
      });
  },
});

export const {
  sseConnecting,
  sseConnected,
  sseDisconnected,
  sseError,
  sseInitialData,
  updateNetworksFromSSE,
  addNetworkFromSSE,
  updateNetworkFromSSE,
  deleteNetworkFromSSE,
} = NetworkListSlice.actions;

export const NetworkListReducer = NetworkListSlice.reducer;

// Selectors
export const NetworkListSelector = (state) => state.NetworkList.data;
export const NetworkScannedDataSelector = (state) => state.NetworkList.scannedData;
export const AddedNetworkSelector = (state) => state.NetworkList.addedNetwork;
export const NetworkListLoading = (state) => state.NetworkList.loading;
export const NetworkLoadingScan = (state) => state.NetworkList.loadingScan;
export const NetworkAddLoading = (state) => state.NetworkList.addLoading;
export const NetworkListError = (state) => state.NetworkList.error;

// SSE Selectors
export const NetworkSSEStatus = (state) => state.NetworkList.sseStatus;
export const NetworkSSEError = (state) => state.NetworkList.sseError;
export const NetworkLastUpdate = (state) => state.NetworkList.lastUpdate;