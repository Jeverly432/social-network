import type { ButtonProps as AntButtonProps } from "antd";

type VariantType = "primary" | "secondary" | "inverse" | "tertiary";
type SizeType = "l" | "m" | "s" | "xs"

export interface IActionButtonProps extends Omit<AntButtonProps, "type" | "variant" | "size"> {
  variant?: VariantType
  size?: SizeType
}