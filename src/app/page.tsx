"use client"

import { ListProducts } from "@/components/list-products"
import Header from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
	return (
		<>
			<main>
				<Header />
				<ListProducts />
			</main>
			<Footer />
		</>
	)
}
