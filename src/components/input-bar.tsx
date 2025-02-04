import { t } from "i18next";
import { ChangeEvent, JSX, ReactNode, useId } from "react";
import styled from "styled-components";

interface InputBarProps {
	children: ReactNode;
	hasError?: boolean;
	type: "text" | "number" | "date";
	value: string;
	onChange?: (newValue: string) => void;
}

const StyledInputBar = styled.div`
	align-items: center;
	display: flex;
	margin: 15px;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
	background-color: ${({ $hasError }): string =>
		$hasError ? "var(--error-color)" : "inherit"};
	border: var(--border);
	border-radius: var(--radius);
	flex: 1;
	font-size: inherit;
	padding: 10px 15px;
	transition: border-color 0.25s;

	&:focus {
		border-color: var(--fg-alpha-8);
	}

	&:read-only {
		background-color: var(--fg-alpha-05);
		cursor: not-allowed;
	}
`;

const StyledLabel = styled.label`
	padding: 0 15px;
	width: 30%;
`;

function InputBar({
	children,
	hasError,
	type,
	value,
	onChange,
}: InputBarProps): JSX.Element {
	const id = useId();

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value);
	};

	return (
		<StyledInputBar>
			<StyledLabel htmlFor={id}>{children}</StyledLabel>
			<StyledInput
				$hasError={hasError}
				autoComplete="off"
				id={id}
				placeholder={
					onChange && type !== "date"
						? t("enterNumber").toString()
						: undefined
				}
				readOnly={!onChange}
				type={type}
				value={value}
				onChange={handleChange}
			/>
		</StyledInputBar>
	);
}

export default InputBar;
