export function formatDate(date: Date) {
	const dateObj = new Date(date)
	const hours = dateObj.getHours()
	const minutes = dateObj.getMinutes().toString().padStart(2, "0")
	const month = dateObj.toLocaleString("pt-br", {
		month: "long"
	})
	const day = dateObj.getDate()

	return `${hours}:${minutes} - ${day}/${month}`
}
