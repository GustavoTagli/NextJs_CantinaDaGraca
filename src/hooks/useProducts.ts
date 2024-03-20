import { useFilter } from "./useFilter"
import { ProductModel } from "@/types/products-model"
import { useDeferredValue } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { getFieldPriority } from "@/utils/get-field-priority"

export function useProducts() {
	const { type, priority, search } = useFilter()
	const searchDeferred = useDeferredValue(search)
	const params = {
		params: {
			category: type ? type : undefined,
			sortField: getFieldPriority(priority).field,
			sortOrder: getFieldPriority(priority).order
		}
	}

	const { data, isLoading } = useQuery({
		queryFn: () => fetcher<ProductModel[]>("/products", params),
		queryKey: ["products", type, priority],
		staleTime: 1000 * 60 * 10
	})

	const products = data?.data
	const filteredProducts = products?.filter((product) =>
		product.name.toLowerCase().includes(searchDeferred.toLowerCase())
	)

	return { data: filteredProducts, isLoading }
}
