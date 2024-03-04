"use client"

import { HouseLine, ShoppingCart, SquaresFour } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import styled from "styled-components"
import { CartControl } from "./cart-control"

const TagFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 44px;
	position: fixed;
	bottom: 0;

	height: 44px;
	width: 100%;

	border-top: 0.5px solid var(--border-dark);
	background-color: var(--bg-primary);

	> div {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 10px;
		font-weight: 500;
		color: var(--text-dark);
		> svg {
			color: var(--text-dark);
		}
	}
`

export function Footer() {
	const router = useRouter()

	const handleNavigate = (e: any) => {
		router.push("/" + e.currentTarget.id)
	}

	return (
		<TagFooter>
			<div onClick={handleNavigate} id="home">
				<HouseLine size={22} weight="fill" />
				<p>Home</p>
			</div>
			<div onClick={handleNavigate} id="categories">
				<SquaresFour size={22} />
				<p>Categorias</p>
			</div>
			<div onClick={handleNavigate} id="cart">
				<CartControl />
				<p>Carrinho</p>
			</div>
		</TagFooter>
	)
}
