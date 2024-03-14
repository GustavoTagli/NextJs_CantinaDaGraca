import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ProductModel } from "@/types/products-model"
import { formatCurrency } from "@/utils/format-currency"
import { useState } from "react"
import styled from "styled-components"

const IncreaseDecrease = styled.div`
	display: flex;
	gap: 12px;
	align-items: center;

	width: 100px;
	font-size: 14px;
	font-weight: 500;

	> button {
		border: none;
		background-color: transparent;
		width: 20px;

		cursor: pointer;

		font-size: 22px;
	}

	> button:last-of-type {
		color: var(--text-blue);
	}
`

const AddCart = styled.button`
	width: 210px;
	display: flex;
	padding: 10px 12px;
	justify-content: space-around;

	cursor: pointer;

	border: none;
	border-radius: 6px;
	background-color: var(--text-blue);

	font-size: 14px;
	color: #fff;
	font-weight: 500;
`

const Container = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 20px;
	padding: 12px 12px;

	border-top: 0.5px solid var(--border-dark);

	color: var(--text-dark);
`

export function FooterProduct(props: { data: ProductModel }) {
	let itemCart = localStorage.getItem("cart-items")
	itemCart = itemCart || "[]"

	const [quantity, setQuantity] = useState<number>(
		JSON.parse(itemCart).find(
			(item: { id: string }) => item.id === props.data.id
		)?.quantity || 1
	)

	const handleAddingToCart = () => {
		let cartItems = localStorage.getItem("cart-items")
		if (cartItems) {
			let cartItemsArray = JSON.parse(cartItems)
			let existingProductIndex = cartItemsArray.findIndex(
				(item: { id: string }) => item.id === props.data.id
			)

			if (existingProductIndex !== -1) {
				cartItemsArray[existingProductIndex].quantity = quantity
			} else {
				cartItemsArray.push({ ...props.data, quantity })
			}

			localStorage.setItem("cart-items", JSON.stringify(cartItemsArray))
		} else {
			const newCart = [{ ...props.data, quantity }]
			localStorage.setItem("cart-items", JSON.stringify(newCart))
		}
	}

	const handleIncreaseDecrease = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const value = event.currentTarget.innerText

		if (value === "+") setQuantity((oldValue) => oldValue + 1)
		else if (value === "-" && quantity > 1)
			setQuantity((oldValue) => oldValue - 1)
	}

	return (
		<Container>
			<IncreaseDecrease>
				<button onClick={handleIncreaseDecrease}>-</button>
				<span>{quantity}</span>
				<button onClick={handleIncreaseDecrease}>+</button>
			</IncreaseDecrease>
			<AddCart onClick={handleAddingToCart}>
				<p>Adicionar</p>{" "}
				<span>{formatCurrency(props.data.price * quantity)}</span>
			</AddCart>
		</Container>
	)
}
