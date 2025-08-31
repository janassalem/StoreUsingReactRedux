import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from "../features/Product/productSlice.js";
import CartSlice from "../features/Product/CartSlice.js";
import OrderSlice from "../features/Product/OrderSlice.js";

export const store = configureStore({
    reducer:
        {
            ProductState:ProductReducer,
            CartState: CartSlice,
            OrderSlice: OrderSlice,
        },
})