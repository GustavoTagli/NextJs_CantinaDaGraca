import styled from "styled-components"
import { CardProduct } from "../cards/card-product"
import { ProductModel } from "@/types/products-model"
import { SwipeableList, SwipeableListItem } from "react-swipeable-list"
import { usePathname } from "next/navigation"
import { useProducts } from "@/hooks/useProducts"
import { trailingActions } from "../edit-container"
import { useState } from "react"
import { DialogEditItem } from "../forms/dialog-edit-item"

const ContainerProducts = styled.div`
	display: flex;
	flex-direction: column;
`

export function ListProducts({ products }: { products: ProductModel[] }) {
	const pathname = usePathname()
	const { deleteProduct } = useProducts()
	const [open, setOpen] = useState(false)
	const [product, setProduct] = useState<ProductModel>({
		id: "",
		name: "",
		description: "",
		price: 0,
		image: "",
		quantityInStock: 0,
		categoryId: "",
		orders: []
	})

	const handleClickOpen = (product: ProductModel) => {
		setOpen(true)
		setProduct(product)
	}

	const handleDelete = async (id: string) => {
		const confirm = window.confirm("Deseja realmente deletar este produto?")
		if (confirm) {
			try {
				await deleteProduct(id)
			} catch (error) {
				alert("Erro ao deletar o produto")
				console.error(error)
			}
		}
	}

	return (
		<ContainerProducts>
			{products.length === 0 && <p>Nenhum produto encontrado</p>}
			{!pathname.includes("/admin") ? (
				products?.map((product) => {
					if (product.quantityInStock > 0)
						return (
							<CardProduct
								key={product.id}
								id={product.id}
								name={product.name}
								description={product.description}
								price={product.price}
								image={product.image || ""}
							/>
						)
				})
			) : (
				<SwipeableList>
					{products?.map((product) => (
						<SwipeableListItem
							key={product.id}
							trailingActions={trailingActions(product.id, handleDelete)}
						>
							<CardProduct
								id={product.id}
								name={product.name}
								description={product.description}
								price={product.price}
								image={product.image}
								handleclickopen={() => handleClickOpen(product)}
							/>
						</SwipeableListItem>
					))}
				</SwipeableList>
			)}
			<DialogEditItem open={open} setOpen={setOpen} product={product} />
		</ContainerProducts>
	)
}
