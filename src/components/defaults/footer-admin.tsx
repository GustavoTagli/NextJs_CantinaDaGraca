"use client"

import { useRouter, usePathname } from "next/navigation"
import styled from "styled-components"
import { useFilter } from "@/hooks/useFilter"
import {
	GearFine,
	Receipt,
	ChartBar,
	Package
} from "@phosphor-icons/react/dist/ssr"

const TagFooter = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 32px;
	position: fixed;
	bottom: 0;
	user-select: none;

	z-index: 100;

	width: 100%;
	padding: 10px 16px;

	border-top: 0.5px solid var(--border-dark);
	background-color: var(--primary-color);

	> div {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		font-size: 12px;
		font-weight: 500;
		color: var(--color-dark);

		user-select: none;

		svg {
			color: var(--color-dark);
			width: 28px;
			height: 28px;
		}
	}
`

export function FooterAdmin() {
	const { setType } = useFilter()
	const router = useRouter()
	let path = usePathname()

	const handleNavigate = (path: string) => {
		router.push(path)
		setType("")
	}

	return (
		<TagFooter>
			<div onClick={() => handleNavigate("/admin")}>
				<ChartBar weight={path === "/admin" ? "fill" : "regular"} />
				<p>Dashboard</p>
			</div>
			<div onClick={() => handleNavigate("/admin/manage")}>
				<GearFine
					weight={path.includes("/admin/manage") ? "fill" : "regular"}
				/>
				<p>Gerenciar</p>
			</div>
			<div onClick={() => handleNavigate("/admin/stock")}>
				<Package weight={path.includes("/admin/stock") ? "fill" : "regular"} />
				<p>Estoque</p>
			</div>
			<div onClick={() => handleNavigate("/admin/orders")}>
				<Receipt weight={path.includes("/admin/orders") ? "fill" : "regular"} />
				<p>Pedidos</p>
			</div>
		</TagFooter>
	)
}
