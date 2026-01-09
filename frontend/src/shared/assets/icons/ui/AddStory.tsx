import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const AddStory: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      {...props}
    >
      <rect x="1" y="1" width="14" height="14" rx="7" fill="#1054DE" />
      <rect x="1" y="1" width="14" height="14" rx="7" stroke="white" stroke-width="2" />
      <path d="M8.5 5.25V7.5H10.75C11.0156 7.5 11.25 7.73438 11.25 8C11.25 8.28125 11.0156 8.5 10.75 8.5H8.5V10.75C8.5 11.0312 8.26562 11.25 8 11.25C7.71875 11.25 7.5 11.0312 7.5 10.75V8.5H5.25C4.96875 8.5 4.75 8.28125 4.75 8C4.75 7.73438 4.96875 7.5 5.25 7.5H7.5V5.25C7.5 4.98438 7.71875 4.75 8 4.75C8.26562 4.75 8.5 4.98438 8.5 5.25Z" fill="white" />
    </svg>
  )
})
