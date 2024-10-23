import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/action';

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
    },
    reducers: {
        logout: (state) => {
            state.isLogin = false;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            //login success
            const isLogin = action.payload;
            state.isLogin = isLogin;
        })
        .addCase(login.rejected, (state, action) => {
            const isLogin = action.payload;
            //login failure
            state.isLogin = isLogin;
        });
    },
});

export const { Login, logout } = authSlice.actions;

export default authSlice.reducer;