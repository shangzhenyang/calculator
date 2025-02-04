import { t } from "i18next";
import { JSX } from "react";
import styled from "styled-components";

interface KeyboardProps {
	calculate: () => void;
	updateFormula: (newValue: string, append?: boolean) => void;
	updateUseAnswer: (newValue: boolean) => void;
}

const StyledButton = styled.button`
	border-bottom: var(--border);
	font-size: 1.5rem;
	line-height: 30px;
	padding: 25px;

	@media screen and (max-width: 768px) {
		font-size: 1.25rem;
		padding: 15px;
	}
`;

const StyledKeyboard = styled.div`
	border-top: var(--border);
	display: grid;
	flex: 1;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(5, 1fr);
	width: 100%;

	@media screen and (max-width: 768px) {
		border-top: none;
	}
`;

function Keyboard({
	calculate,
	updateFormula,
	updateUseAnswer,
}: KeyboardProps): JSX.Element {
	const clickMap = {
		"=": (): void => {
			calculate();
		},
		"C": (): void => {
			updateFormula("", false);
		},
	};

	const labelMap = {
		".": "decimalPoint",
		"-": "subtract",
		"C": "clear",
		"∧": "exponent",
	};

	const replaceMap = {
		"×": "*",
		"÷": "/",
		"∧": "^",
	};

	const keys = [
		"C",
		"(",
		")",
		"÷",
		"7",
		"8",
		"9",
		"×",
		"4",
		"5",
		"6",
		"-",
		"1",
		"2",
		"3",
		"+",
		"0",
		".",
		"∧",
		"=",
	];

	const keyElements = keys.map((key) => {
		const handleClick = (): void => {
			if (key in clickMap) {
				clickMap[key as keyof typeof clickMap]();
			} else {
				if (key in replaceMap) {
					key = replaceMap[key as keyof typeof replaceMap];
				}
				updateFormula(key, true);
				updateUseAnswer(true);
			}
		};

		return (
			<StyledButton
				key={key}
				type="button"
				aria-label={
					key in labelMap
						? t(labelMap[key as keyof typeof labelMap]).toString()
						: undefined
				}
				onClick={handleClick}
			>
				{key}
			</StyledButton>
		);
	});

	return <StyledKeyboard>{keyElements}</StyledKeyboard>;
}

export default Keyboard;
