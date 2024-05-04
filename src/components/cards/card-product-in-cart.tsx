import { ProductModel } from "@/types/products-model"
import { formatCurrency } from "@/utils/format-currency"
import Image from "next/image"
import styled from "styled-components"
import { QuantityControl } from "../tiny/quantity-control"
import { QuantityControlDialog } from "../tiny/quantity-control-dialog"

const Card = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 20px;

	padding: 12px 4px;
	height: 100px;

	.full-screen-img {
		width: 110px;
		height: 80px;
	}

	.dialog-screen-img {
		width: 80px;
		height: 60px;
	}

	img {
		border-radius: 6px;
		object-fit: cover;
		width: inherit;
		height: inherit;
	}
`

const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin-top: 12px;
	align-self: flex-start;

	h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-size: 14px;
		font-weight: 500;
	}
`

interface CardProductInCartProps extends ProductModel {
	dialog?: boolean
	selected?: boolean
	qty?: number
	setQuantity?: (value: number) => void
}

export function CardProductInCart(props: CardProductInCartProps) {
	return (
		<Card>
			<figure
				className={props.dialog ? "dialog-screen-img" : "full-screen-img"}
			>
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
			{props.dialog ? (
				<QuantityControlDialog
					selected={props.selected ? props.selected : false}
					product={props}
					quantity={props.qty ? props.qty : 0}
					setQuantity={props.setQuantity || (() => {})}
				/>
			) : (
				<QuantityControl id={props.id} product={props} />
			)}
		</Card>
	)
}
