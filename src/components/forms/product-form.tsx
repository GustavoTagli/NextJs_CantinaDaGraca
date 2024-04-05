import { useCategories } from "@/hooks/useCategories"
import { Image } from "@phosphor-icons/react"
import { useRef, useState } from "react"
import {
	FileInput,
	InputLabelContainer,
	InputsGroup,
	RootFormLayout
} from "./root-form-layout"
import { useProducts } from "@/hooks/useProducts"
import { ProductModel, ProductModelPut } from "@/types/products-model"

export function ProductForm({
	product,
	handleclose
}: {
	product?: ProductModel
	handleclose?: () => void
}) {
	const { data } = useCategories()
	const { createProduct, updateProduct } = useProducts()
	const fileRef = useRef<HTMLInputElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const [form, setForm] = useState({
		name: product?.name || "",
		price: product?.price.toString() || "0.00",
		description: product?.description || "",
		category: product?.categoryId || "default",
		file: null as File | null
	})

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const key = event.key
		if (key.includes("Arrow")) {
			event.preventDefault()
		}
		if (key === "Backspace") {
			event.preventDefault()

			const newValue = form.price.slice(0, -1)
			const formattedValue = formatInput(newValue)
			setForm((prev) => ({ ...prev, price: formattedValue }))
		}
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value
		const formattedValue = formatInput(newValue)

		if (form.price.length >= 6) return
		setForm((prev) => ({ ...prev, price: formattedValue }))
	}

	const formatInput = (newValue: string) => {
		// Remove qualquer caractere que não seja um dígito
		let numericValue = newValue.replace(/\D/g, "")

		// Remove zeros à esquerda da parte inteira
		numericValue = numericValue.replace(/^0+/, "")

		// Se o valor for vazio, define como zero
		if (!numericValue) {
			numericValue = "0"
		}

		// Adiciona zeros à esquerda até completar 3 dígitos
		while (numericValue.length < 3) {
			numericValue = "0" + numericValue
		}

		// Insere uma vírgula antes dos últimos dois dígitos
		const integerPart = numericValue.slice(0, -2)
		const decimalPart = numericValue.slice(-2)
		const formattedValue = `${integerPart}.${decimalPart}`

		return formattedValue
	}

	const handleClickOnFile = () => {
		fileRef.current?.click()
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setForm((prev) => ({ ...prev, file }))
		}
	}

	const handleAddProduct = async (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		const { name, price, description, category, file } = form
		const priceNumber = +price

		if (!name || !price || priceNumber === 0 || !category || !file) {
			alert("Preencha todos os campos obrigatórios")
			return
		}

		const formData = new FormData()
		formData.append("name", name)
		formData.append("price", priceNumber.toString())
		formData.append("description", description)
		formData.append("category", category)
		formData.append("file", file)

		try {
			await createProduct(formData)
			alert("Produto adicionado com sucesso")
			setForm({
				name: "",
				price: "0.00",
				description: "",
				category: "default",
				file: null
			})
		} catch (error) {
			alert("Erro ao adicionar produto")
		}
	}

	const handleUpdateProduct = async (
		ev: React.MouseEvent<HTMLButtonElement>
	) => {
		ev.preventDefault()
		const { name, price, description, category, file } = form
		const priceNumber = +price

		if (!name || !price || priceNumber === 0 || !category) {
			alert("Preencha todos os campos obrigatórios")
			return
		}

		const updatedProduct: ProductModelPut = {
			name,
			price: priceNumber,
			description,
			categoryId: category
		}
		if (file) updatedProduct["file"] = file

		try {
			await updateProduct(product?.id || "", updatedProduct)
			alert("Informações do produto atualizadas")
			handleclose?.()
			setForm({
				name: "",
				price: "0.00",
				description: "",
				category: "default",
				file: null
			})
		} catch (error) {
			alert("Erro ao editar produto")
		}
	}

	return (
		<RootFormLayout>
			<h1>{!product ? "Adicionar produto" : "Editar produto"}</h1>
			<InputsGroup>
				<InputLabelContainer>
					<label htmlFor="name">Nome</label>
					<input
						value={form.name}
						onChange={(ev) => {
							setForm((prev) => ({ ...prev, name: ev.target.value }))
						}}
						id="name"
						type="text"
						placeholder="Coxinha, Esfiha..."
					/>
				</InputLabelContainer>
				<InputLabelContainer className="flex">
					<label htmlFor="price">Preço</label>
					<div id="price-container">
						<span>R$</span>
						<input
							id="price"
							type="text"
							placeholder="0.00"
							ref={inputRef}
							value={form.price}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
							onClick={(ev: React.MouseEvent<HTMLInputElement>) => {
								const length = ev.currentTarget.value.toString().length
								inputRef.current?.setSelectionRange(length, length)
							}}
						/>
					</div>
				</InputLabelContainer>
			</InputsGroup>
			<InputLabelContainer>
				<label htmlFor="description">Descrição (opcional)</label>
				<textarea
					id="description"
					rows={3}
					placeholder="Descrição do produto"
					value={form.description}
					onChange={(ev) => {
						setForm((prev) => ({ ...prev, description: ev.target.value }))
					}}
				/>
			</InputLabelContainer>
			<InputLabelContainer>
				<label htmlFor="category">Categoria</label>
				<select
					name="category"
					id="category"
					value={form.category}
					onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
						setForm({
							...form,
							category: ev.currentTarget.value
						})
					}}
				>
					<option value={"default"} disabled>
						Selecionar
					</option>
					{data?.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</InputLabelContainer>
			<InputLabelContainer>
				<label htmlFor="file">Imagem</label>
				<FileInput onClick={handleClickOnFile}>
					<Image alt={"Retrato"} weight={form.file ? "fill" : "regular"} />
					<span>
						{form.file
							? form.file.name
							: !product
							? "Nenhum arquivo selecionado"
							: "Manter imagem"}
					</span>
					<input
						onChange={handleFileChange}
						ref={fileRef}
						id="file"
						type="file"
						multiple={false}
						hidden
						accept="image/*"
					/>
				</FileInput>
			</InputLabelContainer>
			<button
				onClick={!product ? handleAddProduct : handleUpdateProduct}
				type="submit"
			>
				{!product ? "Adicionar" : "Salvar alterações"}
			</button>
		</RootFormLayout>
	)
}
