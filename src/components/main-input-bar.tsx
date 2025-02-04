import { t } from "i18next";
import {
	ChangeEvent,
	FormEvent,
	JSX,
	KeyboardEventHandler,
	ReactNode,
} from "react";
import styled from "styled-components";

interface MainInputBarProps {
	children: ReactNode;
	hasError: boolean;
	list?: string;
	placeholder: string;
	value: string;
	onChange: (newValue: string) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
	onSubmit?: () => void;
}

const StyledForm = styled.form`
	border-bottom: var(--border);
	display: flex;

	> * {
		font-size: 1.5rem;
		padding: 20px 25px;

		@media screen and (max-width: 768px) {
			font-size: 1.25rem;
			padding: 15px 20px;
		}
	}

	& > button {
		align-items: center;
		border-left: var(--border);
		display: flex;
		gap: 10px;
		white-space: nowrap;
	}

	& > div {
		align-items: center;
		border-left: var(--border);
		display: flex;
	}
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
	display: block;
	width: 100%;
	background-color: ${({ $hasError }): string =>
		$hasError ? "var(--error-color)" : "inherit"};

	&:only-child {
		border-right: none;
	}
`;

function MainInputBar({
	children,
	hasError,
	list,
	placeholder,
	value,
	onChange,
	onKeyDown,
	onSubmit,
}: MainInputBarProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onSubmit?.();
	};

	return (
		<StyledForm onSubmit={handleSubmit}>
			<StyledInput
				$hasError={hasError}
				autoComplete="off"
				list={list}
				placeholder={t(placeholder).toString()}
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={onKeyDown}
			/>
			{children}
		</StyledForm>
	);
}

export default MainInputBar;
