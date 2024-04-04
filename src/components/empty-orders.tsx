import { Receipt } from "@mui/icons-material"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 25px;

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

export function EmptyOrders() {
	return (
		<Container>
			<Receipt />
			<p>Fila vazia</p>
		</Container>
	)
}
