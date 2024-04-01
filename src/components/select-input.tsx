"use client"

import { useCategories } from "@/hooks/useCategories"
import { useProducts } from "@/hooks/useProducts"
import { ProductModel } from "@/types/products-model"
import { CaretDown, CaretUp } from "@phosphor-icons/react"
import { useState } from "react"
import styled from "styled-components"

const SelectContainer = styled.div`
	position: relative;
	width: 100%;

	border-radius: 6px;
	border: 1px solid var(--border-dark);
	font-family: inherit;

	button:first-child {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 12px;
		height: 36px;

		border: none;
		border-radius: 6px;
		outline: none;
		background-color: var(--primary-color);
		width: 100%;
		font-size: 14px;
	}
`
const ProductsOptions = styled.div`
	padding-left: 12px;
`

const OptionsContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	min-height: 150px;
	max-height: 250px;
	overflow-y: auto;
	padding: 12px;
	z-index: 1;

	background-color: var(--primary-color);
	border-radius: 0 0 6px 6px;
	border: 1px solid var(--border-dark);
	border-top: none;

	display: flex;
	flex-direction: column;
	gap: 8px;

	> div {
		display: flex;
		flex-direction: column;
		gap: 6px;

		> div {
			display: flex;
			align-items: center;
			gap: 2px;

			&:active {
				background-color: #f0f0f0;
			}

			> button {
				background: none;
				border: none;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
			}
		}

		input {
			width: 16px;
			height: 16px;
			margin-right: 8px;
			cursor: pointer;
			&:checked {
				background: #f0f0f0;
			}
		}

		label {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			font-size: 16px;

			> div {
				width: 8px;
				height: 8px;
				border-radius: 100%;
				background-color: var(--color-gray);
			}
		}
	}
`
interface SelectInputProps {
	openCategory: string
	selectedProducts: string[]
	selectedCategories: string[]
	handleSelectCategory: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleSelectProduct: (
		event: React.ChangeEvent<HTMLInputElement>,
		product: ProductModel,
		products: ProductModel[]
	) => void
	handleOpenCategory: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export function SelectInput({
	openCategory,
	selectedProducts,
	selectedCategories,
	handleSelectCategory,
	handleSelectProduct,
	handleOpenCategory
}: SelectInputProps) {
	const { data } = useProducts()
	const [open, setOpen] = useState(false)
	const categories = useCategories().data

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setOpen((prev) => !prev)
	}

	const getSelectedProductsByCategory = (categoryId: string) => {
		const selectedProductsByCategory = selectedProducts.filter((id) =>
			data
				?.filter((product) => product.categoryId === categoryId)
				.map((product) => product.id)
				.includes(id)
		).length

		return selectedProductsByCategory > 0
	}
	return (
		<SelectContainer>
			<button id="products" onClick={handleOpen}>
				<p>
					{selectedProducts.length === 0
						? "Selecionar produto(s)"
						: `${selectedProducts.length} produtos selecionados`}
				</p>
				{!open && <CaretDown />}
				{open && <CaretUp />}
			</button>
			{open && (
				<OptionsContainer>
					{categories?.map((category) => (
						<div key={category.id}>
							<div>
								<input
									type="checkbox"
									name={category.name}
									value={category.id}
									checked={selectedCategories.includes(category.id)}
									onChange={handleSelectCategory}
								/>
								<button id={category.id} onClick={handleOpenCategory}>
									{openCategory !== category.id && <CaretDown />}
									{openCategory === category.id && <CaretUp />}
								</button>
								<label htmlFor={category.id}>
									{category.name}
									{getSelectedProductsByCategory(category.id) && <div></div>}
								</label>
							</div>
							{openCategory === category.id &&
								data
									?.filter((item) => item.categoryId === category.id)
									.map((product) => (
										<ProductsOptions key={product.id}>
											<input
												type="checkbox"
												name={product.name}
												id={product.id}
												value={product.id}
												checked={selectedProducts.includes(product.id)}
												onChange={(event) =>
													handleSelectProduct(
														event,
														product,
														data?.filter(
															(item) => item.categoryId === category.id
														)
													)
												}
											/>
											<label htmlFor={product.id}>{product.name}</label>
										</ProductsOptions>
									))}
						</div>
					))}
				</OptionsContainer>
			)}
		</SelectContainer>
	)
}
