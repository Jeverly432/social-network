import { createSlice } from "@reduxjs/toolkit"
import type { ILoginInitialState } from "./login.types"

export const loginSliceName = 'login'

const initialState: ILoginInitialState = {
  isOpen: false,
  isLoading: false,
  error: null,
}

const loginSlice = createSlice({
  name: loginSliceName,
  initialState,
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  actions: { setIsOpen, setIsLoading, setError },
  reducer: loginStateReducer
} = loginSlice;
