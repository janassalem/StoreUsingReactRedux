import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the orders
const initialState = {
    orders: [],
    spOrders: [],
    isLoading: false,
    error: null,
};

// Create an async thunk to handle placing an order via an API call
// This thunk will handle the "pending", "fulfilled", and "rejected" states automatically.
export const placeOrder = createAsyncThunk(
    'orders/placeOrder',
    async (orderData, { rejectWithValue }) => {
        try {
            const newOrder = { ...orderData, status: "Pending" };
            console.log(newOrder)
            const response = await axios.post(`http://localhost:3000/orders`, newOrder);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);



export const GetSpOrders = createAsyncThunk(
    'get/GetSpOrders',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:3000/orders/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);

        }
    }
);

export const GetAllOrders = createAsyncThunk(
    'get/orders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3000/orders");
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`http://localhost:3000/orders/${id}`, updates);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const putOrder = createAsyncThunk(
    'putorder/orders',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/orders",data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

// Create the order slice with its reducers and extra reducers
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // A simple reducer to add a new order manually
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        // A reducer to clear the list of orders
        clearOrders: (state) => {
            state.orders = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // When the async thunk is pending
            .addCase(placeOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            // When the async thunk is fulfilled (success)
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload);
            })
            // When the async thunk is rejected (error)
            .addCase(placeOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // action.payload contains the error message from rejectWithValue
            })
            .addCase(GetAllOrders.fulfilled,(state,action)=>{
                state.orders = action.payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders.push(action.payload);
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // action.payload contains the error message from rejectWithValue
            })


    },
});

// Export the reducer and actions
export const { addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
