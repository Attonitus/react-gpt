import { menuRoutes } from "../router/router"
import { SideItem } from "./SideItem"

export const Sidebar = () => {
    return (
        <div className="navlinks">
            {
                menuRoutes.map( option => (
                    <SideItem key={option.to} {...option}/>
                ))
            }
        </div>
    )
}