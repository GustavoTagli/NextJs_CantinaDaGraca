import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Footer } from "@/components/footer"

const montserrat = Montserrat({
	weight: ["300", "400", "500", "600", "700", "800"],
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Cantina da graça"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={montserrat.className}>
				{children}
				<Footer />
			</body>
		</html>
	)
}
