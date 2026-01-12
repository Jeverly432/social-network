import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICommunityInitialState, ICommunityState } from './community.types';

export const communitySliceName = "community"

const initialState: ICommunityInitialState = {
  communities: {
    list: [],
    current: null,
    avatar: null,
    created: null,
  },
  isLoading: {
    list: false,
    current: false,
    avatar: false
  },
  error: null,
}

const communitySlice = createSlice({
  name: communitySliceName,
  initialState,
  reducers: {
    setCommunitiesList: (state, action: PayloadAction<ICommunityState[]>) => {
      state.communities.list = action.payload
    },
    setCurrentCommunity: (state, action: PayloadAction<ICommunityState | null>) => {
      state.communities.current = action.payload
    },
    setIsLoading: (state, action: PayloadAction<{ type: 'list' | 'current' | 'avatar', value: boolean }>) => {
      state.isLoading[action.payload.type] = action.payload.value
    },
    setUploadAvatar: (state, action: PayloadAction<string | null>) => {
      state.communities.avatar = action.payload
    },
    setCreatedCommunity: (state, action: PayloadAction<ICommunityState | null>) => {
      state.communities.created = action.payload
    }
  }
})


export const {
  actions: { setCommunitiesList, setCurrentCommunity, setIsLoading, setUploadAvatar, setCreatedCommunity },
  reducer: communityStateReducer
} = communitySlice