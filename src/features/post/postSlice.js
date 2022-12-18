import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCommentSection from "../../API/fetchCommentSection";
import useFetchData from "../../hooks/useFetchData";
import { useAuth } from '../../hooks/useAuth'
import { redditPosts } from "../../mocks/responseData";
const initialState = {
  postsList: [],
  commentsList: [],
  status: 'idle',
  commentStatus: 'idle'
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async () => {
        try {
          const homepage = '.json?sort=new'
          const response = await useFetchData(homepage);
          const postsList = response.data.children.map(post => post.data)
          console.log(postsList)
          return postsList;
          // const dummyPostsList = redditPosts
          // return dummyPostsList
        } catch ( e ) {
          console.log(e)
        }
    }
  );
  export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async (id) => {
      try {
      const comments = `r/OldSchoolCool/comments/${id}`
      const response = await useFetchData(comments);
      const commentsList = response[1].data.children.map(post => post.data)
      console.log(commentsList)
      // The value we return becomes the `fulfilled` action payload
      return response.data;
      } catch( e ) { console.log(e)}
    }
  );  
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      someReducer: () => {}
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
          state.postsList = Error('Could not fetch posts');
        })


        .addCase(fetchComments.pending, (state) => {
          state.commentStatus = 'loading';
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          state.commentStatus = 'fulfilled';
          state.commentsList = action.payload;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.commentStatus = 'rejected';
          //state.commentsList = Error('Could not fetch posts');
        })
    },
  });

export const { someReducer } = postSlice.actions;
export const selectPostsListStatus = (state) => state.posts.status;
export const selectPostsLists = ({ posts }) => posts.postsList
export default postSlice.reducer;


