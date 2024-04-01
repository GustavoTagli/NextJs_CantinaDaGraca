"use client"

import { ListCategory } from "@/components/lists/list-category"
import styled from "styled-components"
import { Footer } from "@/components/defaults/footer"
import { useEffect } from "react"
import { useFilter } from "@/hooks/useFilter"

const MainContainer = styled.main`
	padding-right: 24px;
	padding-left: 24px;
	padding-top: 24px;
`

export default function Categories() {
	const { cleanFilters } = useFilter()

	useEffect(() => {
		cleanFilters()
	})

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
