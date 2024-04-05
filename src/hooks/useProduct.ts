import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { ProductModel } from "@/types/products-model"

export function useProduct(id: string) {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["product", { id }],
		queryFn: () => fetcher<ProductModel>(`/api/products/${id}`),
		enabled: !!id,
		staleTime: 1000 * 60 * 5
	})

	return { data: data?.data, isLoading, refetchProduct: refetch }
}
