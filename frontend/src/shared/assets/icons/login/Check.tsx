import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const Check: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      {...props}
    >
      <path d="M16.6668 5L7.50016 14.1667L3.3335 10" stroke="#AAAAAA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
})
