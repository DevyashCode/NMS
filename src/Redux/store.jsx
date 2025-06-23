import { configureStore } from "@reduxjs/toolkit";
import { NetworkListReducer } from "./Reducers/NetworkListReducer";
import { themeReducer } from "./Reducers/themeReducer";
import { portReducer } from "./Reducers/portReducer";
import { userReducer } from "./Reducers/userReducer";
import { svReducer } from "./Reducers/sideBarVisibilityReducer";

const store = configureStore({
    reducer:{
        NetworkList:NetworkListReducer,
        theme:themeReducer,
        ports:portReducer,
        users:userReducer,
        sidebarVisibility:svReducer
    }
})

export default store;