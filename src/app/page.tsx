"use client"

import { ListProducts } from "@/components/lists/list-products"
import Header from "@/components/defaults/header"
import { Footer } from "@/components/defaults/footer"
import styled from "styled-components"
import { useProducts } from "@/hooks/useProducts"
import { useFilter } from "@/hooks/useFilter"
import { useEffect } from "react"
import { Loader } from "@/components/tiny/loader"

const Container = styled.div`
	margin: 24px;

	> h1 {
		font-family: inherit;
		font-size: 24px;
		margin-bottom: 12px;
		weight: 600;
	}
`

export default function Home() {
	const { data, isLoading } = useProducts()
	const { cleanFilters } = useFilter()

	useEffect(() => {
		cleanFilters()
	}, [])

	return (
		<>
			<main>
				<Header />
				<Container>
					<h1>Produtos disponíveis</h1>
					{data === undefined ? (
						<p>Nenhum produto encontrado</p>
					) : isLoading ? (
						<Loader />
					) : (
						<ListProducts products={data} />
					)}
				</Container>
			</main>
			<Footer />
		</>
	)
}
