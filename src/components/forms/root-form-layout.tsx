import styled from "styled-components"

interface RootFormLayoutProps {
	children: React.ReactNode
}

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 12px;
	padding: 24px;
	margin-bottom: 24px;
	min-width: 320px;

	border-radius: 6px;
	border: 1px solid var(--border-dark);

	background-color: var(--primary-color);

	> h1 {
		align-self: flex-start;
		margin-bottom: 12px;
		font-size: 20px;
		color: var(--secondary-color);
	}

	> button {
		margin-top: 12px;
		padding: 8px 12px;
		border-radius: 6px;
		border: none;
		outline: none;
		cursor: pointer;
		background-color: var(--secondary-color);
		color: var(--primary-color);
		font-size: 16px;
		width: 60%;
	}

	.flex {
		flex: 1 1 50%;
	}
`

export const FileInput = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	cursor: pointer;

	width: 100%;
	padding: 6px 12px;
	border-radius: 6px;
	border: 1px solid var(--border-dark);
	outline: none;

	background-color: var(--primary-color);
	color: var(--color-dark);
	font-size: 14px;
	font-family: inherit;

	svg {
		width: 24px;
		height: 24px;
		color: var(--color-gray);
	}
`

export const InputsGroup = styled.div`
	width: 100%;
	display: flex;
	gap: 12px;
`

export const InputLabelContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;

	> label {
		font-size: 16px;
		color: var(--color-dark);
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 6px 12px;
		border-radius: 6px;
		border: 1px solid var(--border-dark);
		outline: none;

		background-color: var(--primary-color);
		color: var(--color-dark);
		font-size: 14px;
		font-family: inherit;
	}

	div {
		&[id="price-container"] {
			position: relative;
			> span {
				font-size: 14px;
				position: absolute;
				left: 8px;
				top: 50%;
				transform: translateY(-50%);
				color: var(--color-gray);
			}

			> input {
				text-align: right;
			}
		}
	}
`

export function RootFormLayout({ children }: RootFormLayoutProps) {
	return <FormContainer>{children}</FormContainer>
}
