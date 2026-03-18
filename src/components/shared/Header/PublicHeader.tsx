import { Link } from "react-router";
import { Button } from "../../ui/button";

export function PublicHeader() {

    return (
        <>
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
        </>
    )
}