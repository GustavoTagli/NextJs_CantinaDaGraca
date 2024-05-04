import { useProducts } from "@/hooks/useProducts"
import { CaretDown, CaretUp } from "@phosphor-icons/react"
import { MouseEvent, useState } from "react"
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
	}
`

const OptionsContainer = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	height: 200px;
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

	div {
		display: flex;
		align-items: center;

		&:active {
			background-color: #f0f0f0;
		}

		input {
			width: 18px;
			height: 18px;
			margin-right: 8px;
			&:checked {
				background: #f0f0f0;
			}
		}

		label {
			width: 100%;
			font-size: 16px;
		}
	}
`

const FormContainer = styled.form`
	display: grid;
	grid-gap: 16px;
	grid-template-columns: 1fr 2fr;

	> div {
		display: flex;
		flex-direction: column;
		gap: 8px;

		> input {
			width: 100%;
			height: 36px;
			padding: 0 12px;
			border-radius: 6px;
			border: 1px solid var(--border-dark);
			outline: none;
			font-family: inherit;
			font-size: 16px;
		}
	}
`

export function ManagerProductsStock() {
	const [open, setOpen] = useState(false)
	const { data } = useProducts()
	const [selectedProducts, setSelectedProducts] = useState<string[]>([])

	const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setOpen((prev) => !prev)
	}

	return (
		<section>
			<div>
				<h1>Ajustar estoque</h1>
				<FormContainer>
					<div>
						<label htmlFor="quantity">Quantidade</label>
						<input id="quantity" type="number" />
					</div>
					<div>
						<label htmlFor="products">Produtos</label>
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
									{data?.map((product) => (
										<div key={product.id}>
											<input
												type="checkbox"
												name={product.name}
												id={product.id}
												value={product.id}
												checked={selectedProducts.includes(product.id)}
												onChange={(event) => {
													const { value } = event.target
													setSelectedProducts((prev) => {
														if (prev.includes(value)) {
															return prev.filter((id) => id !== value)
														}
														return [...prev, value]
													})
												}}
											/>
											<label htmlFor={product.id}>{product.name}</label>
										</div>
									))}
								</OptionsContainer>
							)}
						</SelectContainer>
					</div>
					<button type="submit">Enviar</button>
				</FormContainer>
			</div>
		</section>
	)
}
