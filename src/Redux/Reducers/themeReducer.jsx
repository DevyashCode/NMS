import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggle:(state,action)=>{
            if(state!="dark"){
                console.log(initialState);
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme","dark")
                return "dark"
            }
            else{
                console.log(state);
                document.documentElement.classList.remove("dark");
                localStorage.setItem("theme","light")
                return "light";
            }
        }
    }
})

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;
export const themeSelector = (state)=>state.theme; 
