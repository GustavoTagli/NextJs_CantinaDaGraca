import { useCategories } from "@/hooks/useCategories"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"
import { Loader } from "../tiny/loader"
import { useFilter } from "@/hooks/useFilter"
import { SwipeableList, SwipeableListItem } from "react-swipeable-list"
import { trailingActions } from "../edit-container"
import { useState } from "react"
import { DialogEditItem } from "../forms/dialog-edit-item"
import { CategoryModel } from "@/types/category-model"

const Container = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fill, 1fr);
	grid-gap: 10px;

	.container {
		display: grid;
		grid-template-columns: repeat(auto-fill, 1fr);
		grid-gap: 10px;
	}
`

const Card = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 170px;
	width: 100%;

	position: relative;

	border-radius: 6px;
	overflow: hidden;

	> figure {
		width: 100%;
		height: 100%;

		position: absolute;

		> img {
			object-fit: cover;
			filter: blur(1.8px) brightness(0.8);
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

	> div {
		position: absolute;
		bottom: 12px;
		right: 12px;
	}
`

export function ListCategory() {
	const { data, isLoading, deleteCategory } = useCategories()
	const { setType } = useFilter()
	const route = useRouter()
	const path = usePathname()
	const [open, setOpen] = useState(false)
	const [category, setCategory] = useState<CategoryModel>({
		id: "",
		name: "",
		image: ""
	})

	const handleClickOpen = (category: CategoryModel) => {
		setOpen(true)
		setCategory(category)
	}

	const handleNavigate = (id: string) => {
		route.push(`/categories/id/?categoryId=${id}`)
		setType(id)
	}

	const handleDelete = async (id: string) => {
		const confirm = window.confirm(
			"Deseja realmente deletar esta categoria?\nTodos os produtos relacionados a ela serão deletados também"
		)
		if (confirm) {
			try {
				await deleteCategory(id)
			} catch (error) {
				alert("Erro ao deletar a categoria")
				console.error(error)
			}
		}
	}

	if (isLoading) return <Loader />

	return (
		<Container>
			{!path.includes("/admin") ? (
				<>
					{data?.map((category) => (
						<Card key={category.id} onClick={() => handleNavigate(category.id)}>
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
				</>
			) : (
				<SwipeableList className="container">
					{data?.map((category) => (
						<SwipeableListItem
							key={category.id}
							trailingActions={trailingActions(category.id, handleDelete)}
						>
							<Card onClick={() => handleClickOpen(category)}>
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
						</SwipeableListItem>
					))}
				</SwipeableList>
			)}
			<DialogEditItem open={open} setOpen={setOpen} category={category} />
		</Container>
	)
}
