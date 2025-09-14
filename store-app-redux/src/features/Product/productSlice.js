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
            const response = await axios.get("http://localhost:3000/products");
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);
export const DeleteProduct = createAsyncThunk(
    'delete/products',
    async (ProductId, { rejectWithValue }) => {
        try {
            await axios.delete(`http://localhost:3000/products/${ProductId}`);
            return ProductId;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const UpdateProduct = createAsyncThunk(
    'update/products',
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${id}`, updatedData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const AddProduct = createAsyncThunk(
    'add/product',
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/products", newProduct);
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
            })
            .addCase(DeleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
                state.filteredProducts = state.filteredProducts.filter(p => p.id !== action.payload);
                state.isLoading = false;
            })

            .addCase(DeleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(DeleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.filteredProducts.push(action.payload);
                state.isLoading = false;
            })
            .addCase(AddProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                    state.filteredProducts[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(UpdateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

    }
});

export const { searchProducts, resetSearch } = productListSlice.actions;
export default productListSlice.reducer;