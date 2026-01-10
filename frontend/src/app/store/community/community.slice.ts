import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ICommunityInitialState, ICommunityState } from './community.types';

export const communitySliceName = "community"

const initialState: ICommunityInitialState = {
  communities: {
    list: [],
    current: null
  },
  isLoading: {
    list: false,
    current: false
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
    setCurrentCommunity: (state, action: PayloadAction<ICommunityState>) => {
      state.communities.current = action.payload
    },
    setIsLoading: (state, action: PayloadAction<{ type: 'list' | 'current', value: boolean }>) => {
      state.isLoading[action.payload.type] = action.payload.value
    }
  }
})


export const {
  actions: { setCommunitiesList, setCurrentCommunity, setIsLoading },
  reducer: communityStateReducer
} = communitySlice