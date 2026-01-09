import type { InputProps } from "antd";
import type { ReactNode } from "react";

type VariantType = "square" | "rounded"
type SizeType = "s" | "m"

export interface IInputProps extends Omit<InputProps, "size" | "variant"> {
  variant?: VariantType
  size?: SizeType
  iconLeft?: ReactNode
  iconRight?: ReactNode
}