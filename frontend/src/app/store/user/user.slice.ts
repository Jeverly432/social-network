import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IUserInitialState, type IUserState } from './user.types';

export const userSliceName = 'user';

const initialState: IUserInitialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: userSliceName,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  }
})


export const {
  actions: { setUser, setToken, clearUser },
  reducer: userStateReducer,
} = userSlice;
