"use client"

import { ListCategory } from "@/components/list-category"
import styled from "styled-components"
import { Footer } from "@/components/defaults/footer"

const MainContainer = styled.main`
	padding-right: 24px;
	padding-left: 24px;
	padding-top: 24px;
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
