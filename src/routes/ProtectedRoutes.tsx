import { authService } from "@/services/authService";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoutes() {

    const isLogged = authService.isLoggedIn();

    if (!isLogged) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}