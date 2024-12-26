import { NavLink } from "react-router"

interface Props{
    to: string,
    title: string,
    description: string,
    icon: string
}


export const SideItem = ({to, title, description, icon}: Props) => {
    return(
        <NavLink
        className="navlink"
        key={to} to={to}>
            <i className={`${icon} icon`}></i>
            <div className="info">
                <span>{title}</span>
                <span className="description">
                    {description}
                </span>
            </div>
        </NavLink>
    )
}