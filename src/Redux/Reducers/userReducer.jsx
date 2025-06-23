import { createSlice } from "@reduxjs/toolkit";
import users from "../../components/ChangeRoles/userData";

const userSlice = createSlice({
    name:"users",
    initialState:users,
    reducers:{}
});

export const userReducer = userSlice.reducer;
export const userSelector = (state)=>state.users;