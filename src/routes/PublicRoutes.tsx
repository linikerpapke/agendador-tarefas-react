import { authService } from "@/services/authService";
import { Navigate, Outlet } from "react-router";

export function PublicRoutes() {

    const isLogged = authService.isLoggedIn();

    if (isLogged) {
        return <Navigate to="/tasks" />
    }

    return <Outlet />
}