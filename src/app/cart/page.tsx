"use client"

import { Footer } from "@/components/defaults/footer"
import { EmptyCart } from "@/components/empty-cart"
import { ListProductsInCart } from "@/components/list-products-in-cart"
import { useCart } from "@/hooks/useCart"
import { useOrders } from "@/hooks/useOrders"
import { create } from "domain"
import { useState } from "react"
import styled from "styled-components"

const Conatiner = styled.main`
	padding: 24px;
	padding-bottom: 138px;
	display: flex;
	flex-direction: column;

	> div > h2 {
		font-size: 20px;
		font-weight: 600;
	}

	> button {
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
	const { products } = useCart()
	const { createOrder } = useOrders()
	const [client, setClient] = useState(
		JSON.parse(
			localStorage.getItem("info-client") || '{"name": "", "lastOrder": ""}'
		)
	)

	const handleRequestOrder = async () => {
		let name = ""

		if (!client.name) {
			name =
				prompt("Insera seu nome e sobrenome para finalizar o pedido:") || ""
		} else {
			const confirmName = window.confirm("Continuar como " + client.name + "?")
			if (confirmName) name = client.name
			else {
				name =
					prompt("Insera seu nome e sobrenome para finalizar o pedido:") || ""
			}
		}

		if (name) {
			const res = await createOrder({
				clientname: name,
				orderArray: products.map((p) => ({
					productId: p.id,
					quantity: p.quantity || 1
				}))
			})
			const newClient = { name, lastOrder: res.id }
			setClient(newClient)
			localStorage.setItem("info-client", JSON.stringify(newClient))
			alert(
				`Pedido finalizado com sucesso! Por favor dirija-se ao caixa\n\nN° do pedido: ${res.id}\n\nNome: ${name}`
			)
		} else {
			alert("Não foi possível finalizar o pedido :(")
		}
	}

	return (
		<>
			<Conatiner>
				<div>
					<h1>Carrinho</h1>
					<h2>Produtos selecionados</h2>
				</div>

				{products.length === 0 ? (
					<EmptyCart />
				) : (
					<>
						<ListProductsInCart />
						<button onClick={handleRequestOrder}>Finalizar pedido</button>
					</>
				)}
			</Conatiner>
			<Footer />
		</>
	)
}
