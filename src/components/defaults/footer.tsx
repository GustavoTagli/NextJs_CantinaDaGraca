"use client"

import { HouseLine, SquaresFour } from "@phosphor-icons/react"
import { useRouter, usePathname } from "next/navigation"
import styled from "styled-components"
import { CartControl } from "../cart-control"
import { useFilter } from "@/hooks/useFilter"

const TagFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 44px;
	position: fixed;
	bottom: 0;
	user-select: none;

	z-index: 100;

	width: 100%;
	padding: 10px 0;

	border-top: 0.5px solid var(--border-dark);
	background-color: var(--primary-color);

	> div {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 12px;
		font-weight: 500;
		color: var(--color-dark);

		user-select: none;

		svg {
			color: var(--color-dark);
			width: 28px;
			height: 28px;
		}
	}
`

export function Footer() {
	const { setType } = useFilter()
	const router = useRouter()
	let path = usePathname()

	const handleNavigate = (e: any) => {
		router.push("/" + e.currentTarget.id)
		setType("")
	}

	return (
		<TagFooter>
			<div onClick={handleNavigate} id="/">
				<HouseLine weight={path === "/" ? "fill" : "regular"} />
				<p>Home</p>
			</div>
			<div onClick={handleNavigate} id="categories">
				<SquaresFour
					weight={path.includes("/categories") ? "fill" : "regular"}
				/>
				<p>Categorias</p>
			</div>
			<div onClick={handleNavigate} id="cart">
				<CartControl />
				<p>Carrinho</p>
			</div>
		</TagFooter>
	)
}
