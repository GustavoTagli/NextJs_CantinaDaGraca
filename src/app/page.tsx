"use client"

import { ListProducts } from "@/components/list-products"
import styles from "./page.module.css"
import Header from "@/components/header"

export default function Home() {
	return (
		<main className={styles.main}>
			<Header />
			<ListProducts />
		</main>
	)
}
