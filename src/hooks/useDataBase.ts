import { CategoryModel } from "@/types/category-model"
import { ProductModel } from "@/types/products-model"
import axios from "axios"
import { useEffect, useState } from "react"

const API_HOST = "http://localhost:3333/api"

export function useDataBase() {
	const [categories, setCategories] = useState<CategoryModel[]>([])
	const [products, setProducts] = useState<ProductModel[]>([])

	useEffect(() => {
		Promise.all([
			axios(`${API_HOST}/categories`),
			axios(`${API_HOST}/products`)
		])
			.then(([categoriesResponse, productsResponse]) => {
				setCategories(categoriesResponse.data)
				setProducts(productsResponse.data)
			})
			.catch((error) => {
				console.log("Error fetching data from API: ", error)
			})
	}, [])

	return { categories, setCategories, products, setProducts }
}
