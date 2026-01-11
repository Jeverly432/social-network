import { Dropdown as DropdownAnt, type DropdownProps } from "antd"
import styles from "./Dropdown.module.scss"
import cn from "classnames"

type DropdownVariant = "primary"
type DropdownSize = 's' | 'm' | 'l'| 'xl'

interface IDropdownProps extends DropdownProps {
  variant: DropdownVariant
  size: DropdownSize
}

export const Dropdown = ({ className, variant, size, ...props }: IDropdownProps) => {
  return (
    <DropdownAnt className={cn(styles.dropdown, styles[variant], styles[size])} {...props} />
  )
}