import { useFilter } from "./useFilter"
import { ProductModel } from "@/types/products-model"
import { useDeferredValue } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/utils/fetcher"
import { getFieldPriority } from "@/utils/get-field-priority"
import axios from "axios"
import { useLogin } from "./useLogin"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export function useProducts() {
	const { token } = useLogin()
	const { type, priority, search } = useFilter()
	const searchDeferred = useDeferredValue(search)
	const params = {
		params: {
			category: type ? type : undefined,
			sortField: getFieldPriority(priority).field,
			sortOrder: getFieldPriority(priority).order
		}
	}

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["products", type, priority],
		queryFn: () => fetcher<ProductModel[]>("/products", params),
		staleTime: 1000 * 60 * 10
	})

	const filteredProducts = data?.data?.filter((product) =>
		product.name.toLowerCase().includes(searchDeferred.toLowerCase())
	)

	const deleteProduct = async (id: string) => {
		await axios.delete(`${API_URL}/products/${id}`, {
			headers: {
				Authorization: token
			}
		})
		refetch()
	}

	const createProduct = async (product: FormData) => {
		await axios.post(`${API_URL}/products`, product, {
			headers: {
				Authorization: token
			}
		})
		refetch()
	}

	const updateProduct = async (id: string, product: ProductModel) => {
		const res = await axios.put(`${API_URL}/products/${id}`, product, {
			headers: {
				Authorization: token
			}
		})
		refetch()
		return res
	}

	const updateNumericFieldsOfProducts = async (
		productsId: string[],
		field: string,
		value: number
	) => {
		const res = await axios.put(
			`${API_URL}/products`,
			{ productsId, field, value },
			{
				headers: {
					Authorization: token
				}
			}
		)
		refetch()
		return res
	}

	return {
		data: filteredProducts,
		isLoading,
		deleteProduct,
		createProduct,
		updateProduct,
		updateNumericFieldsOfProducts,
		refetchProducts: refetch
	}
}
