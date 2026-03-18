import { useAuth } from "@/context/auth/useAuth";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoutes() {

    const { isLogged } = useAuth()

    if (!isLogged) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}