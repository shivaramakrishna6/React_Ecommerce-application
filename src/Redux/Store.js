import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cartslice";
import wishlistReducer from "./wishlistSlice"
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishlistReducer
    }
})