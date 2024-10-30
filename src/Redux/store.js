// store.js
import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: user, // add more reducers as needed
  },
});

export default store;
