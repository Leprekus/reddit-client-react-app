import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginLandingPageReducer from '../features/login/loginLandingPageSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginLandingPage: loginLandingPageReducer,
  },
});
