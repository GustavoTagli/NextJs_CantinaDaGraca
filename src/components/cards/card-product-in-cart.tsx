import { ProductModel } from "@/types/products-model"
import { formatCurrency } from "@/utils/format-currency"
import Image from "next/image"
import styled from "styled-components"
import { QuantityControl } from "../tiny/quantity-control"

const Card = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 20px;

	padding: 12px 4px;
	height: 100px;

	> figure {
		width: 110px;
		height: 80px;

		> img {
			border-radius: 6px;
			object-fit: cover;
			width: inherit;
			height: inherit;
		}
	}
`

const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 12px;
	align-self: flex-start;

	h3 {
		font-size: 14px;
		font-weight: 500;
	}
`

export function CardProductInCart(props: ProductModel) {
	return (
		<Card>
			<figure>
				<Image
					src={props.image}
					alt="imagem do produto"
					width={1280}
					height={720}
				/>
			</figure>
			<ProductInfo>
				<h3>{props.name}</h3>
				<span>{formatCurrency(props.price)}</span>
			</ProductInfo>
			<QuantityControl id={props.id} product={props} />
		</Card>
	)
}
