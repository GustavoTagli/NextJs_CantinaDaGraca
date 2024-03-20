import { OrderModel, OrderModelPost } from "@/types/order-model"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"
import axios, { Axios, AxiosPromise } from "axios"

const URL_API = process.env.NEXT_PUBLIC_API_URL

export function useOrders() {
	const createOrder = async (order: OrderModelPost): Promise<OrderModel> => {
		return await axios.post(`${URL_API}/orders`, order).then((r) => r.data)
	}

	const { data } = useQuery({
		queryKey: ["orders", "clientName"],
		queryFn: () => fetcher<OrderModel>("/orders"),
		staleTime: 1000 * 60 * 5
	})

	return { createOrder, data: data?.data }
}
