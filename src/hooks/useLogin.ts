import { LoginContext } from "@/contexts/login-context"
import { useContext } from "react"

export function useLogin() {
	return useContext(LoginContext)
}
