import { OrderModel, OrderModelPost } from "@/types/order-model"
import { fetcher } from "@/utils/fetcher"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useLogin } from "./useLogin"
import { useFilter } from "./useFilter"
import { useDeferredValue } from "react"

const URL_API = process.env.NEXT_PUBLIC_API_URL

export function useOrders() {
	const { token } = useLogin()
	const { search } = useFilter()
	const searchDeferred = useDeferredValue(search)

	const createOrder = async (order: OrderModelPost): Promise<OrderModel> => {
		return await axios.post(`${URL_API}/api/orders`, order).then((r) => r.data)
	}

	const { data, refetch } = useQuery({
		queryKey: ["orders", "clientName"],
		queryFn: () => fetcher<OrderModel[]>("/api/orders"),
		staleTime: 1000 * 60 * 5
	})

	const filteredOrders = data?.data?.filter(
		(order) =>
			order.clientname.toLowerCase().includes(searchDeferred.toLowerCase()) ||
			order.id.toString().includes(searchDeferred)
	)

	const updateOrderStatus = async (
		id: number,
		status: number,
		observation?: string
	) => {
		const data = observation ? { status, observation } : { status }
		const res = await axios.put(`${URL_API}/api/orders/status/${id}`, data, {
			headers: {
				Authorization: token
			}
		})
		refetch()
		return res.data
	}

	const deleteOrder = async (id: number) => {
		const res = await axios.delete(`${URL_API}/api/orders/${id}`, {
			headers: {
				Authorization: token
			}
		})
		refetch()
		return res.data
	}

	return {
		createOrder,
		data: filteredOrders,
		updateOrderStatus,
		deleteOrder,
		refetchOrders: refetch
	}
}
