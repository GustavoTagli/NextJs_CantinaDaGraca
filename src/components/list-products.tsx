import styled from "styled-components"
import { CardProduct } from "./card-product"
import { useDataBase } from "@/hooks/useDataBase"

const ContainerProducts = styled.div`
	display: flex;
	flex-direction: column;
	margin: 24px;

	> h1 {
		font-family: inherit;
		font-size: 20px;
		margin-bottom: 12px;
		weight: 600;
	}
`

export function ListProducts() {
	const { products } = useDataBase()

	return (
		<ContainerProducts>
			<h1>Produtos</h1>
			{products.map((product) => (
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
