import { clearNotification } from "@app/store/notification/notification.slice";
import type { RootState } from "@app/store/root.types";
import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Notification = () => {
  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();
  const notificationState = useSelector((state: RootState) => state.notification)

  useEffect(() => {
    if (notificationState.type !== null) {
      api[notificationState.type]({
        title: notificationState.title,
        description: notificationState.description
      });
      dispatch(clearNotification())
    }
  }, [notificationState.type, api, dispatch])

  return contextHolder
}
