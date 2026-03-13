import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";
import { MainLayout } from "@/layouts/MainLayout";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    }
]);