"use client"

import * as React from "react"
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import { useProducts } from "@/hooks/useProducts"
import styled from "styled-components"
import { useCategories } from "@/hooks/useCategories"
import { ProductModel } from "@/types/products-model"
import { ToastContainer, toast } from "react-toastify"
import { io } from "socket.io-client"

const Container = styled.div`
	width: 100%;
	height: 400px;
`

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL as string

export default function TableStock() {
	const { data, updateProduct, refetchProducts } = useProducts()
	const { data: categories } = useCategories()

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Produto",
			width: 140
		},
		{
			field: "quantityInStock",
			headerName: "Estoque",
			type: "number",
			editable: true,
			width: 120
		},
		{
			field: "price",
			headerName: "Preço",
			type: "number",
			editable: true,
			width: 120
		},
		{
			field: "category",
			headerName: "Categoria",
			width: 140,
			valueGetter: (value, row) => {
				const category = categories?.find(
					(category) => category.id === row.categoryId
				)
				return category?.name
			}
		}
	]

	React.useEffect(() => {
		const socket = io(SOCKET_URL)

		socket.on("ordersUpdated", () => {
			refetchProducts()
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const processRowUpdate = async (
		newRow: GridRowModel,
		oldRow: GridRowModel
	) => {
		const product = newRow as ProductModel
		const oldProduct = oldRow as ProductModel

		if (
			product.quantityInStock === oldProduct.quantityInStock &&
			product.price === oldProduct.price
		)
			return oldRow

		const socket = io(SOCKET_URL)

		socket.emit("productsUpdated")

		socket.disconnect()

		const res = await updateProduct(product.id, product)
		toast.success("Produto atualizado com sucesso", {
			position: "top-right",
			autoClose: 2000
		})
		return res
	}

	const handleProcessRowUpdateError = React.useCallback((error: Error) => {
		console.error(error)
		toast.error("Erro ao atualizar produto", {
			position: "top-right"
		})
	}, [])

	if (!data) return null

	return (
		<Container>
			<DataGrid
				rows={data}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 }
					}
				}}
				pageSizeOptions={[10, 20]}
				processRowUpdate={processRowUpdate}
				onProcessRowUpdateError={handleProcessRowUpdateError}
			/>
			<ToastContainer />
		</Container>
	)
}
