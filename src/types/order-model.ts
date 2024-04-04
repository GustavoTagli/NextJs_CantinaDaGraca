export interface ProductOrderModelPost {
	productId: string
	quantity: number
}

export interface ProductOrderModel {
	id: string
	orderId: string
	productId: string
	name: string
	price: number
	quantity: number
	quantityInStock: number
}

export interface OrderModel extends OrderModelPost {
	id: number
	orders: ProductOrderModel[]
	status: number
	createdAt: Date
	updatedAt: Date
	expiryTime: Date
}

export interface OrderModelPost {
	clientname: string
	observation?: string
	status?: number
	orderArray: ProductOrderModelPost[]
}
