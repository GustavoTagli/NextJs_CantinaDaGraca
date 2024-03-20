"use client"

import { useLocalStorage } from "@/hooks/useLocalStorage"
import { ProductModel } from "@/types/products-model"
import { ReactNode, createContext, useEffect, useState } from "react"

export const CartContext = createContext({
	products: [] as ProductModel[],
	setProducts: (value: ProductModel[]) => {},
	updateLocalStorage: (value: any) => {}
})

interface ProviderProps {
	children: ReactNode
}

export function CartContextProvider({ children }: ProviderProps) {
	const { value, updateLocalStorage } = useLocalStorage<ProductModel[]>(
		"cart-items",
		[]
	)
	const [products, setProducts] = useState<ProductModel[]>(value)

	useEffect(() => {
		setProducts(value)
	}, [value])

	return (
		<CartContext.Provider
			value={{
				products,
				setProducts,
				updateLocalStorage
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
