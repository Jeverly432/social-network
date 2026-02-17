import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { INotification, INotificationInitialState } from "./notification.types";

export const notificationsSliceName = 'notification'

const initialState: INotificationInitialState = {
  description: null,
  type: null,
  title: null
}

const notificationSlice = createSlice({
  name: notificationsSliceName,
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<INotification>) => {
      state.description = action.payload.description ?? null
      state.title = action.payload.title
      state.type = action.payload.type
    },
    clearNotification: (state) => {
      state.description = null
      state.title = null
      state.type = null
    }
  }
})

export const {
  actions: { showNotification, clearNotification },
  reducer: notificationStateReducer
} = notificationSlice
