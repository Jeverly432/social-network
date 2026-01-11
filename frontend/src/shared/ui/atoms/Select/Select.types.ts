import type { SelectProps } from "antd"

type SelectSize = 'small' | 'middle' | 'large'

export interface ISelectProps extends Omit<SelectProps, 'size'> {
  size: SelectSize
}
