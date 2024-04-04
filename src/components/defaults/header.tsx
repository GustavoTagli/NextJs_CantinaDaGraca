import styled from "styled-components"
import { PrimaryInputWSearchIcon } from "../primary-input"
import { FilterBar } from "../filter-bar"
import { usePathname } from "next/navigation"
import { useFilter } from "@/hooks/useFilter"
import { StorefrontTwoTone } from "@mui/icons-material"

const ContainerHeader = styled.header`
	display: flex;
	flex-direction: column;
	padding: 24px;
	border-radius: 0 0 48px 0;
	user-select: none;

	background-image: var(--bg-gradient-blue);

	h2 {
		font-size: 20px;
		color: var(--primary-color);
		font-weight: 700;

		margin-top: 8px;
	}

	>div: last-child {
		margin-top: 40px;
	}

	> div:first-child {
		display: flex;
		justify-content: space-between;

		svg {
			outline: 50px solid #fff;
			outline-offset: 8px;
			border-radius: 50%;
			width: 80px;
			height: 80px;
			color: var(--primary-color);

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

		border-radius: 48px 0 0 0;
		background-color: white;
	}
`

export default function Header({ pagename }: { pagename?: string }) {
	const path = usePathname()
	const { setSearch } = useFilter()

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	return (
		<header>
			<ContainerHeader>
				<div>
					<Title href="/">
						Cantina <br />
						da <br />
						Graça
					</Title>
					<StorefrontTwoTone />
				</div>
				{!path.includes("/admin") ? (
					<div>
						<PrimaryInputWSearchIcon
							onChange={handleChangeInput}
							placeholder="Qual a sua fome de hoje?"
						/>
						<FilterBar />
					</div>
				) : (
					<>
						<h2>{pagename ? pagename : "Administrador"}</h2>
					</>
				)}
			</ContainerHeader>
			<HeaderDetail></HeaderDetail>
		</header>
	)
}
