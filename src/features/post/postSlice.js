import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchNewPosts from "../../API/fetchNewPosts";
import useAuth from '../../hooks/useAuth'
const initialState = {}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount) => {
        const { token } = useAuth()
      const response = await fetchNewPosts(token);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
export const counterSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(incrementAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(incrementAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        })
        .addCase(incrementAsync.rejected, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        })
    },
  });