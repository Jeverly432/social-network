import type { IIconProps } from "@shared/types"
import { memo } from "react"

export const ActionSlider: React.FC<IIconProps> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <g filter="url(#filter0_dd_16924_2018)">
        <rect x="4" y="2" width="32" height="32" rx="16" fill="white" />
        <rect x="4.5" y="2.5" width="31" height="31" rx="15.5" stroke="#EBECEF" />
        <path d="M16.3438 10.6211C16.5195 10.4453 16.7656 10.4453 16.9414 10.6211L24.3242 17.9688C24.4648 18.1445 24.4648 18.3906 24.3242 18.5664L16.9414 25.9141C16.7656 26.0898 16.5195 26.0898 16.3438 25.9141L15.6406 25.2461C15.5 25.0703 15.5 24.7891 15.6406 24.6484L22.0039 18.25L15.6406 11.8867C15.5 11.7461 15.5 11.4648 15.6406 11.2891L16.3438 10.6211Z" fill="#292B32" />
      </g>
      <defs>
        <filter id="filter0_dd_16924_2018" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.376471 0 0 0 0 0.380392 0 0 0 0 0.439216 0 0 0 0.16 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16924_2018" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.160784 0 0 0 0 0.239216 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_16924_2018" result="effect2_dropShadow_16924_2018" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_16924_2018" result="shape" />
        </filter>
      </defs>
    </svg>
  )
})


