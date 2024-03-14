import { formatCurrency } from "@/utils/format-currency"
import Image from "next/image"
import { useRouter } from "next/navigation"
import styled from "styled-components"

const Card = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding: 8px;

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
	gap: 4px;

	font-family: inherit;
	font-weight: 300;
	font-size: 14px;
	color: var(--text-dark);

	> h3 {
		font-size: 16px;
		font-weight: 500;
	}

	> p {
		margin-bottom: 20px;
	}

	> span {
		font-weight: 500;
	}
`

interface CardProductProps {
	id: string
	name: string
	description: string
	price: number
	image: string
}

export function CardProduct(props: CardProductProps) {
	const route = useRouter()

	const handleNavigate = () => {
		route.push("/product/?id=" + props.id)
	}

	return (
		<Card onClick={handleNavigate}>
			<ProductInfo>
				<h3>{props.name}</h3>
				<p>{props.description}</p>
				<span>{formatCurrency(props.price)}</span>
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
