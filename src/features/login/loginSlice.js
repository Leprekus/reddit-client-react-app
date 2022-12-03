import { createSlice } from "@reduxjs/toolkit"

const initialState = {}
export const loginSlice = createSlice({
    name: 'login',
    initialState, 
    reducers: {},
    extraReducers: (builder) => {}
})

export const { someFunc } = loginSlice.actions;