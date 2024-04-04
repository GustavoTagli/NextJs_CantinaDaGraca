"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import styled from "styled-components"
import RootLayoutAdmin from "../root-layout-admin"

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding: 24px;

	input {
		color: var(--color-dark);
	}

	> form {
		width: 100%;
		max-width: 420px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-top: -15%;
		padding: 48px 0;

		background: var(--bg-gradient-blue);
		border-radius: 8px;

		> div:first-child {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		h1,
		p,
		label {
			color: var(--primary-color);
		}

		h1 {
			font-size: 2rem;
			font-weight: 600;
			line-height: 0.8;
		}

		p {
			font-size: 0.9rem;
			font-weight: 500;
		}

		> button {
			width: 40%;
			padding: 12px;
			border: none;
			border-radius: 6px;
			background: var(--secondary-color);
			color: var(--primary-color);
			font-size: 1rem;
			font-weight: 600;
			cursor: pointer;
		}
	}
`

const LabelInputContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 4px;
	width: 60%;

	> label {
		font-size: 1rem;
		font-weight: 600;
	}

	> input {
		font-size: 0.9rem;
		width: 100%;
		padding: 6px;
		border: none;
		border-radius: 6px;
		color: var(--color-dark)

		&:focus {
			outline: 2px solid var(--secondary-color);
		}
	}
`

export default function Login() {
	const [credentials, setCredentials] = useState({ username: "", password: "" })
	const { generateToken } = useAuth()
	const router = useRouter()

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setCredentials((prev) => ({ ...prev, [id]: value }))
	}

	async function handleSignIn(e: any) {
		e.preventDefault()

		try {
			const token = await generateToken(
				credentials.username,
				credentials.password
			)
			if (token) router.push("/admin")
			else
				toast.error("Usuário ou senha inválido!", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light"
				})
		} catch (error) {
			console.log("🚀 ~ file: page.tsx ~ handleSignIn ~ error", error)
		}
	}

	return (
		<>
			<RootLayoutAdmin>
				<MainContainer>
					<form>
						<div>
							<h1>Login</h1>
							<p>Cantina da Graça</p>
						</div>
						<LabelInputContainer>
							<label htmlFor="username">Usuário</label>
							<input
								id="username"
								type="text"
								onChange={handleChangeInput}
								value={credentials.username}
							/>
						</LabelInputContainer>
						<LabelInputContainer>
							<label htmlFor="password">Senha</label>
							<input
								id="password"
								type="password"
								onChange={handleChangeInput}
								value={credentials.password}
							/>
						</LabelInputContainer>
						<button type="submit" onClick={handleSignIn}>
							Entrar
						</button>
					</form>
				</MainContainer>
			</RootLayoutAdmin>
			<ToastContainer />
		</>
	)
}
