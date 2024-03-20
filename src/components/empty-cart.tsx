import { ReadCvLogo } from "@phosphor-icons/react"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	> svg {
		color: var(--color-gray);
		width: 100px;
		height: 100px;
	}

	> p {
		color: var(--color-gray);
		font-size: 16px;
		font-weight: 600;
	}
`

export function EmptyCart() {
	return (
		<Container>
			<ReadCvLogo weight="fill" />
			<p>Carrinho vazio</p>
		</Container>
	)
}
