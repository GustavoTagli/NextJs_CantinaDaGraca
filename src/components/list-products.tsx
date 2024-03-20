import styled from "styled-components"
import { CardProduct } from "./card-product"
import { ProductModel } from "@/types/products-model"

const ContainerProducts = styled.div`
	display: flex;
	flex-direction: column;
`

export function ListProducts({ products }: { products: ProductModel[] }) {
	return (
		<ContainerProducts>
			{products?.map((product) => (
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
