import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { MainLayout } from "@/layouts/MainLayout";
import { Login } from "@/pages/Login/Login";
import { Tasks } from "@/pages/Tasks/Tasks";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { UserData } from "@/pages/UserData/UserData";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                element: <PublicRoutes />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "/register",
                        element: <Register />,
                    },
                    {
                        path: "/login",
                        element: <Login />,
                    },
                ]
            },
            {
                element: <ProtectedRoutes />,
                children: [
                    {
                        path: "/tasks",
                        element: <Tasks />
                    },
                    {
                        path: "/user-data",
                        element: <UserData />
                    },
                ]
            },
        ]
    }
]);