"use client"

import { FooterAdmin } from "@/components/defaults/footer-admin"
import Header from "@/components/defaults/header"
import { useAuth } from "@/hooks/useAuth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootLayoutAdmin({
	children,
	pagename
}: Readonly<{
	children: React.ReactNode
}> & { pagename?: string }) {
	const { validateToken } = useAuth()
	const router = useRouter()
	const pathname = usePathname()
	const routesWithoutHeader = ["/admin/login"]

	useEffect(() => {
		const checkToken = async () => {
			const isLoggedIn = await validateToken()
			if (!isLoggedIn) {
				router.push("/admin/login")
			} else if (pathname === "/admin/login") {
				router.push("/admin")
			}
		}
		checkToken()
	}, [])

	return (
		<>
			{!routesWithoutHeader.includes(pathname) && (
				<Header pagename={pagename || undefined} />
			)}
			{children}
			{!routesWithoutHeader.includes(pathname) && <FooterAdmin />}
		</>
	)
}
