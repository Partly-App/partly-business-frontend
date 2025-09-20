import { IconProps } from "./types"

const Dashboard = ({ size = 32, ...props }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="9" height="11" rx="2"></rect>
      <rect x="13" y="2" width="9" height="7" rx="2"></rect>
      <rect x="2" y="15" width="9" height="7" rx="2"></rect>
      <rect x="13" y="11" width="9" height="11" rx="2"></rect>
    </svg>
  )
}
export default Dashboard
