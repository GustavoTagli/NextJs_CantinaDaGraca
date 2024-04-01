export interface ProductModel {
	id: string
	name: string
	description: string
	price: number
	quantityInStock: number
	quantity?: number
	categoryId: string
	image: string
}

export interface ProductModelPost {
	name: string
	description: string
	price: number
	quantityInStock: number
	categoryId: string
	file: string
}
