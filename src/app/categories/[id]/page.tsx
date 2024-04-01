"use client"

import { BackBtn } from "@/components/tiny/back-btn"
import { Footer } from "@/components/defaults/footer"
import { ListProducts } from "@/components/lists/list-products"
import { Loader } from "@/components/tiny/loader"
import { useCategory } from "@/hooks/useCategories"
import { useFilter } from "@/hooks/useFilter"
import { useProducts } from "@/hooks/useProducts"
import Image from "next/image"
import { useEffect } from "react"
import styled from "styled-components"

const ImageContainer = styled.div`
	height: 180px;
	width: 100%;
	position: relative;

	> h3 {
		position: absolute;
		bottom: 16px;
		left: 16px;
		z-index: 1;

		font-family: inherit;
		font-size: 26px;
		font-weight: 600;
		color: var(--primary-color);
	}

	> img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		filter: blur(1.8px) brightness(0.8);
	}
`
const ProductsContainer = styled.div`
	margin: 24px;
`

export default function ProductsOfCategory({
	searchParams
}: {
	searchParams: { categoryId: string }
}) {
	const { setType } = useFilter()
	const { data, isLoading } = useProducts()
	const { categoryId } = searchParams
	const category = useCategory(categoryId)

	useEffect(() => {
		setType(categoryId)
	})

	if (isLoading) return <Loader />

	return (
		<>
			<main>
				<ImageContainer>
					<BackBtn />
					<h3>{category.data?.name}</h3>
					<Image
						src={category.data?.image || ""}
						alt={category.data?.name || "imagem da categoria"}
						width={1280}
						height={720}
					/>
				</ImageContainer>
				<ProductsContainer>
					{data === undefined ? (
						<p>Nenhum produto encontrado</p>
					) : isLoading ? (
						<Loader />
					) : (
						<ListProducts products={data} />
					)}
				</ProductsContainer>
			</main>
			<Footer />
		</>
	)
}
