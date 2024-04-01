"use client"

import styled from "styled-components"
import RootLayoutAdmin from "../root-layout-admin"
import { useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { ProductModel } from "@/types/products-model"
import TableStock from "@/components/table-stock"
import { SelectInput } from "@/components/select-input"

const Container = styled.main`
	padding: 24px;
	display: flex;
	flex-direction: column;
	gap: 24px;

	form {
		display: grid;
		grid-gap: 16px;
		grid-template-columns: 1fr 2fr;

		> div {
			display: flex;
			flex-direction: column;
			gap: 8px;

			> select {
				border: none;
				outline: none;
				background: none;
				font-family: inherit;
				font-size: 16px;
			}

			> input {
				width: 100%;
				height: 36px;
				padding: 0 12px;
				border-radius: 6px;
				border: 1px solid var(--border-dark);
				outline: none;
				font-family: inherit;
				font-size: 14px;
			}
		}

		> button {
			grid-column: 1 / -1;
			width: 100%;
			height: 36px;
			background-color: var(--secondary-color);
			color: var(--primary-color);
			border: none;
			outline: none;
			border-radius: 6px;
			cursor: pointer;
			font-size: 16px;
		}
	}
`

export default function Stock() {
	const { updateNumericFieldsOfProducts } = useProducts()
	const { data } = useProducts()
	const [valueOfField, setValueOfField] = useState("0")
	const [selectedField, setSelectedField] = useState("quantityInStock")
	const [selectedProducts, setSelectedProducts] = useState<string[]>([])
	const [openCategory, setOpenCategory] = useState("")
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])

	const handleOpenCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		if (openCategory === event.currentTarget.id) {
			setOpenCategory("")
			return
		}
		setOpenCategory(event.currentTarget.id)
	}

	const handleSelectProduct = (
		event: React.ChangeEvent<HTMLInputElement>,
		product: ProductModel,
		productsOfCategory: ProductModel[]
	) => {
		const { value } = event.target
		setSelectedProducts((prev) => {
			if (prev.includes(value)) {
				setSelectedCategories((prev) =>
					prev.filter((id) => id !== product.categoryId)
				)
				return prev.filter((id) => id !== value)
			}
			const newProducts = [...prev, value]

			if (
				productsOfCategory.every((element) => newProducts.includes(element.id))
			) {
				setSelectedCategories((prev) => {
					return [...prev, product.categoryId]
				})
			}

			return newProducts
		})
	}

	const handleSelectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target

		setSelectedCategories((prev) => {
			if (prev.includes(value)) {
				setSelectedProducts((prev) =>
					prev.filter(
						(id) =>
							!data
								?.filter((product) => product.categoryId === value)
								.map((product) => product.id)
								.includes(id)
					)
				)
				return prev.filter((id) => id !== value)
			}
			const products =
				data
					?.filter((product) => product.categoryId === value)
					.map((product) => product.id) || []

			const newSlectedProducts = selectedProducts.filter(
				(id) => !products.includes(id)
			)

			setSelectedProducts([...newSlectedProducts, ...products])
			return [...prev, value]
		})
	}

	const handleSubmitMultiselection = async (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()

		if (selectedProducts.length === 0 || valueOfField === "") {
			alert("Campos inválidos!")
			return
		}

		try {
			const res = await updateNumericFieldsOfProducts(
				selectedProducts,
				selectedField,
				+valueOfField
			)

			if (res.status !== 200) {
				alert("Erro ao atualizar estoque")
				return
			} else {
				alert("Estoque atualizado com sucesso!")
				setValueOfField("")
				setSelectedProducts([])
				setSelectedCategories([])
			}
		} catch (error) {
			alert("Erro ao atualizar estoque")
			console.error(error)
		}
	}

	const handleChangeInputQty = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = ev.target.value
		const newValue = inputValue.replace(/^0+/, "")

		if (newValue === "" || newValue === "0") {
			setValueOfField("0")
		} else {
			setValueOfField(newValue)
		}
	}

	const handleChangeField = (ev: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedField(ev.target.value)
	}

	return (
		<RootLayoutAdmin pagename="Estoque">
			<Container>
				<div>
					<h1>Multiseleção</h1>
					<form>
						<div>
							<select
								id="field"
								value={selectedField}
								onChange={handleChangeField}
							>
								<option value="quantityInStock">Quantidade</option>
								<option value="price">Preço</option>
							</select>
							<input
								id="valueOfField"
								type="number"
								value={valueOfField}
								onChange={handleChangeInputQty}
								title="Valor do campo selecionado"
							/>
						</div>
						<div>
							<label htmlFor="products">Produtos</label>
							<SelectInput
								handleSelectCategory={handleSelectCategory}
								handleSelectProduct={handleSelectProduct}
								handleOpenCategory={handleOpenCategory}
								selectedCategories={selectedCategories}
								selectedProducts={selectedProducts}
								openCategory={openCategory}
							/>
						</div>
						<button type="submit" onClick={handleSubmitMultiselection}>
							Enviar
						</button>
					</form>
				</div>
				<hr />
				<div>
					<h1>Produtos</h1>
					<TableStock />
				</div>
			</Container>
		</RootLayoutAdmin>
	)
}
