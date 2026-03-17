import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner"

export function MainLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </>
    )
}