import { useAuth } from "@/context/auth/useAuth";
import { Navigate, Outlet } from "react-router";

export function PublicRoutes() {

    const { isLogged } = useAuth()

    if (isLogged) {
        return <Navigate to="/tasks" />
    }

    return <Outlet />
}