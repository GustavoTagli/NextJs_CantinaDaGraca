import axios from "axios"
import { useLogin } from "./useLogin"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function useAuth() {
	const { token, setToken } = useLogin()

	const generateToken = async (username: string, password: string) => {
		try {
			const token = await axios
				.post(`${API_URL}/api/admin/login`, {
					username,
					password
				})
				.then((res) => res.data.token)

			setToken(token)
			localStorage.setItem("token-cantina", token)
			return token
		} catch (error) {
			console.error(error)
			return ""
		}
	}

	const validateToken = async () => {
		const token = localStorage.getItem("token-cantina")
		if (!token) return false

		try {
			const response = await axios
				.post(`${API_URL}/api/admin/verify`, null, {
					headers: {
						Authorization: token
					}
				})
				.then((res) => {
					return res.data.valid
				})

			if (!response) {
				localStorage.removeItem("token-cantina")
				setToken("")
				return false
			} else {
				setToken(token)
				return true
			}
		} catch (error) {
			console.error(error)
			return false
		}
	}

	return { generateToken, validateToken }
}
