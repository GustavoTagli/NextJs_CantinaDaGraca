import { formatCurrency } from "@/utils/format-currency"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"

const Card = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 8px;
	height: 120px;
	width: 100%;

	cursor: pointer;

	&:first-of-type {
		border-top: 0.5px solid var(--border-dark);
	}
	border-bottom: 0.5px solid var(--border-dark);

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
	justify-content: space-between;
	height: 100%;

	font-family: inherit;
	font-weight: 300;
	font-size: 14px;
	color: var(--color-dark);

	h3 {
		font-size: 16px;
		font-weight: 500;
	}

	p {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	> div {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	> div:nth-child(2) {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;

		> span {
			font-weight: 500;

			> div {
			}
		}
	}
`

interface CardProductProps {
	id: string
	name: string
	description: string
	price: number
	image: string
	handleclickopen?: () => void
}

export function CardProduct(props: CardProductProps) {
	const route = useRouter()
	const path = usePathname()

	const handleNavigate = () => {
		route.push("/product/?id=" + props.id)
	}

	return (
		<Card
			// {...props}
			onClick={!path.includes("admin") ? handleNavigate : props.handleclickopen}
		>
			<ProductInfo>
				<div>
					<h3>{props.name}</h3>
					<p>{props.description}</p>
				</div>
				<div>
					<span>{formatCurrency(props.price)}</span>
				</div>
			</ProductInfo>
			<figure>
				<Image
					src={props.image}
					width={1280}
					height={720}
					alt="imagem do produto"
				/>
			</figure>
		</Card>
	)
}
