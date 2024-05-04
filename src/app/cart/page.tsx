"use client"

import { Footer } from "@/components/defaults/footer"
import { EmptyCart } from "@/components/empty-cart"
import { ListProductsInCart } from "@/components/lists/list-products-in-cart"
import { useCart } from "@/hooks/useCart"
import styled from "styled-components"
import { UsernameDialog } from "@/components/username-dialog"
import { useState } from "react"

const Conatiner = styled.main`
	padding: 24px;
	padding-bottom: 138px;
	display: flex;
	flex-direction: column;
	height: 100px;

	> div > h2 {
		font-size: 20px;
		font-weight: 600;
	}

	> .order-btn {
		height: 48px;
		position: fixed;
		width: calc(100% - 48px);
		bottom: 78px;

		background-color: var(--secondary-color);
		border: none;
		border-radius: 6px;

		color: var(--primary-color);
		font-size: 16px;
		font-weight: 600;
	}
`

export default function Cart() {
	const [usernameDigalogInfo, setUsernameDigalogInfo] = useState({
		open: false,
		continue: false
	})
	const { products } = useCart()

	const handleRequestOrder = () => {
		setUsernameDigalogInfo((prev) => ({
			...prev,
			open: true
		}))
	}

	return (
		<>
			<Conatiner id="container-cart">
				<div>
					<h1>Carrinho</h1>
					<h2>Produtos selecionados</h2>
				</div>

				{products.length === 0 ? (
					<EmptyCart />
				) : (
					<>
						<ListProductsInCart />
						<button className="order-btn" onClick={handleRequestOrder}>
							Finalizar pedido
						</button>
					</>
				)}
			</Conatiner>
			<Footer />
			<UsernameDialog
				open={usernameDigalogInfo.open}
				onClose={() =>
					setUsernameDigalogInfo((prev) => ({ ...prev, open: false }))
				}
			/>
		</>
	)
}
