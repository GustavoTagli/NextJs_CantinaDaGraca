import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle
} from "@mui/material"
import { OrderCompleteDialog } from "./order-complete-dialog"
import { useOrders } from "@/hooks/useOrders"
import { useState } from "react"
import { OrderModel } from "@/types/order-model"
import { useCart } from "@/hooks/useCart"
import styled from "styled-components"
import { useProducts } from "@/hooks/useProducts"

const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 12px;

	label {
		font-size: 18px;
		font-weight: 600;
		font-family: inherit;
	}

	input {
		padding: 12px;
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 6px;
		font-size: 16px;
		font-family: inherit;
	}
`

interface UsernameDialogProps {
	open: boolean
	onClose: () => void
}

export function UsernameDialog(props: UsernameDialogProps) {
	const [order, setOrder] = useState({} as OrderModel)
	const { createOrder } = useOrders()
	const { products } = useCart()
	const { refetchProducts } = useProducts()
	const [client, setClient] = useState(() => {
		if (typeof window !== "undefined") {
			return JSON.parse(
				localStorage.getItem("info-client") || '{"name": "", "lastOrder": ""}'
			)
		} else {
			return { name: "", lastOrder: "" }
		}
	})
	const [dialogInfo, setDialogInfo] = useState({
		open: false,
		title: "",
		message: ""
	})

	const handleClose = () => {
		props.onClose()
	}

	const handleCreateOrder = async () => {
		props.onClose()
		try {
			const res = await createOrder({
				clientname: client.name,
				orderArray: products.map((p) => ({
					productId: p.id,
					quantity: p.quantity || 1
				}))
			})
			const newClient = { name: client.name, lastOrder: res.id }
			setClient(newClient)
			localStorage.setItem("info-client", JSON.stringify(newClient))
			setOrder(res)
			handleBuildAlertMessage(
				"Pedido enviado!",
				`Por favor dirija-se ao caixa, dentro do tempo determinado abaixo, para que seu pedido seja confirmado.`
			)
		} catch (error: any) {
			console.log("Error on create order: ", error)
			if (error.response?.status === 400) {
				alert("Quantidade em estoque insuficiente")
				refetchProducts()
			} else alert("Não foi possível finalizar o pedido :(")
		}
	}

	const handleBuildAlertMessage = (title: string, message: string) => {
		setDialogInfo({
			open: true,
			title,
			message
		})
	}

	return (
		<>
			<Dialog open={props.open}>
				<DialogTitle id="alert-dialog-title"></DialogTitle>
				<DialogContent>
					<FormContainer>
						<label htmlFor="name">Insira o seu nome para continuar</label>
						<input
							id="name"
							type="text"
							value={client.name}
							onChange={(e) =>
								setClient((prev: any) => ({ ...prev, name: e.target.value }))
							}
						/>
					</FormContainer>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Cancelar
					</Button>
					<Button onClick={handleCreateOrder} autoFocus>
						Continuar
					</Button>
				</DialogActions>
			</Dialog>
			<OrderCompleteDialog
				open={dialogInfo.open}
				onClose={() => setDialogInfo((prev) => ({ ...prev, open: false }))}
				title={dialogInfo.title}
				message={dialogInfo.message}
				order={order}
				setOrder={setOrder}
			/>
		</>
	)
}
