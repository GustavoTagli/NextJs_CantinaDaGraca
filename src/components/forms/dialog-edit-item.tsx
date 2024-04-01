import { ProductModel } from "@/types/products-model"
import { Button, Dialog, DialogActions } from "@mui/material"
import { ProductForm } from "./product-form"
import { CategoryModel } from "@/types/category-model"
import { CategoryForm } from "./category-form"

interface DialogEditProductProps {
	open: boolean
	setOpen: (open: boolean) => void
	product?: ProductModel
	category?: CategoryModel
}

export function DialogEditItem({
	open,
	setOpen,
	product,
	category
}: DialogEditProductProps) {
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			{product && <ProductForm product={product} handleclose={handleClose} />}
			{category && (
				<CategoryForm category={category} handleclose={handleClose} />
			)}
			<DialogActions>
				<Button onClick={handleClose}>Cancelar</Button>
			</DialogActions>
		</Dialog>
	)
}
