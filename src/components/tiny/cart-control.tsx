import { useCart } from "@/hooks/useCart"
import { ShoppingCart } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"
import styled from "styled-components"

const CartCount = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	font-size: 10px;
	font-weight: 500;

	border-radius: 100%;
	background-color: var(--secondary-color);
	color: #fff;

	position: absolute;
	top: -2px;
	right: -6px;

	> p {
		color: #fff;
	}
`

const Container = styled.div`
	display: flex;
	position: relative;
	user-select: none;
`

export function CartControl() {
	const { products } = useCart()
	const path = usePathname()

	return (
		<Container>
			<ShoppingCart weight={path === "/cart" ? "fill" : "regular"} />
			{products.length > 0 && (
				<CartCount>
					<p>{products.length}</p>
				</CartCount>
			)}
		</Container>
	)
}
