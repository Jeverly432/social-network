import { showNotification } from "@app/store/notification/notification.slice";
import { postSliceName, setIsLoading } from "@app/store/post/post.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios"
import { call, put, takeEvery } from "redux-saga/effects";

interface IPostPost {
  communityId: string | null,
  description: string,
  title: string,
  images: File[]
}

export function* postUploadImages(action: { payload: { files: File[] } }) {
  try {
    const { files } = action.payload
    if (files.length) {
      yield put(setIsLoading({ value: true }))
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file)
      })
      const response: AxiosResponse = yield call(() =>
        http.post('/upload/posts', formData)
      )
      if (response.data) {
        yield put(setIsLoading({ value: false }))
        yield put(showNotification({ type: "success", title: response.data.message }))
      }
    }
  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export function* postPost(action: { payload: IPostPost }) {
  try {
    yield put(setIsLoading({ value: true }))
    const { communityId, description, title, images } = action.payload
    
    // Загружаем изображения, если они есть
    let imageUrls: string[] = []
    if (images && images.length > 0) {
      const formData = new FormData();
      images.forEach((file) => {
        formData.append('files', file)
      })
      const uploadResponse: AxiosResponse<{ imageUrls: string[] }> = yield call(() =>
        http.post('/upload/posts', formData)
      )
      imageUrls = uploadResponse.data.imageUrls || []
    }
    
    // Создаем пост с загруженными изображениями
    const response: AxiosResponse = yield call(() =>
      http.post(`/posts/create`, {
        title: title,
        communityId: communityId,
        description: description,
        images: imageUrls
      })
    )
    if (response.data) {
      yield put(setIsLoading({ value: false }))
      yield put(showNotification({ type: "success", title: "Post created successfully" }))
    }
  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export const postPostAction = createAction<IPostPost>(`${postSliceName}/create`)

export function* postSaga() {
  yield takeEvery(postPostAction, postPost)
}