import { Link } from "react-router";
import Logo from "@/assets/logo-agendador-javanauta.png"
import { PublicHeader } from "./PublicHeader";
import { HeaderDropDownMenu } from "./HeaderDropDownMenu";
import { useAuth } from "@/context/auth/useAuth";

export function Header() {

    const { isLogged } = useAuth();

    return (
        <header className="border-b">
            <div className="container mx-auto flex items-center justify-between h-16 px-6">

                <Link to="/" className="flex items-center">
                    <img src={Logo} className="h-16 w-auto" />
                </Link>

                {!isLogged && (<PublicHeader />)}
                {isLogged && (<HeaderDropDownMenu />)}

            </div>
        </header>
    )
}