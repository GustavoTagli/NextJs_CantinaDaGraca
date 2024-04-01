"use client"

import { PriorityTypes } from "@/types/priority-types"
import { ReactNode, createContext, useState } from "react"

export const FilterContext = createContext({
	search: "",
	setSearch: (value: string) => {},
	priority: PriorityTypes.ALPHABETICALLY,
	setPriority: (value: PriorityTypes) => {},
	type: "",
	setType: (value: string) => {},
	cleanFilters: () => {}
})

interface ProviderProps {
	children: ReactNode
}

export function FilterContextProvider({ children }: ProviderProps) {
	const [search, setSearch] = useState("")
	const [type, setType] = useState("")
	const [priority, setPriority] = useState(PriorityTypes.ALPHABETICALLY)

	const cleanFilters = () => {
		setSearch("")
		setType("")
		setPriority(PriorityTypes.ALPHABETICALLY)
	}

	return (
		<FilterContext.Provider
			value={{
				search,
				type,
				priority,
				setSearch,
				setType,
				setPriority,
				cleanFilters
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
