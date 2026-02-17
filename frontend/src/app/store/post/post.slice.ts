import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPostInitialState } from "./post.types";

export const postSliceName = 'post'

const initialState: IPostInitialState = {
  isLoading: false,
  title: null,
  description: null,
  images: [],
  author: null,
  commentsCount: null,
  community: null,
  likes: [],
  likesCount: null,
  type: null
}

const postSlice = createSlice({
  name: postSliceName,
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ value: boolean }>) => {
      state.isLoading = action.payload.value
    },
    setCommunity: (state, action: PayloadAction<IPostInitialState>) => {
      state.description = action.payload.description
      state.title = action.payload.title
      state.images = action.payload.images
    }
  }
})

export const {
  actions: { setCommunity, setIsLoading },
  reducer: postStateReducer
} = postSlice
