import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const Chart: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M3.75 20.25V3.75" stroke="#292B32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.75 5.25H15.75V9.75" stroke="#292B32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.25 9.75H3.75V14.25H20.25V9.75Z" stroke="#292B32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.75 14.25V18.75H3.75" stroke="#292B32" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
})


