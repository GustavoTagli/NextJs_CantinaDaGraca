import { Pencil, Trash } from "@phosphor-icons/react"
import styled from "styled-components"

const Container = styled.div`
	display: flex;
	gap: 12px;
	z-index: 1;
`

export function EditRemoveItem({
	pencilFill,
	trashFill
}: {
	pencilFill: string
	trashFill: string
}) {
	return (
		<Container>
			<Trash size={24} weight="fill" fill={trashFill} />
			<Pencil size={24} weight="fill" fill={pencilFill} />
		</Container>
	)
}
