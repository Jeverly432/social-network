export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface INotificationInitialState {
  type: NotificationType | null
  description: string | null
  title: string | null
}

export interface INotification {
  type: NotificationType
  description: string
  title: string
}
