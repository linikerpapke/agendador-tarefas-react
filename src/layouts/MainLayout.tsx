import { Header } from "@/components/shared/Header";
import { Outlet } from "react-router";

export function MainLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}