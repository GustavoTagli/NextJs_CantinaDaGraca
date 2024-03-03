import { useState } from "react"

interface OptionModel {
	id: string
	name: string
}

interface FilterByProps {
	title: string
	options: OptionModel[]
}

export function FilterBy(props: FilterByProps) {
	const [option, setOption] = useState(props.title)

	const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOption(event.target.value)
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
		</select>
	)
}
