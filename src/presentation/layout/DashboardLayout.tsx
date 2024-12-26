import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"

export const DashboardLayout = () => {
    return (
        <main className="layout">
            <nav className="nav">
                <h2 className="title">ReactGPT</h2>
                <span className="text-welcome">Bienvenido</span>
                <Sidebar />
            </nav>

            <div className="pages">
                <Outlet />
            </div>
        </main>
    )
}