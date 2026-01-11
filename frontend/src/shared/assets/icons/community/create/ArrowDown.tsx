import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const ArrowDown: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="9"
      viewBox="0 0 16 9"
      {...props}
    >
      <path d="M15.4688 0.878906C15.6445 1.01953 15.6445 1.30078 15.4688 1.47656L8.12109 8.82422C7.94531 9 7.69922 9 7.52344 8.82422L0.175781 1.47656C0 1.30078 0 1.01953 0.175781 0.878906L0.84375 0.175781C1.01953 0 1.30078 0 1.44141 0.175781L7.83984 6.53906L14.2031 0.175781C14.3438 0 14.625 0 14.8008 0.175781L15.4688 0.878906Z" fill="currentColor" />
    </svg>
  )
})


