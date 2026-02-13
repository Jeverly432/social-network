import { createSlice } from "@reduxjs/toolkit"
import type { IAuthInitialState } from "./auth.types"

export const authSliceName = 'auth'

const initialState: IAuthInitialState = {
  isOpen: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: authSliceName,
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  }
})

export const {
  actions: { setIsOpen, setIsLoading },
  reducer: authStateReducer
} = authSlice;
