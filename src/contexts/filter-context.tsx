"use client"

import { PriorityTypes } from "@/types/priority-types"
import { ReactNode, createContext, useState } from "react"

export const FilterContext = createContext({
	search: "",
	setSearch: (value: string) => {},
	priority: PriorityTypes.NEWS,
	setPriority: (value: PriorityTypes) => {},
	type: "",
	setType: (value: string) => {}
})

interface ProviderProps {
	children: ReactNode
}

export function FilterContextProvider({ children }: ProviderProps) {
	const [search, setSearch] = useState("")
	const [type, setType] = useState("")
	const [priority, setPriority] = useState(PriorityTypes.NEWS)

	return (
		<FilterContext.Provider
			value={{
				search,
				type,
				priority,
				setSearch,
				setType,
				setPriority
			}}
		>
			{children}
		</FilterContext.Provider>
	)
}
