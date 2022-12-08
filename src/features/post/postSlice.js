import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchNewPosts from "../../API/fetchNewPosts";
import { useAuth } from '../../hooks/useAuth'
const initialState = {
  postsList: [],
  status: 'idle'
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async (amount) => {
        const { token } = useAuth()
        try {
          const response = await fetchNewPosts(token.access_token);
          // The value we return becomes the `fulfilled` action payload
          const postsList = response.data.children.map(post => post.data)
          return postsList;

        } catch ( e ) {
          console.log(e)
        }
    }
  );
  
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      doSomething: (state) => {}
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.postsList = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'rejected';
          state.postsList = action.payload;
        })
    },
  });

export const { doSomething } = postSlice.actions;
export const selectPostsListStatus = (state) => state.posts.status;
export const selectPostsLists = ({ posts }) => posts.postsList 
export default postSlice.reducer;


