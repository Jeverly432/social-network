import { combineReducers } from "@reduxjs/toolkit";
import { userStateReducer } from "./user/user.slice";
import { communityStateReducer } from "./community/community.slice";
import { loginStateReducer } from "./login/login.slice";

const combinedReducer = combineReducers({
  user: userStateReducer,
  community: communityStateReducer,
  login: loginStateReducer
})

export const rootReducer = combinedReducer;
export type RootReducer = ReturnType<typeof rootReducer>;