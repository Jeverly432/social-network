import { combineReducers } from "@reduxjs/toolkit";
import { userStateReducer } from "./user/user.slice";
import { communityStateReducer } from "./community/community.slice";
import { authStateReducer } from "./auth/auth.slice";
import { notificationStateReducer } from "./notification/notification.slice";
import { postStateReducer } from "./post/post.slice";

const combinedReducer = combineReducers({
  user: userStateReducer,
  community: communityStateReducer,
  auth: authStateReducer,
  notification: notificationStateReducer,
  post: postStateReducer
})

export const rootReducer = combinedReducer;
export type RootReducer = ReturnType<typeof rootReducer>;