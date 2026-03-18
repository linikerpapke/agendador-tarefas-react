import { createContext } from "react";

type AuthContextType = {
    isLogged: boolean,
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType)