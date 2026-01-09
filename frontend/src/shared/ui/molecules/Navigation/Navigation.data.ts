export const isActive = (link: string, activeRoute: string) => {
  return activeRoute === link ? true : false
}