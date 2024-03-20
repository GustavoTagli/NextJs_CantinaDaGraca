export interface ProductOrderModel {
	productId: string
	quantity: number
}

export interface OrderModel extends OrderModelPost {
	id: string
	createAt: Date
	updatedAt: Date
	expiryTime: Date
}

export interface OrderModelPost {
	clientname: string
	observation?: string
	status?: number
	orderArray: ProductOrderModel[]
}
