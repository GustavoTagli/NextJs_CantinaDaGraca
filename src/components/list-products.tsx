import styled from "styled-components"
import { CardProduct } from "./card-product"
import { useProducts } from "@/hooks/useProducts"

const ContainerProducts = styled.div`
	display: flex;
	flex-direction: column;
	margin: 24px;

	> h1 {
		font-family: inherit;
		font-size: 24px;
		margin-bottom: 12px;
		weight: 600;
	}
`

export function ListProducts() {
	const { data, isLoading } = useProducts()

	if (isLoading) return <p>Carregando...</p>
	return (
		<ContainerProducts>
			<h1>Produtos</h1>
			{data?.map((product) => (
				<CardProduct
					key={product.id}
					id={product.id}
					name={product.name}
					description={product.description}
					price={product.price}
					image={product.image}
				/>
			))}
		</ContainerProducts>
	)
}
