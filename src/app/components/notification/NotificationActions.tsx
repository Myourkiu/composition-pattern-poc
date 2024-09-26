import { ReactNode } from "react"
interface NotificationActionProps{
    children: ReactNode
}

export function NotificationActions({children} : NotificationActionProps){
    return(
        <div className="flex gap-2 self-center">
            {children}
        </div>
    )
}