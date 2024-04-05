"use client"

import { BarChart, Gauge, gaugeClasses } from "@mui/x-charts"
import RootLayoutAdmin from "./root-layout-admin"
import { useProducts } from "@/hooks/useProducts"
import styled from "styled-components"
import { useOrders } from "@/hooks/useOrders"
import { OrderModel } from "@/types/order-model"
import { useEffect } from "react"
import { io } from "socket.io-client"

const MainContainer = styled.main`
	padding: 24px;
	padding-bottom: 80px;
	display: flex;
	flex-direction: column;
	gap: 32px;

	section {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1 {
			width: 100%;
		}
	}
`

const TopProductsContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 130px;

		p {
			font-size: 14px;
			font-weight: 500;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			width: 100%;
		}
	}
`

function getWeekOfOrder(date: Date) {
	const weekOfMonth = Math.ceil(new Date(date).getDate() / 7)
	return `${weekOfMonth}°`
}

function getProfitOfOrder(order: OrderModel) {
	const profit = order.orders.reduce(
		(accum, item) => accum + item.price * item.quantity,
		0
	)
	const hour = new Date(order.createdAt).getHours()

	let period: "manha" | "tarde" | "noite"

	if (hour >= 0 && hour < 15) period = "manha"
	else if (hour >= 15 && hour < 18) period = "tarde"
	else period = "noite"

	return { period, profit }
}

const URL_SOCKET = process.env.NEXT_PUBLIC_API_URL as string

export default function Dashboard() {
	const { data, refetchProducts } = useProducts()
	const { data: orders, refetchOrders } = useOrders()

	useEffect(() => {
		const socket = io(URL_SOCKET)

		socket.on("ordersUpdated", () => {
			refetchOrders()
			refetchProducts()
		})

		socket.on("productsUpdated", () => {
			refetchProducts()
		})

		return () => {
			socket.disconnect()
		}
	})

	if (!orders) return null
	const dataset = orders
		?.reduce((accum: any, item) => {
			if (item.status !== 2) return accum

			const now = new Date()
			const week = getWeekOfOrder(item.createdAt)
			const { period, profit } = getProfitOfOrder(item)

			if (now.getMonth() !== new Date(item.createdAt).getMonth()) return accum

			if (accum.some((data: any) => data.week === week)) {
				const index = accum.findIndex((data: any) => data.week === week)
				const current = accum[index]
				current[period] += profit
			} else {
				accum.push({
					week,
					manha: period === "manha" ? profit : 0,
					tarde: period === "tarde" ? profit : 0,
					noite: period === "noite" ? profit : 0
				})
			}

			return accum
		}, [])
		.sort(
			(a: any, b: any) => +a.week.replace("°", "") - +b.week.replace("°", "")
		)

	const getTopProducts = (number: number) => {
		const now = new Date()
		const currentMonth = now.getMonth()

		const topProducts = data
			?.filter(
				(product) =>
					product.orders.length > 0 &&
					product.orders.some((order) => {
						return (
							new Date(order.Order?.createdAt)?.getMonth() === currentMonth &&
							order.Order.status === 2
						)
					})
			)
			.sort(
				(a, b) =>
					b.orders.reduce((accum, item) => accum + item.quantity, 0) -
					a.orders.reduce((accum, item) => accum + item.quantity, 0)
			)
			.slice(0, number)

		return topProducts
	}

	const getTotalSales = () => {
		const now = new Date()
		const currentMonth = now.getMonth()

		const totalSales = data
			?.filter(
				(product) =>
					product.orders.length > 0 &&
					product.orders.some((order) => {
						return (
							new Date(order.Order?.createdAt)?.getMonth() === currentMonth &&
							order.Order.status === 2
						)
					})
			)
			.reduce(
				(accum, product) =>
					accum +
					product.orders.reduce((accum, item) => accum + item.quantity, 0),
				0
			)

		return totalSales
	}

	return (
		<RootLayoutAdmin pagename={"Dashboard"}>
			<MainContainer>
				<section>
					<h1>Mais vendidos do mês</h1>
					<TopProductsContainer>
						{getTopProducts(3)?.map((product) => (
							<div key={product.id}>
								<Gauge
									width={100}
									height={100}
									value={product.orders.reduce(
										(accum, item) => accum + item.quantity,
										0
									)}
									valueMax={getTotalSales()}
									cornerRadius={"50%"}
									sx={(theme) => ({
										[`& .${gaugeClasses.valueText}`]: {
											fontSize: 24
										},
										[`& .${gaugeClasses.valueArc}`]: {
											fill: "var(--secondary-color)"
										}
									})}
								/>
								<p>{product.name}</p>
							</div>
						))}
					</TopProductsContainer>
				</section>
				<section>
					<h1>Análise de caixa do mês</h1>
					<div>
						<BarChart
							dataset={dataset}
							xAxis={[{ scaleType: "band", dataKey: "week", label: "Semana" }]}
							yAxis={[{ label: "Caixa" }]}
							series={[
								{ dataKey: "manha", label: "Manhã" },
								{ dataKey: "tarde", label: "Tarde" },
								{ dataKey: "noite", label: "Noite" }
							]}
							grid={{ horizontal: true }}
							width={330}
							height={300}
						/>
					</div>
				</section>
			</MainContainer>
		</RootLayoutAdmin>
	)
}
