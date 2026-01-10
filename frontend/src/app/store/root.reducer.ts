import { combineReducers } from "@reduxjs/toolkit";
import { userStateReducer } from "./user/user.slice";
import { communityStateReducer } from "./community/community.slice";

const combinedReducer = combineReducers({
  user: userStateReducer,
  community: communityStateReducer
})

export const rootReducer = combinedReducer;
export type RootReducer = ReturnType<typeof rootReducer>;