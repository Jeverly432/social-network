export interface IUserState {
  postsCount: number,
  followersCount: number,
  followingCount: number,
  _id: number,
  email: string,
  userName: string,
  isPrivate: boolean,
  role: [string],
  createdAt: Date,
  updatedAt: Date,
}

export interface IUserInitialState {
  user: IUserState | null,
  token: string | null,
  isLoading: boolean,
  error: string | null,
}