import { MagnifyingGlass } from "@phosphor-icons/react"
import { InputHTMLAttributes, useState } from "react"
import styled from "styled-components"

export const PrimaryInput = styled.input`
	outline: none;
	border: none;
	border-radius: inherit;
	width: 100%;
	height: 28px;

	color: var(--color-dark);
	font-family: inherit;
	font-size: 12px;

	@media (min-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
		height: 36px;

		font-size: 14px;
	}
`
const Container = styled.div`
	background-color: var(--primary-color);

	border-radius: 24px;
	border: 1px solid var(--border-dark);

	width: 100%;
	position: relative;
	padding-left: 38px;

	svg {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);

		color: var(--color-dark);

		@media (min-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
			width: 20px;
			height: 20px;
		}
	}
`

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function PrimaryInputWSearchIcon(props: InputProps) {
	return (
		<Container>
			<PrimaryInput {...props} />
			<MagnifyingGlass size={18} />
		</Container>
	)
}
