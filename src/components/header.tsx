"use client"

import { Storefront } from "@phosphor-icons/react"
import styled from "styled-components"
import { PrimaryInputWSearchIcon } from "./primary-input"
import { FilterBar } from "./filter-bar"

const ContainerHeader = styled.header`
	display: flex;
	flex-direction: column;
	padding: 20px;
	border-radius: 0 0 40px 0;

	background-image: var(--bg-gradient-blue);

	div:first-child {
		display: flex;
		justify-content: space-between;

		svg {
			outline: 50px solid #fff;
			outline-offset: 8px;
			border-radius: 50%;
		}
	}
`

const Title = styled.h1`
	font-size: 30px;
	color: #fff;
	weight: 800;
	text-align: left;
`

const HeaderDetail = styled.span`
	display: block;
	height: 120px;
	width: 100%;
	position: absolute;

	z-index: -1;

	background-image: var(--bg-gradient-blue);
	box-shadow: -100px 0 0 0 rgba(0, 0, 0, 0);

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
					<Title>
						Cantina <br />
						da <br />
						Graça
					</Title>
					<Storefront size={80} color="#fff" />
				</div>
				<PrimaryInputWSearchIcon placeholder="Qual a sua fome de hoje?" />
				<FilterBar />
			</ContainerHeader>
			<HeaderDetail></HeaderDetail>
		</header>
	)
}
