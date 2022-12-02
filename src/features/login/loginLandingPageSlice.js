import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: ''
};

export const loginLandingPageSlice = createSlice({
    name: 'loginLandingPage',
    initialState,
    reducers: {
        saveToken: (state) => {},
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase()
    // }
})

export const { saveToken } = loginLandingPageSlice.actions;
export const selectToken = (state) => state.loginLandingPageSlice.token;

export default loginLandingPageSlice.reducer; 