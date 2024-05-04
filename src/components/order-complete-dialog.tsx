import { useOrders } from "@/hooks/useOrders"
import { OrderModel } from "@/types/order-model"
import formatTime from "@/utils/format-time"
import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from "@mui/material"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { io } from "socket.io-client"
import styled from "styled-components"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import { useCart } from "@/hooks/useCart"

const ProgressContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	margin-top: 24px;

	> div:first-of-type {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		>span: first-of-type {
			font-size: 20px;
			font-weight: 600;
			font-family: inherit;
		}

		> p {
			font-size: 14px;
			font-family: inherit;
		}
	}
`

const SuccessContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 12px;

	> svg {
		width: 64px;
		height: 64px;
		color: #26912b;
	}

	> p {
		padding: 0 24px;
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		font-family: inherit;
	}
`

interface AlertDialogProps {
	open: boolean
	onClose: () => void
	title: string
	message: string
	order: OrderModel
	setOrder: (order: OrderModel) => void
}

const expiringTime = 10 * 60

export function OrderCompleteDialog({
	open,
	onClose,
	title,
	message,
	order,
	setOrder
}: AlertDialogProps) {
	const [progress, setProgress] = useState(100)
	const { deleteOrder, refetchOrders } = useOrders()
	const { setProducts, updateLocalStorage } = useCart()

	useEffect(() => {
		if (!open) {
			setProgress(100)
			return
		}

		const socket = io(process.env.NEXT_PUBLIC_API_URL as string)

		let deletionHandled = false

		const handleDeleteOrder = async () => {
			if (!deletionHandled) {
				await deleteOrder(order.id)
				deletionHandled = true
				toast.info("Pedido cancelado", {
					position: "top-right",
					autoClose: 2000
				})
			}
		}

		const time = setInterval(() => {
			socket.on("ordersUpdated", (newOrder: OrderModel) => {
				if (newOrder.id === newOrder.id && newOrder.status === 1) {
					setOrder(newOrder)
					handleCleanCart()
					refetchOrders()
					clearInterval(time)
					return
				}
			})
			setProgress((prev) => {
				if (prev <= 0) {
					handleDeleteOrder()
					clearInterval(time)
					return 0
				}
				return prev - 100 / expiringTime
			})
		}, 1000)

		return () => {
			clearInterval(time)
		}
	}, [open])

	const handleClose = () => {
		onClose()
	}

	const handleCleanCart = () => {
		setProducts([])
		updateLocalStorage([])
	}

	return (
		<>
			<Dialog
				open={open}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					{order.status === 0 && (
						<>
							<DialogContentText id="alert-dialog-description">
								{message}
							</DialogContentText>
							<ProgressContainer>
								<div>
									<span>{`#${order.id}`}</span>
									<p>
										{progress > 0
											? formatTime((progress * expiringTime) / 100)
											: "00:00"}
									</p>
								</div>

								<CircularProgress
									variant="determinate"
									value={progress}
									size={100}
									sx={{
										color: (theme) => theme.palette.primary["dark"]
									}}
									thickness={2}
								/>
							</ProgressContainer>
						</>
					)}
					{order.status === 1 && (
						<SuccessContainer>
							<CheckCircleOutlinedIcon />
							<p>Pedido confirmado e em preparo!</p>
						</SuccessContainer>
					)}
				</DialogContent>
				<DialogActions>
					{order.status === 0 && (
						<Button onClick={handleClose} autoFocus>
							Cancelar
						</Button>
					)}
					<Button
						onClick={handleClose}
						autoFocus
						disabled={order.status === 0 ? true : false}
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
			<ToastContainer />
		</>
	)
}
