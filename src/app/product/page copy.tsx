"use client"

import { FooterProduct } from "@/components/defaults/footer-product"
import { useProduct } from "@/hooks/useProduct"
import { formatCurrency } from "@/utils/format-currency"
import { CaretLeft } from "@phosphor-icons/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"

const BackBtn = styled.button`
	border-radius: 100%;
	border: none;
	background-color: var(--bg-primary);

	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 12px;
	left: 12px;
	width: 32px;
	height: 32px;

	box-shadow: 0px 0px 4px 0px var(--text-dark);

	> svg {
		fill: var(--text-blue);
	}
`

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

	color: var(--text-dark);

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
	const router = useRouter()
	const [data, setData] = useState<any>({
		id: "",
		name: "",
		description: "",
		price: 0,
		image: "",
		categoryId: ""
	})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				const productData = await useProduct(searchParams.id)
				setData(productData)
			} catch (error) {
				console.error("Error fetching product data: ", error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [searchParams.id])

	if (loading) {
		return <p>Loading...</p>
	}

	if (!data) {
		return <p>Error loading product data.</p>
	}

	const handleNavigate = () => {
		router.back()
	}

	return (
		<main>
			<BackBtn onClick={handleNavigate}>
				<CaretLeft size={24} />
			</BackBtn>
			<ContainerImage>
				<Image
					src={data.image}
					alt="imagem do produto"
					width={1280}
					height={720}
				/>
			</ContainerImage>
			<ContainerInfo>
				<h2>{data.name}</h2>
				<p>{data.description}</p>
				<span>{formatCurrency(data.price)}</span>
			</ContainerInfo>
			<FooterProduct data={data} />
		</main>
	)
}
