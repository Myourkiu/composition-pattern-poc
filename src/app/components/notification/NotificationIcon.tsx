import { ElementType } from "react"

interface NotificationIconProps{
    icon: ElementType
}

export function NotificationIcon({icon: Icon} : NotificationIconProps){
    return(
        <Icon className="w-6 h-6 text-emerald-500 mt-3"/>
    )
}