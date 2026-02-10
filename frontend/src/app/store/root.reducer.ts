import { combineReducers } from "@reduxjs/toolkit";
import { userStateReducer } from "./user/user.slice";
import { communityStateReducer } from "./community/community.slice";
import { authStateReducer } from "./auth/auth.slice";

const combinedReducer = combineReducers({
  user: userStateReducer,
  community: communityStateReducer,
  auth: authStateReducer
})

export const rootReducer = combinedReducer;
export type RootReducer = ReturnType<typeof rootReducer>;