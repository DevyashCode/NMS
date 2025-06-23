import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("theme") || "light";

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggle:(state,action)=>{
            if(state!="dark"){
                document.documentElement.classList.add("dark");
                localStorage.setItem("theme","dark")
                return "dark"
            }
            else{
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
