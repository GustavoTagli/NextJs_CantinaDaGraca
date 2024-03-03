import { CategoryModel } from "@/types/category-model"
import axios from "axios"
import { useEffect, useState } from "react"

const API_HOST = "http://localhost:3333/api"

export function useDataBase() {
	const [categories, setCategories] = useState<CategoryModel[]>([])

	useEffect(() => {
		Promise.all([axios(`${API_HOST}/categories`)])
			.then(([categoriesResponse]) => {
				setCategories(categoriesResponse.data)
			})
			.catch((error) => {
				console.log("Error fetching data from API: ", error)
			})
	}, [])

	return { categories, setCategories }
}
