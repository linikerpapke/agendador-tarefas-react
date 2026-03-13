import { Link } from "react-router";
import Logo from "@/assets/logo-agendador-javanauta.png"
import { Button } from "../ui/button";

export function Header() {

    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between h-16 px-6">

                <Link to="/" className="flex items-center">
                    <img src={Logo} className="h-16 w-auto" />
                </Link>

                <nav>
                    <Link to="">
                        <Button variant="ghost">Preços</Button>
                    </Link>
                    <Link to="">
                        <Button variant="ghost">Contato</Button>
                    </Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link to="/register">
                        <Button>Cadastro</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                </div>

            </div>
        </header>
    )
}