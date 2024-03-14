export default function ProductsOfCategory({
	searchParams
}: {
	searchParams: { productId: string }
}) {
	console.log(searchParams)
	return (
		<div>
			<h1>Produtos da categoria</h1>
		</div>
	)
}
