import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
};

export const GetAllProducts = createAsyncThunk(
    'get/products',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const productListSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        searchProducts: (state, action) => {
            const query = action.payload.toLowerCase();
            state.filteredProducts = state.products.filter(product =>
                product.title.toLowerCase().includes(query)
            );
        },
        // Add a reducer to reset the filtered products
        resetSearch: (state) => {
            state.filteredProducts = [...state.products];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.filteredProducts = action.payload; // Initialize filtered products
                state.isLoading = false;
                state.error = null;
            })
            .addCase(GetAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(GetAllProducts.pending, (state) => {
                state.isLoading = true;
            });
    }
});

export const { searchProducts, resetSearch } = productListSlice.actions;
export default productListSlice.reducer;