import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async () => {
    const AccessToken = localStorage.getItem("access_token");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    const response = await fetch('http://127.0.0.1:8000/UserAuth/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    return await response.json();
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (networkData, { rejectWithValue }) => {
    const AccessToken = localStorage.getItem("access_token");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch('http://127.0.0.1:8000/UserAuth/', {
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
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userName, userData }, thunkAPI) => {
    const AccessToken = localStorage.getItem("access_token");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch(`http://127.0.0.1:8000/UserAuth/${userName}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
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
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ email }, thunkAPI) => {
    const AccessToken = localStorage.getItem("access_token");
    const googleToken = localStorage.getItem("google_access_token");
    const token = AccessToken ? AccessToken : googleToken;
    console.log("Using token:", token);
    try {
      const response = await fetch(`http://127.0.0.1:8000/UserAuth/${email}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete User');
      }
      return email;
    }
    catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
  addLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        const addedUser = action.payload;
        state.data.unshift(addedUser);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.data.findIndex(user => user.email === updatedUser.email);
        if (index !== -1) {
          state.data[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(item => item.email !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSelector = (state) => state.users.data;
export const userListLoading = (state) => state.users.loading;
export const userListError = (state) => state.users.error;