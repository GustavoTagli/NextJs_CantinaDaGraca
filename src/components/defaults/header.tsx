import { Storefront } from "@phosphor-icons/react"
import styled from "styled-components"
import { PrimaryInputWSearchIcon } from "../primary-input"
import { FilterBar } from "../filter-bar"

const ContainerHeader = styled.header`
	display: flex;
	flex-direction: column;
	padding: 24px;
	border-radius: 0 0 40px 0;
	user-select: none;

	background-image: var(--bg-gradient-blue);

	div:first-child {
		display: flex;
		justify-content: space-between;

		svg {
			outline: 50px solid #fff;
			outline-offset: 8px;
			border-radius: 50%;
			width: 80px;
			height: 80px;

			@media (min-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
				width: 105px;
				height: 105px;
				outline: 60px solid #fff;
			}
		}
	}
`

const Title = styled.a`
	font-size: 32px;
	color: #fff;
	font-weight: 800;
	text-align: left;
	z-index: 1;

	text-decoration: none;

	@media (min-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
		font-size: 40px;
	}
`

const HeaderDetail = styled.span`
	display: block;
	height: 120px;
	width: 100%;
	position: absolute;

	z-index: -1;

	background-image: var(--bg-gradient-blue);

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		border-radius: 40px 0 0 0;
		background-color: white;
	}
`

export default function Header() {
	return (
		<header>
			<ContainerHeader>
				<div>
					<Title href="/">
						Cantina <br />
						da <br />
						Graça
					</Title>
					<Storefront color="#fff" />
				</div>
				<PrimaryInputWSearchIcon placeholder="Qual a sua fome de hoje?" />
				<FilterBar />
			</ContainerHeader>
			<HeaderDetail></HeaderDetail>
		</header>
	)
}
