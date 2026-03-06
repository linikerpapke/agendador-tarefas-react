import { createBrowserRouter } from "react-router";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);