import { communitySliceName, setCommunitiesList, setCurrentCommunity, setIsLoading, setUploadAvatar } from "@app/store/community/community.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import type { IAvatarResponse, IPostUploadAvatar, IResponseCommunities } from "./community.types";

export function* getCommunitiesSaga() {
  try {
    yield put(setIsLoading({ type: "list", value: true }))
    const response: AxiosResponse<IResponseCommunities> = yield call(() =>
      http.get('/community/all')
    )

    if (response.data) {
      yield put(setCommunitiesList(response.data.communities))
      yield put(setIsLoading({ type: "list", value: false }))
    }

  } catch (e) {
    console.log(e)
  }
}


export function* getCurrentCommunity(action: { payload: { pathname: string } }) {
  try {
    if (action.payload.pathname) {
      yield put(setIsLoading({ type: 'current', value: true }))

      const response: AxiosResponse = yield call(() =>
        http.get(`/community/${action.payload.pathname}`))

      if (response.data) {
        yield put(setCurrentCommunity(response.data))
        yield put(setIsLoading({ type: "current", value: false }))
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export function* postUploadAvatar(action: { payload: IPostUploadAvatar }) {
  try {
    const { file, id } = action.payload
    if (id && file) {
      yield put(setIsLoading({ type: 'avatar', value: true }))
      const response: AxiosResponse<IAvatarResponse> = yield call(() =>
        http.post(`/community/${id}/avatar`, {
          file: file
        })
      )

      if (response.data) {
        yield put(setIsLoading({ type: 'avatar', value: false }))
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export const postCommunityAvatarAction = createAction<IPostUploadAvatar>(`${communitySliceName}/avatar`)
export const getCurrentCommunityAction = createAction<{ pathname: string }>(`${communitySliceName}/selected`)
export const getCommunitiesAction = createAction(`${communitySliceName}/all`)

export function* communitySaga() {
  yield takeEvery(getCommunitiesAction, getCommunitiesSaga)
  yield takeEvery(getCurrentCommunityAction, getCurrentCommunity)
  yield takeEvery(postCommunityAvatarAction, postUploadAvatar)
}