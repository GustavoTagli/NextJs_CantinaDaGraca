import { FilterContextProvider } from "@/contexts/filter-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { ThemeProvider } from "styled-components"

interface DefaultProvidersProps {
	children: ReactNode
}

const theme = {
	desktopBreakpoint: "1024px",
	tabletBreakpoint: "768px",
	smallMobileBreakpoint: "320px",
	mediumMobileBreakpoint: "375px",
	largeMobileBreakpoint: "425px"
}

export function DefaultProviders({ children }: DefaultProvidersProps) {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	})

	return (
		<QueryClientProvider client={client}>
			<FilterContextProvider>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</FilterContextProvider>
		</QueryClientProvider>
	)
}