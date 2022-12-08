import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchNewPosts from "../../API/fetchNewPosts";
import { useAuth } from '../../hooks/useAuth'
const initialState = {}

export const fetchPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async (amount) => {
        const { token } = useAuth()
        try {
          const response = await fetchNewPosts(token.access_token);
          // The value we return becomes the `fulfilled` action payload
          console.log(response.data)
          return response.data;

        } catch ( e ) {
          console.log(e)
        }
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