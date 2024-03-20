import { CategoryModel } from "@/types/category-model"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
	const { data, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => fetcher<CategoryModel[]>("/categories"),
		staleTime: 1000 * 60 * 60
	})

	return { data: data?.data, isLoading }
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
