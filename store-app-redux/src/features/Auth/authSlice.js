import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            const response = await axios.post("http://localhost:3000/users", userData);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

// LOGIN
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            // --- Hardcoded Admin login ---
            if (email === "admin" && password === "admin") {
                const adminUser = { id: "0", email: "admin", role: "admin" };
                const fakeToken = `admin-token-${Date.now()}`;

                localStorage.setItem("user", JSON.stringify(adminUser));
                localStorage.setItem("token", fakeToken);
                localStorage.setItem("role", "admin");

                return adminUser;
            }

            // --- Normal users from db.json ---
            const response = await axios.get("http://localhost:3000/users", {
                params: { email, password },
            });

            if (response.data.length === 0) {
                return rejectWithValue("Invalid email or password");
            }

            const foundUser = response.data[0];
            const fakeToken = `token-${Date.now()}`;

            localStorage.setItem("user", JSON.stringify(foundUser));
            localStorage.setItem("token", fakeToken);
            localStorage.setItem("role", foundUser.role || "user");

            return foundUser;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
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
