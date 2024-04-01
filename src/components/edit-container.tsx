import { Trash } from "@phosphor-icons/react"
import { SwipeAction, TrailingActions } from "react-swipeable-list"
import styled from "styled-components"

const DeleteContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2px;
	background-color: var(--color-red);
	color: var(--primary-color);

	> p {
		color: var(--primary-color);
		font-size: 14px;
		font-weight: 500;
	}
`

export const trailingActions = (
	id: string,
	handleDelete: (id: string) => void
) => (
	<TrailingActions>
		<SwipeAction onClick={() => handleDelete(id)}>
			<DeleteContainer>
				<Trash size={24} weight="fill" />
				<p>Deletar</p>
			</DeleteContainer>
		</SwipeAction>
	</TrailingActions>
)
