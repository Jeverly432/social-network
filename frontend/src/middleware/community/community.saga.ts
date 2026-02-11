import { communitySliceName, setCommunitiesList, setCreatedCommunity, setCurrentCommunity, setIsLoading } from "@app/store/community/community.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import type { IAvatarResponse, IPostCreateCommunity, IPostUpdateCommunity, IPostUploadAvatar, IResponseCommunities } from "./community.types";
import type { ICommunityState } from "@app/store/community/community.types";

export function* getCommunitiesSaga() {
  try {
    yield put(setIsLoading({ type: "list", value: true }))
    const response: AxiosResponse<IResponseCommunities> = yield call(() =>
      http.get('/community/my')
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
      yield put(setIsLoading({ type: 'current', value: true }))
      const formData = new FormData();
      formData.append('file', file)
      const response: AxiosResponse<IAvatarResponse> = yield call(() =>
        http.post(`upload/community/${id}/cover`, formData)
      )

      if (response.data) {
        yield put(setIsLoading({ type: 'current', value: false }))
      }
    }
  } catch (e) {
    console.log(e)
    yield put(setIsLoading({ type: 'current', value: false }))
  }
}

export function* postCreateCommunity(action: { payload: IPostCreateCommunity }) {
  try {
    const { categories, description, name, privacy } = action.payload
    if (categories && description && name && privacy) {
      yield put(setIsLoading({ type: "current", value: true }))
      const response: AxiosResponse<ICommunityState> = yield call(() =>
        http.post(`community/create`, {
          name: name,
          tags: categories,
          description: description,
          isPublic: privacy === 1 ? true : false
        })
      )
      if (response.data) {
        yield put(setCreatedCommunity(response.data))
      }
    }

  } catch (e) {
    console.log(e)
    yield put(setIsLoading({ type: "current", value: false }))
  }
}

export function* putUpdateCommunity(action: { payload: { slug: string; data: IPostUpdateCommunity } }) {
  try {
    const { slug, data } = action.payload
    if (slug && data) {
      yield put(setIsLoading({ type: "current", value: true }))

      const updateData = {
        name: data.name,
        description: data.description,
        tags: data.categories,
        isPublic: data.privacy === 1 ? true : false
      }

      const response: AxiosResponse<ICommunityState> = yield call(() =>
        http.put(`community/${slug}`, updateData)
      )

      if (response.data) {
        yield put(setCurrentCommunity(response.data))
        yield put(setIsLoading({ type: "current", value: false }))
      }
    }

  } catch (e) {
    console.log(e)
    yield put(setIsLoading({ type: "current", value: false }))
  }
}

export function* postLeaveCommunity(action: { payload: { id: string } }) {
  try {
    const { id } = action.payload
    if (id) {
      const response: AxiosResponse = yield call(() =>
        http.post(`/${id}/leave`))
    }
  } catch (e) {
    console.log(e)
  }
}

export const postCommunityAvatarAction = createAction<IPostUploadAvatar>(`${communitySliceName}/avatar`)
export const getCurrentCommunityAction = createAction<{ pathname: string }>(`${communitySliceName}/selected`)
export const getCommunitiesAction = createAction(`${communitySliceName}/all`)
export const postCreateCommunityAction = createAction<IPostCreateCommunity>(`${communitySliceName}/create`)
export const putUpdateCommunityAction = createAction<{ slug: string; data: IPostUpdateCommunity }>(`${communitySliceName}/update`)

export function* communitySaga() {
  yield takeEvery(getCommunitiesAction, getCommunitiesSaga)
  yield takeEvery(getCurrentCommunityAction, getCurrentCommunity)
  yield takeEvery(postCommunityAvatarAction, postUploadAvatar)
  yield takeEvery(postCreateCommunityAction, postCreateCommunity)
  yield takeEvery(putUpdateCommunityAction, putUpdateCommunity)
}