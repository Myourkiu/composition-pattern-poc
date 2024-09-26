import { ButtonHTMLAttributes, ElementType } from "react"
import { twMerge } from "tailwind-merge";

interface NotificationActionProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    action: () => void,
    icon: ElementType
}

export function NotificationAction({ icon: Icon, action, ...rest }: NotificationActionProps) {
    return (
      <button {...rest} onClick={action} className={twMerge("w-8 h-8 rounded flex items-center justify-center bg-neutral-700", rest.className)}>
        <Icon className="w-4 h-4 text-white" />
      </button>
    );
  }
  