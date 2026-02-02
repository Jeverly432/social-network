import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const Pen: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      {...props}
    >
      <path d="M10.2656 3.44531L14.7656 7.94531L4.99219 17.7188L0.984375 18.1406C0.457031 18.2109 0 17.7539 0.0703125 17.2266L0.492188 13.2188L10.2656 3.44531ZM17.543 2.77734C18.2109 3.41016 18.2109 4.5 17.543 5.16797L15.5742 7.13672L11.0742 2.63672L13.043 0.667969C13.7109 0 14.8008 0 15.4336 0.667969L17.543 2.77734Z" fill="currentColor" />
    </svg>
  )
})


