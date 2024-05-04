import { ProductModel } from "@/types/products-model"
import { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
	position: absolute;
	right: 4px;
	bottom: 24px;

	font-size: 14px;
	font-weight: 600;
	color: var(--color-dark-light);

	.btn-disabled {
		color: var(--color-gray);
	}

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
interface QuantityControlDialogProps {
	product: ProductModel
	selected: boolean
	quantity: number
	setQuantity: (value: number) => void
}

export function QuantityControlDialog({
	product,
	selected,
	quantity,
	setQuantity
}: QuantityControlDialogProps) {
	const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setQuantity(quantity + 1)
	}
	const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setQuantity(quantity - 1)
	}

	return (
		<Container>
			<button
				onClick={handleDecrement}
				className={quantity === 1 || !selected ? "btn-disabled" : ""}
				disabled={quantity === 1 || !selected}
			>
				-
			</button>
			<span>{quantity}</span>
			<button
				onClick={handleIncrement}
				className={
					quantity === product.quantityInStock || !selected
						? "btn-disabled"
						: ""
				}
				disabled={quantity === product.quantityInStock || !selected}
			>
				+
			</button>
		</Container>
	)
}
