import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
    user: null,
    isLoading: false,
    error: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/users', userData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/users`
            );
            if (response.data.length > 0) {
                return response.data; // return the first matching user
            } else {
                return rejectWithValue("Invalid email or password");
            }
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

// Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        },
        loadUser: (state) => {
            const user = localStorage.getItem("user");
            if (user) {
                state.user = JSON.parse(user);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

    },
});

export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;
