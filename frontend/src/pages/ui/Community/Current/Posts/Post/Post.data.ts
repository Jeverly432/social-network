export const getLike = (id: number | null, likes: string[] | null) => {
  if (id && likes?.length) {
    return likes.find((postId) => postId === String(id)) ? true : false
  }
}
