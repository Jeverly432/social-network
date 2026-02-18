import { showNotification } from "@app/store/notification/notification.slice";
import { postSliceName, setIsLoading } from "@app/store/post/post.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios"
import { call, put, takeEvery } from "redux-saga/effects";
import type { IPostPost, IResponsePosts } from "./post.types";
import { setPosts } from "@app/store/community/community.slice";

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

export function* getPosts() {
  try {
    yield put(setIsLoading({ value: true }))
    const response: AxiosResponse<IResponsePosts> = yield call(() =>
      http.get('/posts/all')
    )

    if (response.data) {
      yield put(setPosts(response.data.posts))
      yield put(setIsLoading({ value: false }))
    }
  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export const getPostsAction = createAction(`${postSliceName}/all`)
export const postPostAction = createAction<IPostPost>(`${postSliceName}/create`)

export function* postSaga() {
  yield takeEvery(postPostAction, postPost)
  yield takeEvery(getPostsAction, getPosts)
}