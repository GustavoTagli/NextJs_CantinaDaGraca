"use client"

import { Montserrat } from "next/font/google"
import "./globals.css"
import { DefaultProviders } from "@/components/default-providers"
import "react-toastify/dist/ReactToastify.css"
import "react-swipeable-list/dist/styles.css"

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"]
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				<DefaultProviders>{children}</DefaultProviders>
			</body>
		</html>
	)
}
