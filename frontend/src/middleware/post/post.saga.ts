import { http } from "@shared/lib";
import type { AxiosResponse } from "axios"
import { call } from "redux-saga/effects";

export function* postPost() {
  try {
    const response: AxiosResponse = yield call(() =>
      http.post(`/create`)
    )
  } catch (e) {
    console.log(e)
  }
}