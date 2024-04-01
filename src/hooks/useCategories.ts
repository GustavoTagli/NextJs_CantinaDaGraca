import { CategoryModel } from "@/types/category-model"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"
import { useFilter } from "./useFilter"
import { useDeferredValue } from "react"
import axios from "axios"
import { useLogin } from "./useLogin"
import { useProducts } from "./useProducts"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function useCategories() {
	const { refetchProducts } = useProducts()
	const { token } = useLogin()
	const { search } = useFilter()
	const searchDeferred = useDeferredValue(search)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetcher<CategoryModel[]>("/categories"),
		staleTime: 1000 * 60 * 60
	})

	const filteredCategories = data?.data?.filter((category) =>
		category.name.toLowerCase().includes(searchDeferred.toLowerCase())
	)

	const deleteCategory = async (id: string) => {
		await axios.delete(`${API_URL}/categories/${id}`, {
			headers: { Authorization: token }
		})
		refetch()
		refetchProducts()
	}

	const createCategory = async (category: FormData) => {
		await axios.post(`${API_URL}/categories`, category, {
			headers: { Authorization: token }
		})
		refetch()
	}

	const updateCategory = async (id: string, category: FormData) => {
		await axios.put(`${API_URL}/categories/${id}`, category, {
			headers: { Authorization: token }
		})
		refetch()
	}

	return {
		data: filteredCategories,
		isLoading,
		deleteCategory,
		createCategory,
		updateCategory
	}
}

export function useCategory(id: string) {
	const { data, isLoading } = useQuery({
		queryKey: ["category", { id }],
		queryFn: () => fetcher<CategoryModel>(`/categories/${id}`),
		enabled: !!id,
		staleTime: 1000 * 60 * 60
	})

	return { data: data?.data, isLoading }
}
