import type { UserResponse } from "@/services/userService";
import { createContext } from "react";

type UserContextType = {
    user: UserResponse | null
    setUser: (user: UserResponse | null) => void
    refreshUser: () => Promise<void>
}

export const UserContext = createContext({} as UserContextType)