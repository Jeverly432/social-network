import { Button as AntButton } from "antd"
import type { IActionButtonProps } from "./ActionButton.types"
import cn from 'classnames';
import styles from './ActionButton.module.scss';

export const ActionButton = ({
  children, variant = "primary", className, size = "l", ...props
}: IActionButtonProps) => {
  return (
    <AntButton
      {...props}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        className
      )}
    >
      {children}
    </AntButton>
  )
}