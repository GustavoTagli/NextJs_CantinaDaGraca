import { MagnifyingGlass } from "@phosphor-icons/react"
import { InputHTMLAttributes } from "react"
import styled from "styled-components"

export const PrimaryInput = styled.input`
	outline: none;
	border: none;
	border-radius: inherit;
	width: 100%;
	height: 28px;

	color: var(--text-dark);
	font-family: inherit;
	font-size: 12px;
`
const Container = styled.div`
	background-color: var(--bg-primary);

	border-radius: 24px;

	width: 100%;
	position: relative;
	margin-top: 40px;
	padding-left: 32px;

	svg {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);

		color: var(--text-dark);
	}
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function PrimaryInputWSearchIcon(props: InputProps) {
	return (
		<Container>
			<PrimaryInput {...props} />
			<MagnifyingGlass />
		</Container>
	)
}
