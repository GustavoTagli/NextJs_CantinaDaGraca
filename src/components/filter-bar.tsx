import { useDataBase } from "@/hooks/useDataBase"
import { FilterBy } from "./filter-by"
import styled from "styled-components"

const FilterContainer = styled.div`
	margin-top: 12px;

	display: flex;
	gap: 12px;

	> select {
		flex: 1;

		cursor: pointer;
		outline: none;
		border: none;
		border-radius: 24px;
		height: 28px;
		padding-left: 12px;

		color: var(--text-dark);
		font-family: inherit;
		font-size: 12px;
	}
`

export function FilterBar() {
	const { categories } = useDataBase()

	return (
		<FilterContainer>
			<FilterBy title="Categoria" options={categories} />
			<FilterBy
				title="Ordenar"
				options={[
					{ id: "1", name: "Mais vendidos" },
					{ id: "2", name: "Menor - maior preço" },
					{ id: "3", name: "Maior - menor preço" },
					{ id: "4", name: "Mais recentes" }
				]}
			/>
		</FilterContainer>
	)
}
