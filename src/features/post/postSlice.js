import { UpdateDisabled } from "@mui/icons-material";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchCommentSection from "../../API/fetchCommentSection";
import makeFetchRequest from "../../hooks/makeFetchRequest";
import { redditPosts } from "../../mocks/responseData";
import { selectCurrentToken } from "../auth/authSlice";
const initialState = {
  postsList: {},
  status: 'idle',
  commentStatus: 'idle',
  voteStatus: 'idle',
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchNewPosts',
    async (params, thunkAPi) => {
      const currentToken = selectCurrentToken(thunkAPi.getState())
        try {
          const options = {
            method: 'GET',
            headers: {
                Authorization: `bearer ${currentToken.access_token}` ,
            },
        }
          const url = new URL(`https://oauth.reddit.com/${params}`)
          console.log(url)
          const response = await fetch(url, options)
          const responseJSON = await response.json()
          const updatedPostsList = {}
          responseJSON.data.children.forEach(post => (
            updatedPostsList[post.data.id] = {        
            id: post.data.id, 
            postData: post.data,
            comments: [],
            displayComments: false
              }
            )
          )
          //console.log(postsList)
          return updatedPostsList;
          // const dummyPostsList = redditPosts
          // return dummyPostsList
        } catch ( e ) {
          console.log(e)
          return {}
        }
    }
  );

  export const fetchComments = createAsyncThunk(
    'posts/fetchComments',
    async (args, thunkAPi) => {
      const [token, subreddit, id] = args
      try {
        const commentsEndpoint = `r/${subreddit}/comments/${id}`
        const response = await makeFetchRequest(token, commentsEndpoint);
        const updatedComments = response[1].data.children.map(comment => comment.data)
        // The value we return becomes the `fulfilled` action payload
        thunkAPi.dispatch(toggleDisplayComments(id))
      return { id, updatedComments };
      } catch( e ) { console.error(e)}
    }
  );  

export const postVote = createAsyncThunk(
  'posts/handleVote',
  async(args, thunkApi) => {
    const [id, value] = args;
    const token = selectCurrentToken(thunkApi.getState()).access_token;
    var headers = {
      "authorization": "Bearer " + token.toString(),
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };
  
  var payload = new URLSearchParams({
      id: id,
      dir: value,
  });
  var options = {
      "method": "POST",
      "headers": headers,
      "payload": payload.toString(),
      "muteHttpExceptions": true
  };
  
  var url = "https://oauth.reddit.com/api/vote?" + payload;
  var response = await fetch(url, options);
  var data = await response.json()
  console.log('data')
  console.log(payload.toString())
   console.log(data)

  // var request = new XMLHttpRequest();
  // request.open('POST', 'https://oauth.reddit.com/api/vote', true);
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  // request.setRequestHeader('Authorization', 'Basic ' + token);
  // //request.setRequestHeader('access-Control-Allow-Origin', 'null');
  // request.setRequestHeader('Accept', '*/*');
  // request.setRequestHeader('Origin', 'http://localhost:3000/');
  // request.send(JSON.stringify(payload));
  // request.onreadystatechange = function () {
  //     if (request.readyState === 4) {
  //         const response = JSON.parse(request.responseText)
  //         console.log('response')
  //         console.log(response)
  //         }
  //     };

  }
)
export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
      toggleDisplayComments: (state, action) => {
        const id = action.payload
        state.postsList[id].displayComments = !state.postsList[id].displayComments
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'fulfilled';
          state.postsList = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'rejected';
          state.postsList = Error('Could not fetch posts');
        })
        .addCase(fetchComments.pending, (state, action) => {
          state.commentStatus = 'loading';
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
          const { id, updatedComments } = action.payload
          state.commentStatus = 'fulfilled';
          state.postsList[id].comments = updatedComments;
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.commentStatus = 'rejected';
          state.commentsList = Error('Could not fetch posts');
        })        
        .addCase(postVote.pending, (state, action) => {
          state.voteStatus = 'loading';
        })
        .addCase(postVote.fulfilled, (state, action) => {
          state.voteStatus = 'fulfilled';
        })
        .addCase(postVote.rejected, (state, action) => {
          state.voteStatus = 'rejected';
        })        
    },
  });

export const { toggleDisplayComments } = postSlice.actions;
export const selectPostsListStatus = (state) => state.posts.status;
export const selectPostsLists = ({ posts }) => posts.postsList;
export const selectCommentsListsStatus = (state) => state.posts.commentStatus;
export default postSlice.reducer;


