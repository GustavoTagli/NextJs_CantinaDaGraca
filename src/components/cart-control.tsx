import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ShoppingCart } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"
import styled from "styled-components"

const CartCount = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 13px;
	height: 13px;
	font-size: 8px;
	font-weight: 500;

	border-radius: 100%;
	background-color: var(--text-blue);
	color: #fff;

	position: absolute;
	top: -2px;
	right: -6px;
`

const Container = styled.div`
	display: flex;
	position: relative;
`

export function CartControl() {
	const { value } = useLocalStorage("cart-items", [])
	const path = usePathname()

	return (
		<Container>
			<ShoppingCart weight={path === "/cart" ? "fill" : "regular"} />
			{value.length > 0 && (
				<CartCount>
					<p>{value.length}</p>
				</CartCount>
			)}
		</Container>
	)
}
