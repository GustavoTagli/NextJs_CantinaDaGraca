"use client"

import { PrimaryInputWSearchIcon } from "@/components/primary-input"
import RootLayoutAdmin from "../root-layout-admin"
import { styled } from "@mui/material/styles"
import { Tabs, Tab, TabsProps } from "@mui/material"
import { useEffect, useState } from "react"
import { CardOrder } from "@/components/cards/card-order"
import { useOrders } from "@/hooks/useOrders"
import io from "socket.io-client"
import { useFilter } from "@/hooks/useFilter"
import { EmptyOrders } from "@/components/empty-orders"

const MainContainer = styled("main")({
	display: "flex",
	flexDirection: "column",
	gap: "12px",
	padding: "24px",
	paddingBottom: "80px",
	minHeight: "100%",

	"& > div: first-of-type": {
		display: "flex",
		flexDirection: "column",
		gap: "4px",

		"& > h1": {
			margin: 0,
			fontSize: "24px"
		},

		"& > p": {
			fontSize: "16px",
			fontWeight: 600,

			"& > span": {
				marginLeft: "4px"
			}
		}
	},

	"> section": {
		marginTop: "12px",
		display: "flex",
		flexDirection: "column",
		gap: "24px"
	}
})

const ListCards = styled("div")({
	display: "flex",
	flexDirection: "column",
	gap: "12px"
})

interface StyledTabsProps extends TabsProps {
	children?: React.ReactNode
	value: number
	onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const StyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} />)({
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "var(--secondary-color)"
	}
})

interface StyledTabProps {
	label: string
}

const StyledTab = styled((props: StyledTabProps) => (
	<Tab disableRipple {...props} />
))(({ theme }) => ({
	textTransform: "none",
	fontWeight: "600",
	fontSize: theme.typography.pxToRem(16),
	fontFamily: "inherit",
	color: "var(--color-dark)",
	"&.Mui-selected": {
		color: "var(--secondary-color)"
	}
}))

const URL_SOCKET = process.env.NEXT_PUBLIC_API_URL as string

export default function Orders() {
	const [value, setValue] = useState(0)
	const { data, refetchOrders, deleteOrder } = useOrders()
	const { setSearch } = useFilter()
	const [valueSearch, setValueSearch] = useState("")

	useEffect(() => {
		const socket = io(URL_SOCKET)

		socket.on("ordersUpdated", () => {
			refetchOrders()
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValueSearch(event.target.value)
		setSearch(event.target.value)
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<RootLayoutAdmin pagename="Pedidos">
			<MainContainer>
				<div>
					<h1>Fila de pedidos</h1>
					<p>
						Total:
						<span>{data?.length}</span>
					</p>
				</div>
				<PrimaryInputWSearchIcon
					value={valueSearch}
					onChange={handleChangeInput}
					placeholder="Nome do cliente ou n° do pedido"
				/>
				<section>
					<StyledTabs
						value={value}
						onChange={handleChange}
						variant="scrollable"
						scrollButtons="auto"
					>
						<StyledTab label="Novos" />
						<StyledTab label="Em andamento" />
						<StyledTab label="Concluídos" />
						<StyledTab label="Cancelados" />
					</StyledTabs>
					<ListCards>
						{value === 0 &&
							data
								?.filter((order) => order.status === 0)
								.map((order) => (
									<CardOrder key={order.id} order={order || []} />
								))}
						{value === 0 &&
							data?.filter((order) => order.status === 0).length === 0 && (
								<EmptyOrders />
							)}

						{value === 1 &&
							data
								?.filter((order) => order.status === 1)
								.map((order) => (
									<CardOrder key={order.id} order={order || []} />
								))}
						{value === 1 &&
							data?.filter((order) => order.status === 1).length === 0 && (
								<EmptyOrders />
							)}

						{value === 2 &&
							data
								?.filter((order) => order.status === 2)
								.map((order) => (
									<CardOrder key={order.id} order={order || []} />
								))}
						{value === 2 &&
							data?.filter((order) => order.status === 2).length === 0 && (
								<EmptyOrders />
							)}

						{value === 3 &&
							data
								?.filter((order) => order.status === 3)
								.map((order) => (
									<CardOrder key={order.id} order={order || []} />
								))}
						{value === 3 &&
							data?.filter((order) => order.status === 3).length === 0 && (
								<EmptyOrders />
							)}
					</ListCards>
				</section>
			</MainContainer>
		</RootLayoutAdmin>
	)
}
