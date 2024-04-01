import { useCart } from "@/hooks/useCart"
import { ProductModel } from "@/types/products-model"
import { formatCurrency } from "@/utils/format-currency"
import { Minus } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import styled from "styled-components"

const IncreaseDecrease = styled.div`
	display: flex;
	gap: 16px;
	align-items: center;
	justify-content: center;

	width: 100px;
	font-size: 14px;
	font-weight: 500;

	> button {
		border: none;
		background-color: transparent;
		width: 20px;

		cursor: pointer;

		font-size: 24px;
	}

	> button {
		display: flex;
		align-items: center;
		color: var(--secondary-color);
	}

	.btn-disabled {
		color: var(--color-gray);
	}
`

const AddCart = styled.button`
	width: 250px;
	height: 48px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 24px;

	cursor: pointer;

	border: none;
	border-radius: 6px;
	background-color: var(--secondary-color);

	font-size: 16px;
	font-weight: 600;

	> p {
		color: #fff;
	}

	> span {
		color: #fff;
		font-weight: 600;
	}
`

const Container = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 12px;
	padding: 12px 12px;

	border-top: 0.5px solid var(--border-dark);

	color: var(--color-gray);
`

export function FooterProduct(props: { data: ProductModel }) {
	const router = useRouter()
	const { products, updateLocalStorage } = useCart()

	const [quantity, setQuantity] = useState<number>(
		products.find((item: { id: string }) => item.id === props.data.id)
			?.quantity || 1
	)

	const handleAddingToCart = () => {
		if (products) {
			let cartItemsArray = products
			let existingProductIndex = cartItemsArray.findIndex(
				(item: { id: string }) => item.id === props.data.id
			)

			if (existingProductIndex !== -1) {
				cartItemsArray[existingProductIndex].quantity = quantity
			} else {
				cartItemsArray.push({ ...props.data, quantity })
			}

			updateLocalStorage(cartItemsArray)
		} else {
			const newCart = [{ ...props.data, quantity }]
			updateLocalStorage(newCart)
		}

		toast.success("Produto adicionado! Ver carrinho", {
			position: "bottom-center",
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light"
		})
	}

	const handleIncreaseDecrease = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const products = event.currentTarget.innerText

		if (products === "+") setQuantity((oldValue) => oldValue + 1)
		else if (products === "-" && quantity > 1)
			setQuantity((oldValue) => oldValue - 1)
	}

	const handlenavigateToCart = () => {
		router.push("/cart")
	}

	return (
		<>
			<Container>
				<IncreaseDecrease>
					<button
						onClick={handleIncreaseDecrease}
						className={quantity === 1 ? "btn-disabled" : ""}
					>
						<Minus weight="bold" size={18} />
					</button>
					<span>{quantity}</span>
					<button onClick={handleIncreaseDecrease}>+</button>
				</IncreaseDecrease>
				<AddCart onClick={handleAddingToCart}>
					<p>Adicionar</p>
					<span>{formatCurrency(props.data.price * quantity)}</span>
				</AddCart>
			</Container>
			<ToastContainer onClick={handlenavigateToCart} />
		</>
	)
}
