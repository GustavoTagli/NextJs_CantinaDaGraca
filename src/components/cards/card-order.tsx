import { useOrders } from "@/hooks/useOrders"
import { OrderModel } from "@/types/order-model"
import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { ToastContainer, toast } from "react-toastify"
import styled from "styled-components"

const Card = styled.div`
	>div: first-child {
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		width: 100%;

		border: 1px solid var(--border-dark);
		border-radius: 6px;
		overflow: hidden;
	}
`

const HeaderCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 12px;
	margin-bottom: 4px;

	background-color: var(--secondary-color);

	h3,
	p,
	span {
		color: var(--primary-color);
	}

	> h3 {
		font-size: 15px;
		font-weight: 600;
	}

	p {
		font-size: 12px;
		letter-spacing: 0.5px;
	}
`
const Container = styled.div`
	padding: 0px 20px;

	> hr {
		margin: 8px 0;
		border-top: 1px dashed var(--color-dark);
	}
`

const ContainerResume = styled.div`
	>div: first-of-type {
		display: grid;
		grid-template-columns: 1fr 1fr;
		text-align: center;
		font-size: 14px;
		font-weight: 600;
		margin: 8px 0px;
		padding-right: 8px;

		> span {
			justify-self: end;
		}
	}

	> p {
		font-size: 12px;
		margin: 8px 0;
	}
`

const CardOptions = styled.div`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	align-items: center;
	margin: 0 4px;

	border: 1px solid var(--border-dark);
	border-radius: 0 0 6px 6px;
	overflow: hidden;

	> button {
		padding: 8px;
		border: none;
		outline: none;
		background-color: transparent;
	}

	> span {
		height: 100%;
		width: 1px;
		background-color: var(--border-dark);
	}
`

const columns: GridColDef[] = [
	{
		field: "quantity",
		headerName: "Qtd",
		width: 40,
		align: "center",
		filterable: false,
		sortable: false,
		hideable: false,
		resizable: false,
		disableColumnMenu: true
	},
	{
		field: "name",
		headerName: "Produto",
		type: "number",
		flex: 1,
		align: "left",
		headerAlign: "left",
		filterable: false,
		sortable: false,
		hideable: false,
		resizable: false,
		disableColumnMenu: true
	},
	{
		field: "price",
		headerName: "Preço",
		type: "number",
		filterable: false,
		sortable: false,
		hideable: false,
		resizable: false,
		disableColumnMenu: true
	}
]

export function CardOrder({ order }: { order: OrderModel }) {
	const { updateOrderStatus } = useOrders()

	const handleUpdateOrderStatus = async (status: number) => {
		let text = status === 0 ? "confirmado" : "concluído"
		let textInfinitive = status === 0 ? "confirmar" : "concluir"

		try {
			const confirm = window.confirm(
				`Deseja realmente ${textInfinitive} o pedido?`
			)
			if (!confirm) return

			const res = await updateOrderStatus(order.id, status + 1)
			toast.success(`Pedido ${text} com sucesso`, {
				position: "top-right",
				autoClose: 3000
			})
			return res
		} catch (error) {
			toast.error(`Erro ao ${textInfinitive} pedido`, {
				position: "top-right",
				autoClose: 3000
			})
			console.log(
				"🚀 ~ file: card-order.tsx ~ handleUpdateOrderStatus ~ error",
				error
			)
		}
	}

	const handleCancelOrder = async () => {
		try {
			const reason = prompt("Motivo do cancelamento:")

			if (!reason) return

			const res = await updateOrderStatus(order.id, 3, reason)
			toast.success("Pedido cancelado com sucesso", {
				position: "top-right",
				autoClose: 3000
			})
			return res
		} catch (error) {
			toast.error("Erro ao cancelar pedido", {
				position: "top-right",
				autoClose: 3000
			})
			console.log(
				"🚀 ~ file: card-order.tsx ~ handleCancelOrder ~ error",
				error
			)
		}
	}

	return (
		<Card>
			<div>
				<HeaderCard>
					<h3>
						<span>{order.id}</span> - {order.clientname}
					</h3>
					<div>
						{order.status <= 1 && <p>{formatDate(order.createdAt)}</p>}
						{order.status > 1 && (
							<>
								<p>{`início: ${formatDate(order.createdAt)}`}</p>
								<p>{`final: ${formatDate(order.updatedAt)}`}</p>
							</>
						)}
					</div>
				</HeaderCard>
				<Container>
					<div style={{ height: 130, width: "100%" }}>
						<DataGrid
							rows={order.orders.map((product) => {
								const priceMultipled = formatCurrency(
									product.price * product.quantity
								).replace("R$", "")
								return { ...product, price: priceMultipled }
							})}
							columns={columns}
							hideFooter
							disableRowSelectionOnClick
							columnHeaderHeight={32}
							getRowHeight={() => {
								return 22
							}}
							sx={{
								boxShadow: "none",
								border: "none"
							}}
						/>
					</div>
					<hr />
					<ContainerResume>
						<div>
							<p>Total</p>{" "}
							<span>
								{formatCurrency(
									order.orders.reduce(
										(accum, product) =>
											accum + product.price * product.quantity,
										0
									)
								)}
							</span>
						</div>
						{order.observation && <p>{`*Observações: ${order.observation}`}</p>}
					</ContainerResume>
				</Container>
			</div>
			{order.status === 0 && (
				<CardOptions>
					<button onClick={handleCancelOrder}>Cancelar</button>
					<span></span>
					<button onClick={() => handleUpdateOrderStatus(0)}>Confirmar</button>
				</CardOptions>
			)}
			{order.status === 1 && (
				<CardOptions>
					<button onClick={handleCancelOrder}>Cancelar</button>
					<span></span>
					<button onClick={() => handleUpdateOrderStatus(1)}>Concluir</button>
				</CardOptions>
			)}
			<ToastContainer />
		</Card>
	)
}
