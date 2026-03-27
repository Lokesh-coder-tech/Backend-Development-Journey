import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true, // Starts as true to check auth on page load
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false; // Once user is set, loading is done
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        // ADDED: Clear everything on logout
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;