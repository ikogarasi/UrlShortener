import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from 'src/constants/cookies';

export interface UserData {
  userId: number;
  email: string;
  userName: string;
  role: string;
}

interface UserState {
  userData: UserData;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userData: {
    userId: 0,
    email: '',
    userName: '',
    role: '',
  },
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    cleanUser(state) {
      state = initialState;
      document.cookie = ACCESS_TOKEN + '=';
    },
  },
});

export const { setUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
