export interface ProductModel {
	id: string
	name: string
	description: string
	price: number
	quantityInStock?: number
	categoryId: string
	image: string
}
