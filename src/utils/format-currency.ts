export const formatCurrency = (value: number): string => {
	const formattedValue = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: 2
	}).format(value)

	return formattedValue
}
