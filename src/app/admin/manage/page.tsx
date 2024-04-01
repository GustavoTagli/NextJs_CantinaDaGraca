"use client"

import { ListCategory } from "@/components/lists/list-category"
import { ListProducts } from "@/components/lists/list-products"
import { PrimaryInputWSearchIcon } from "@/components/primary-input"
import { useFilter } from "@/hooks/useFilter"
import { useProducts } from "@/hooks/useProducts"
import { useState } from "react"
import styled from "styled-components"
import RootLayoutAdmin from "../root-layout-admin"
import { Plus } from "@phosphor-icons/react"
import { Button, Dialog, DialogActions } from "@mui/material"
import { CategoryForm } from "@/components/forms/category-form"
import { ProductForm } from "@/components/forms/product-form"

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 24px;

	padding: 24px;

	.selected {
		color: var(--secondary-color);
		border-bottom: 2px solid var(--secondary-color);
	}

	ul {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 24px;

		@media (max-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
			justify-content: start;
			overflow-x: auto;
			white-space: nowrap;
		}

		li {
			font-size: 20px;
			font-weight: 600;
			cursor: pointer;
			list-style: none;
			padding-bottom: 2px;
			user-select: none;

			@media (max-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
				font-size: 18px;
			}
		}
	}

	> div:nth-child(2) {
		border: 1px solid var(--border-dark);
		margin-top: 0px;
	}
`

const AddButton = styled.button`
	background-color: var(--secondary-color);
	border: none;
	outline: none;
	cursor: pointer;
	width: 48px;
	height: 48px;
	padding: 4px;
	border-radius: 100%;
	position: fixed;
	bottom: 80px;
	right: 24px;

	svg {
		width: 100%;
		height: 100%;
		color: var(--primary-color);
	}
`

export default function Home() {
	const [selectedPage, setSelectedPage] = useState("Categorias")
	const [value, setValue] = useState("")
	const { cleanFilters, setSearch } = useFilter()
	const { data } = useProducts()
	const [open, setOpen] = useState(false)

	const handleChangePage = (event: React.MouseEvent<HTMLLIElement>) => {
		const target = event.currentTarget.innerText
		setSelectedPage(target)
		setValue("")
		cleanFilters()
	}

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		setSearch(event.target.value)
	}

	const handleClick = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<RootLayoutAdmin pagename="Gerenciar">
			<main>
				<Section>
					<ul>
						<li
							onClick={handleChangePage}
							className={selectedPage === "Categorias" ? "selected" : ""}
						>
							Categorias
						</li>
						<li
							onClick={handleChangePage}
							className={selectedPage === "Produtos" ? "selected" : ""}
						>
							Produtos
						</li>
					</ul>
					{selectedPage === "Categorias" ? (
						<>
							<PrimaryInputWSearchIcon
								placeholder={"Buscar categoria"}
								onChange={handleChangeInput}
								value={value}
							/>
							<ListCategory />
						</>
					) : (
						<>
							<PrimaryInputWSearchIcon
								placeholder={"Buscar produto"}
								onChange={handleChangeInput}
								value={value}
							/>
							<ListProducts products={data || []} />
						</>
					)}
					<AddButton onClick={handleClick}>
						<Plus weight="bold" />
					</AddButton>
					<Dialog open={open} onClose={handleClose}>
						{selectedPage === "Categorias" ? <CategoryForm /> : <ProductForm />}
						<DialogActions>
							<Button onClick={handleClose}>Cancelar</Button>
						</DialogActions>
					</Dialog>
				</Section>
			</main>
		</RootLayoutAdmin>
	)
}
