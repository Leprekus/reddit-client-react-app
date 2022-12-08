import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchNewPosts from "../../API/fetchNewPosts";
import { useAuth } from '../../hooks/useAuth'
const initialState = {}

export const fetchPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async (amount) => {
        const { token } = useAuth()
      const response = await fetchNewPosts(token);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
  
export const counterSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'idle';
          state.value += action.payload;
        })
    },
  });