// slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    pancard:'',
    bankdetails:''
  },
  reducers: {
    setUser(state, action) {
      
    },
    logout(state) {
      state.name = '';
      state.email = '';
      state.loggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
