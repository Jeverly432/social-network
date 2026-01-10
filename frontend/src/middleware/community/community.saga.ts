import { communitySliceName, setCommunitiesList, setCurrentCommunity, setIsLoading } from "@app/store/community/community.slice";
import { createAction } from "@reduxjs/toolkit";
import { http } from "@shared/lib";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import type { IResponseCommunities } from "./community.types";

export function* getCommunitiesSaga() {
  try {
    yield put(setIsLoading({ type: "list", value: true }))
    const response: AxiosResponse<IResponseCommunities> = yield call(() =>
      http.get('/community/all')
    )

    yield put(setCommunitiesList(response.data.communities))

  } catch (e) {
    console.log(e)
  } finally {
    yield put(setIsLoading({ type: "list", value: false }))
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
      }
    }
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setIsLoading({ type: "current", value: false }))
  }
}

export const getCurrentCommunityAction = createAction<{ pathname: string }>(`${communitySliceName}/selected`)
export const getCommunitiesAction = createAction(`${communitySliceName}/all`)

export function* communitySaga() {
  yield takeEvery(getCommunitiesAction, getCommunitiesSaga)
  yield takeEvery(getCurrentCommunityAction, getCurrentCommunity)
}