import { OrderModel } from "./order-model"

interface ProductOrders {
	id: number
	productId: number
	quantity: number
	Order: OrderModel
}

export interface ProductModel {
	id: string
	name: string
	description: string
	price: number
	quantityInStock: number
	quantity?: number
	categoryId: string
	image: string
	orders: ProductOrders[]
}

export interface ProductModelPost {
	name: string
	description: string
	price: number
	quantityInStock: number
	categoryId: string
	file: File
}

export interface ProductModelPut {
	name?: string
	description?: string
	price?: number
	quantityInStock?: number
	categoryId?: string
	file?: File
}
