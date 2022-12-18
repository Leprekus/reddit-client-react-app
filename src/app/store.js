import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/post/postSlice';
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    posts: postReducer
   
  },
});
