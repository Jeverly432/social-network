import { showNotification } from "@app/store/notification/notification.slice";
import { postSliceName, setIsLoading, setModalOpen } from "@app/store/post/post.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios"
import { call, put, select, takeEvery } from "redux-saga/effects";
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
      yield put(setModalOpen(false))
      yield put(showNotification({ type: "success", title: "Post created successfully" }))
      if (communityId) {
        yield put(getPostsAction())
      } else {
        const user: { userName?: string } | null = yield select((state: { user: { user: { userName?: string } | null } }) => state.user.user)
        if (user?.userName) {
          yield put(getUserPostsAction(user.userName))
        }
      }
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

export function* getUserPosts(action: { payload: string }) {
  try {
    const userName = action.payload
    yield put(setIsLoading({ value: true }))
    const response: AxiosResponse<IResponsePosts> = yield call(() =>
      http.get(`/posts/user/${userName}`)
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

export function* deletePost(action: { payload: { id: string; userName?: string } }) {
  try {
    const { id, userName } = action.payload
    yield put(setIsLoading({ value: true }))
    const response: AxiosResponse = yield call(() =>
      http.delete(`/posts/delete/${id}`)
    )
    if (response.data) {
      yield put(showNotification({ type: "success", title: "Post deleted" }))
      if (userName) {
        yield put(getUserPostsAction(userName))
      } else {
        yield put(getPostsAction())
      }
      yield put(setIsLoading({ value: false }))
    }
  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export function* putPost(action: { payload: { id: string } }) {
  try {
    const { id } = action.payload
    const response: AxiosResponse = yield call(() =>
      http.put(`/posts/update/${id}`)
    )

    if (response.data) {
      yield put(showNotification({ type: "success", title: "Post updated" }))
    }

  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export function* getPost(action: { payload: { id: string } }) {
  try {
    const { id } = action.payload
    yield call(() => http.get(`/posts/get/${id}`))
  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}

export function* likePost(action: { payload: string }) {
  try {
    const { payload } = action

    const response: AxiosResponse = yield call(() =>
      http.put(`posts/like/${payload}`)
    )
    if (response.data) {
      
    }

  } catch (e: any) {
    console.log(e)
    const errorMessage = e.response?.data?.message || "Something went wrong"
    yield put(showNotification({ type: "error", title: errorMessage }))
    yield put(setIsLoading({ value: false }))
  }
}


export const getPostsAction = createAction(`${postSliceName}/all`)
export const getUserPostsAction = createAction<string>(`${postSliceName}/user`)
export const postPostAction = createAction<IPostPost>(`${postSliceName}/create`)
export const deletePostAction = createAction<{ id: string; userName?: string }>(`${postSliceName}/delete`)
export const putPostAction = createAction<{ id: string }>(`${postSliceName}/update`)
export const getPostAction = createAction<{ id: string }>(`${postSliceName}/get`)
export const putLikePostAction = createAction<string>(`${postSliceName}/put`)

export function* postSaga() {
  yield takeEvery(postPostAction, postPost)
  yield takeEvery(getPostsAction, getPosts)
  yield takeEvery(getUserPostsAction, getUserPosts)
  yield takeEvery(deletePostAction, deletePost)
  yield takeEvery(putPostAction, putPost)
  yield takeEvery(getPostAction, getPost)
  yield takeEvery(putLikePostAction, likePost)
}
