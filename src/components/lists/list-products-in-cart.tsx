import styled from "styled-components"
import { CardProductInCart } from "../cards/card-product-in-cart"
import { useCart } from "@/hooks/useCart"
import { formatCurrency } from "@/utils/format-currency"

const SectionResume = styled.section`
	display: flex;
	flex-direction: column;
	margin-top: 36px;

	> button {
		background-color: transparent;
		border: none;
		outline: none;

		color: var(--secondary-color);

		font-size: 14px;
		text-align: right;

		margin-right: 8px;
	}
`

const Totalizer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 8px;
	margin: 12px 0;

	border-top: 1px solid var(--color-dark);

	font-size: 16px;
	font-weight: 600;
`

export function ListProductsInCart() {
	const { products, setProducts, updateLocalStorage } = useCart()

	const handleCleanCart = () => {
		setProducts([])
		updateLocalStorage([])
	}

	return (
		<SectionResume>
			<button onClick={handleCleanCart}>Limpar</button>

			<div>
				{products.map((product) => (
					<CardProductInCart key={product.id} {...product} />
				))}
			</div>

			<Totalizer>
				<p>Total</p>
				<span>
					{formatCurrency(
						products.reduce(
							(acc, product) => acc + product.price * (product.quantity || 1),
							0
						)
					)}
				</span>
			</Totalizer>
		</SectionResume>
	)
}
