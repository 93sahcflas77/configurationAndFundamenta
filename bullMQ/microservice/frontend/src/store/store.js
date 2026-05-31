import { configureStore } from "@reduxjs/toolkit";
import emailSlice from "./emailSlice";



export const store = configureStore({
    reducer: {
        emai: emailSlice
    }
})


export default store