import { ReactNode, createContext, useState } from "react"

export const LoginContext = createContext({
	token: "",
	setToken: (value: string) => {}
})

interface ProviderProps {
	children: ReactNode
}

export function LoginContextProvider({ children }: ProviderProps) {
	const [token, setToken] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("token-cantina") ?? ""
		}
		return ""
	})

	return (
		<LoginContext.Provider value={{ token, setToken }}>
			{children}
		</LoginContext.Provider>
	)
}
