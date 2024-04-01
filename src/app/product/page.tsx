"use client"

import { BackBtn } from "@/components/tiny/back-btn"
import { FooterProduct } from "@/components/defaults/footer-product"
import { Loader } from "@/components/tiny/loader"
import { useProduct } from "@/hooks/useProduct"
import { formatCurrency } from "@/utils/format-currency"
import Image from "next/image"
import styled from "styled-components"

const ContainerImage = styled.figure`
	width: 100%;
	height: 260px;
	> img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`

const ContainerInfo = styled.section`
	margin: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;

	color: var(--color-dark);

	> h2 {
		font-weight: 500;
		font-size: 20px;
	}

	> p,
	span {
		font-size: 14px;
	}

	> span {
		font-weight: 500;
	}
`

export default function Product({
	searchParams
}: {
	searchParams: { id: string }
}) {
	const { data, isLoading } = useProduct(searchParams.id)

	if (isLoading) return <Loader />

	return (
		<main>
			<BackBtn />
			<ContainerImage>
				<Image
					src={data?.image || ""}
					alt="imagem do produto"
					width={1280}
					height={720}
				/>
			</ContainerImage>
			<ContainerInfo>
				<h2>{data?.name}</h2>
				<p>{data?.description}</p>
				<span>{formatCurrency(data?.price || 0)}</span>
			</ContainerInfo>
			<FooterProduct
				data={
					data || {
						id: "",
						name: "",
						description: "",
						price: 0,
						image: "",
						categoryId: "",
						quantityInStock: 0
					}
				}
			/>
		</main>
	)
}
