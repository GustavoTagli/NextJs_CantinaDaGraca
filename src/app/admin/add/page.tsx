"use client"

import { CategoryForm } from "@/components/forms/category-form"
import { ProductForm } from "@/components/forms/product-form"
import { UserForm } from "@/components/forms/user-form"
import { useState } from "react"
import styled from "styled-components"
import RootLayoutAdmin from "../root-layout-admin"

const Section = styled.section`
	padding: 24px 24px 80px 24px;
	display: flex;
	flex-direction: column;
	gap: 12px;

	> h1 {
		font-size: 20px;
		margin: 0;
	}

	> select {
		padding: 0 8px;
		width: 50%;
		height: 32px;
		border-radius: 6px;
		border: 1px solid var(--border-dark);
		outline: none;

		background-color: var(--primary-color);
		color: var(--color-dark);
		font-size: 16px;
		font-family: inherit;
	}
`

export default function Add() {
	const [option, setOption] = useState("product")

	const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setOption(e.target.value)
	}

	return (
		<RootLayoutAdmin>
			<Section>
				<h1>O que você deseja adionar?</h1>
				<select
					name="creation-options"
					id="creation-options"
					defaultValue={option}
					onChange={handleOptionChange}
				>
					<option value="product">Produto</option>
					<option value="category">Categoria</option>
					<option value="user">Usuário</option>
				</select>
				{option === "product" && <ProductForm />}
				{option === "category" && <CategoryForm />}
				{option === "user" && <UserForm />}
			</Section>
		</RootLayoutAdmin>
	)
}
