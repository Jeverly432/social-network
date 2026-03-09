import type { CompatibilityProps } from "antd/es/tabs"
import type { Tab } from '@rc-component/tabs/lib/interface';

export interface IHeadProps {
  items: (Tab & CompatibilityProps)[]
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  activeTab: string
}