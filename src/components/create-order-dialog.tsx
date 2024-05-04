import { useProducts } from "@/hooks/useProducts"
import { OrderModelPost, ProductOrderModelPost } from "@/types/order-model"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material"
import { useState } from "react"
import { CardProductInCart } from "./cards/card-product-in-cart"
import styled from "styled-components"
import { PrimaryInputWSearchIcon } from "./primary-input"
import { useFilter } from "@/hooks/useFilter"
import { useOrders } from "@/hooks/useOrders"
import { ToastContainer, toast } from "react-toastify"

interface CreateOrderDialogProps {
	open: boolean
	onClose: () => void
}

const CreateOrderForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 24px;

	> div {
		display: flex;
		flex-direction: column;
		gap: 12px;

		> label,
		h3 {
			font-size: 18px;
			font-weight: 500;
			margin: 0;
		}
	}

	input[type="text"] {
		width: 100%;
		padding: 6px 8px;
		font-size: 16px;
		outline: none;
		border: 1px solid var(--color-gray);
		border-radius: 6px;
	}
`

const ProductsContainer = styled.div`
	height: 40vh;
	overflow-y: auto;
`

const CheckboxContainer = styled.div`
	display: flex;

	> label {
		width: 100%;
		margin-left: 8px;
	}
`

const OrderSummarize = styled.div`
	display: flex;
	gap: 12px;

	span {
		font-weight: 500;
	}
`

export function CreateOrderDialog({ open, onClose }: CreateOrderDialogProps) {
	const [order, setOrder] = useState<ProductOrderModelPost[]>([])
	const [clientname, setClientName] = useState("")
	const { setSearch } = useFilter()
	const [valueSearch, setValueSearch] = useState("")
	const { data } = useProducts()
	const { createOrder } = useOrders()

	const handleSelectProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
		const productId = event.target.id

		if (event.target.checked) {
			setOrder((prev: ProductOrderModelPost[]) => [
				...prev,
				{
					productId: productId,
					quantity: 1
				}
			])
		} else {
			setOrder((prev) => prev.filter((item) => item.productId !== productId))
		}
	}

	const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValueSearch(event.target.value)
		setSearch(event.target.value)
	}

	const handleCreateOrder = async () => {
		if (clientname === "" || order.length === 0) {
			toast.error("Preencha todos os campos", {
				position: "top-right",
				autoClose: 2000
			})
			return
		}

		const orderData: OrderModelPost = {
			clientname: clientname,
			orderArray: order,
			status: 1
		}

		try {
			await createOrder(orderData)
			toast.success("Pedido em andamento", {
				position: "top-right",
				autoClose: 2000
			})
		} catch (error) {
			toast.error("Erro ao criar pedido", {
				position: "top-right",
				autoClose: 2000
			})
		}

		onClose()
		setClientName("")
		setOrder([])
		setSearch("")
		setValueSearch("")
	}

	const calculateTotalPrice = () => {
		const total = order.reduce((acc, item) => {
			const product = data?.find((product) => product.id === item.productId)
			if (product) {
				return acc + product.price * item.quantity
			}
			return acc
		}, 0)

		return total.toFixed(2).replace(".", ",")
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={onClose}
				sx={{
					".MuiDialog-paper": {
						width: "100%",
						maxWidth: "600px"
					}
				}}
			>
				<DialogTitle>Adicionar pedido</DialogTitle>
				<DialogContent>
					<CreateOrderForm>
						<div>
							<label htmlFor="name">Nome do cliente</label>
							<input
								type="text"
								id="name"
								value={clientname}
								onChange={(ev) => setClientName(ev.target.value)}
							/>
						</div>
						<div>
							<h3>Selecionar produtos</h3>
							<PrimaryInputWSearchIcon
								value={valueSearch}
								onChange={handleChangeSearch}
								placeholder="Coxinha, Esfiha, Suco de laranha..."
							/>
							<OrderSummarize>
								<p>
									Items: <span>{order.length}</span>
								</p>
								<p>
									Total: <span>{calculateTotalPrice()}</span>
								</p>
							</OrderSummarize>
							<ProductsContainer>
								{data
									?.filter((product) => product.quantityInStock > 0)
									.map((product) => (
										<CheckboxContainer key={product.id}>
											<input
												type="checkbox"
												id={product.id}
												onChange={handleSelectProduct}
											/>
											<label htmlFor={product.id}>
												<CardProductInCart
													{...product}
													dialog={true}
													selected={
														order.find((item) => item.productId === product.id)
															? true
															: false
													}
													qty={
														order.find((item) => item.productId === product.id)
															?.quantity
													}
													setQuantity={(qty) => {
														setOrder((prev) =>
															prev.map((item) =>
																item.productId === product.id
																	? { ...item, quantity: qty }
																	: item
															)
														)
													}}
												/>
											</label>
										</CheckboxContainer>
									))}
							</ProductsContainer>
						</div>
					</CreateOrderForm>
					<DialogActions>
						<Button
							onClick={onClose}
							sx={{
								color: (theme) => theme.palette.grey[800]
							}}
						>
							Cancelar
						</Button>
						<Button onClick={handleCreateOrder}>Criar</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
			<ToastContainer />
		</>
	)
}
