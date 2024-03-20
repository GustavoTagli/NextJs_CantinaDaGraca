"use client"

import { useCart } from "@/hooks/useCart"
import { ProductModel } from "@/types/products-model"
import { Trash } from "@phosphor-icons/react"
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	position: absolute;
	right: 4px;
	bottom: 12px;
	padding: 4px 12px;
	width: 100px;

	border: 1px solid var(--border-dark);
	border-radius: 4px;

	font-size: 14px;
	font-weight: 600;
	color: var(--color-dark-light);

	> button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		font-size: 24px;
		font-weight: 600;
		color: var(--secondary-color);

		background-color: transparent;
		border: none;
		outline: none;

		> svg {
			width: 20px;
			height: 20px;
		}
	}
`

interface QuantityControlProps {
	id: string
	quantity: number
}

export function QuantityControl({ id, quantity }: QuantityControlProps) {
	const { products, setProducts, updateLocalStorage } = useCart()
	const [qty, setQty] = useState<number>(quantity)

	const handleQuantityControl = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const text = event.currentTarget.innerText
		let newCart = [] as ProductModel[]

		if (text === "+") {
			newCart = products.map((product: ProductModel) => {
				if (product.id === id) {
					return { ...product, quantity: qty + 1 }
				}
				return product
			})
			setQty((prev) => prev + 1)
		} else if (text === "-") {
			newCart = products.map((product: ProductModel) => {
				if (product.id === id) {
					return { ...product, quantity: qty - 1 }
				}
				return product
			})
			setQty((prev) => prev - 1)
		} else {
			newCart = products.filter((product: ProductModel) => product.id !== id)
		}
		updateLocalStorage(newCart)
		setProducts(newCart)
	}

	return (
		<Container>
			<button onClick={handleQuantityControl}>
				{qty === 1 ? <Trash weight="fill" /> : "-"}
			</button>
			<span>{qty}</span>
			<button onClick={handleQuantityControl}>+</button>
		</Container>
	)
}
