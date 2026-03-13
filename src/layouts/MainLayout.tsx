import { Header } from "@/components/shared/Header";
import { Footer } from "@/pages/Home/Footer";
import { Outlet } from "react-router";

export function MainLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}