import { CaretLeft } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import styled from "styled-components"

const Btn = styled.button`
	border-radius: 100%;
	border: none;
	background-color: var(--primary-color);

	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 16px;
	left: 16px;
	width: 32px;
	height: 32px;

	z-index: 100;

	box-shadow: 0px 0px 4px 0px var(--color-dark);

	> svg {
		fill: var(--secondary-color);
	}
`

export function BackBtn() {
	const router = useRouter()

	const handleNavigate = () => {
		router.back()
	}

	return (
		<Btn onClick={handleNavigate}>
			<CaretLeft size={24} />
		</Btn>
	)
}
