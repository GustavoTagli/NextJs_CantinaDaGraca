import { useDataBase } from "@/hooks/useDataBase"
import { FilterBy } from "./filter-by"
import styled from "styled-components"

const FilterContainer = styled.div`
	margin-top: 12px;

	display: flex;
	gap: 12px;
	width: 100%;

	> select {
		flex: 1;

		cursor: pointer;
		outline: none;
		border: none;
		border-radius: 24px;
		height: 28px;

		color: var(--text-dark);
		font-family: inherit;
		font-size: 12px;

		@media (min-width: ${(props) => props.theme.mediumMobileBreakpoint}) {
			height: 36px;
			padding-left: 12px;

			font-size: 14px;
		}
	}
`

export function FilterBar() {
	// const { categories } = useDataBase()

	return (
		<FilterContainer>
			{/* <FilterBy title="Categoria" options={} /> */}
			<FilterBy
				title="Ordenar"
				options={[
					{ id: "1", name: "Mais vendidos" },
					{ id: "2", name: "Preço: Maior - menor" },
					{ id: "3", name: "Preço: Menor - maior" },
					{ id: "4", name: "Mais recentes" }
				]}
			/>
		</FilterContainer>
	)
}
