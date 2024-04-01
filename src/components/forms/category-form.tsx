import { Image } from "@phosphor-icons/react"
import {
	FileInput,
	InputLabelContainer,
	RootFormLayout
} from "./root-form-layout"
import { useRef, useState } from "react"
import { useCategories } from "@/hooks/useCategories"
import { CategoryModel } from "@/types/category-model"

export function CategoryForm({
	category,
	handleclose
}: {
	category?: CategoryModel
	handleclose?: () => void
}) {
	const { createCategory, updateCategory } = useCategories()
	const fileRef = useRef<HTMLInputElement>(null)
	const [form, setForm] = useState({
		name: category?.name || "",
		file: null as File | null
	})

	const handleClickOnFile = () => {
		fileRef.current?.click()
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			setForm((prev) => ({ ...prev, file }))
		}
	}

	const handleAddCategory = async (ev: React.MouseEvent<HTMLButtonElement>) => {
		ev.preventDefault()
		const { name, file } = form

		if (!name || !file) {
			alert("Preencha todos os campos")
			return
		}

		const formData = new FormData()
		formData.append("name", name)
		formData.append("file", file)

		try {
			await createCategory(formData)
			alert("Categoria adicionada com sucesso")
			setForm({ name: "", file: null })
		} catch (error) {
			alert("Erro ao adicionar categoria")
		}
	}

	const handleUpdateCategory = async (
		ev: React.MouseEvent<HTMLButtonElement>
	) => {
		ev.preventDefault()
		const { name, file } = form

		if (!name) {
			alert("Preencha todos os campos")
			return
		}

		const formData = new FormData()
		formData.append("name", name)
		if (file) formData.append("file", file)

		try {
			await updateCategory(category?.id || "", formData)
			alert("Informações da categoria atualizadas com sucesso")
			handleclose?.()
			setForm({ name: "", file: null })
		} catch (error) {
			alert("Erro ao editar categoria")
		}
	}

	return (
		<RootFormLayout>
			<h1>{!category ? "Adicionar categoria" : "Editar categoria"}</h1>
			<InputLabelContainer>
				<label htmlFor="name">Nome</label>
				<input
					value={form.name}
					onChange={(ev) =>
						setForm((prev) => ({ ...prev, name: ev.target.value }))
					}
					id="name"
					type="text"
					placeholder="Salgados, Doces..."
				/>
			</InputLabelContainer>
			<InputLabelContainer>
				<label htmlFor="file">Imagem</label>
				<FileInput onClick={handleClickOnFile}>
					<Image alt={"Retrato"} weight={form.file ? "fill" : "regular"} />
					<span>
						{form.file
							? form.file.name
							: !category
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
				onClick={!category ? handleAddCategory : handleUpdateCategory}
				type="submit"
			>
				{!category ? "Adicionar" : "Salvar alterações"}
			</button>
		</RootFormLayout>
	)
}
