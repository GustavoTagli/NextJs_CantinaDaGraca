import { PriorityTypes } from "@/types/priority-types"

export const getFieldPriority = (priority: PriorityTypes) => {
	if (priority === PriorityTypes.NEWS)
		return { field: "createdAt", order: "desc" }
	if (priority === PriorityTypes.BIGGEST_PRICE)
		return { field: "price", order: "desc" }
	if (priority === PriorityTypes.MINOR_PRICE)
		return { field: "price", order: "asc" }

	return { field: "createdAt", order: "desc" }
}
