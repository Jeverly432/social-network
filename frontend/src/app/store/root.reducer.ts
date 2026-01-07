import { combineReducers } from "@reduxjs/toolkit";
import { userStateReducer } from "./user/user.slice";

const combinedReducer = combineReducers({
  user: userStateReducer
})

export const rootReducer = combinedReducer;
export type RootReducer = ReturnType<typeof rootReducer>;