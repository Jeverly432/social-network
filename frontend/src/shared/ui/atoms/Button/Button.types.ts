import type { ButtonProps as AntButtonProps } from "antd";

type VariantType = "primary" | "secondary" | "inverse";
type SizeType = "l" | "s"

export interface IButtonProps extends Omit<AntButtonProps, "type" | "variant" | "size"> {
  variant?: VariantType
  size?: SizeType
  isIcon?: boolean;
}