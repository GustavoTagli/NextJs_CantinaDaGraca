"use client"

import { ListCategory } from "@/components/list-category"
import styled from "styled-components"
import { Footer } from "@/components/footer"

const MainContainer = styled.main`
	padding-right: 24px;
	padding-left: 24px;
	padding-top: 24px;

	> h1 {
		margin-bottom: 12px;

		font-size: 24px;
		font-family: inherit;
		font-weight: 600;
		color: --var(text-dark);
	}
`

export default function Categories() {
	return (
		<>
			<MainContainer>
				<h1>Categorias</h1>
				<ListCategory />
			</MainContainer>
			<Footer />
		</>
	)
}
