import { useCategories } from "@/hooks/useCategories"
import Image from "next/image"
import { useRouter } from "next/navigation"
import styled from "styled-components"

const Container = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
	grid-gap: 10px;
`

const Card = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 170px;

	position: relative;

	border-radius: 6px;
	overflow: hidden;

	> figure {
		width: 100%;
		height: 100%;

		position: absolute;

		> img {
			object-fit: cover;
			filter: blur(1.6px) brightness(0.85);
			width: 100%;
			height: 100%;
		}
	}

	h2 {
		font-size: 24px;
		font-weight: 600;
		color: #fff;
		font-family: inherit;

		z-index: 1;
	}
`

export function ListCategory() {
	const { data, isLoading } = useCategories()
	const route = useRouter()

	const handleNavigate = (id: string) => {
		route.push(`/categories/${id}`)
	}

	return (
		<Container>
			{data?.map((category) => (
				<Card onClick={() => handleNavigate(category.id)} key={category.id}>
					<figure>
						<Image
							src={category.image as string}
							alt="Imagem da categoria"
							width={1280}
							height={720}
						/>
					</figure>
					<h2>{category.name}</h2>
				</Card>
			))}
		</Container>
	)
}
