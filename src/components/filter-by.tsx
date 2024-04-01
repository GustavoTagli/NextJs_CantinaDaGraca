import { useFilter } from "@/hooks/useFilter"
import { CategoryModel } from "@/types/category-model"
import { PriorityTypes } from "@/types/priority-types"
import { useState } from "react"

interface FilterByProps {
	title: string
	options: CategoryModel[]
}

export function ClearFilter() {
	return (
		<button
			title="Clear filter"
			onClick={() => {
				window.location.reload()
			}}
		>
			Limpar
		</button>
	)
}

export function FilterBy(props: FilterByProps) {
	const [option, setOption] = useState(props.title)
	const { setType, setPriority } = useFilter()

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value
		setOption(value)

		if (props.title === "Categoria") {
			const category = props.options?.find(
				(category) => category.name === value
			)
			setType(category?.id || "")
		} else if (props.title === "Ordenar") {
			switch (value) {
				case "Mais vendidos":
					setPriority(PriorityTypes.POPULARITY)
					break
				case "Preço: Maior - menor":
					setPriority(PriorityTypes.BIGGEST_PRICE)
					break
				case "Preço: Menor - maior":
					setPriority(PriorityTypes.MINOR_PRICE)
					break
				case "Mais recentes":
					setPriority(PriorityTypes.NEWS)
					break
				default:
					setPriority(PriorityTypes.ALPHABETICALLY)
			}
		}
	}

	return (
		<select
			title={`Filter by ${props.title}`}
			name={props.title}
			id={props.title}
			value={option}
			onChange={handleOptionChange}
		>
			<option value={props.title} disabled>
				{props.title}
			</option>
			{props.options.map((op) => (
				<option key={op.id} value={op.name}>
					{op.name}
				</option>
			))}
			{option !== props.title && (
				<option value={props.title}>Limpar filtro</option>
			)}
		</select>
	)
}
