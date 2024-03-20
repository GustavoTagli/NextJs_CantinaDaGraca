import { CircleNotch } from "@phosphor-icons/react"
import styled from "styled-components"

const ContainerLoader = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 64px;

	svg {
		color: var(--secondary-color);

		animation: spin 1.8s linear infinite;

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
`

export function Loader() {
	return (
		<ContainerLoader>
			<CircleNotch size={44} weight="fill" />
		</ContainerLoader>
	)
}
