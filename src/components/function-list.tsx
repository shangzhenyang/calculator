import { handleKeyboardClick } from "@/utils";
import { JSX } from "react";
import styled from "styled-components";

const FUNCTIONS = Object.freeze([
	"0b",
	"0o",
	"0x",
	"abs()",
	"bin()",
	"cbrt()",
	"ceil()",
	"cos()",
	"cosh()",
	"cot()",
	"csc()",
	"e",
	"exp()",
	"floor()",
	"hex()",
	"log10()",
	"log2()",
	"oct()",
	"π",
	"random()",
	"round()",
	"sec()",
	"sin()",
	"sinh()",
	"sqrt()",
	"tan()",
	"tanh()",
	"(π/180)",
]);

interface FunctionListProps {
	updateFormula: (newValue: string, append?: boolean) => void;
}

const StyledContainer = styled.div`
	border-bottom: var(--border);
	border-right: var(--border);
	border-top: var(--border);
	overflow: auto;
	padding: 10px;
	scrollbar-width: thin;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: var(--fg-alpha-05);
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--fg-alpha-15);
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: var(--theme-color);
	}

	@media screen and (max-width: 768px) {
		border: none;
		height: auto;
		width: 100%;
	}
`;

const StyledListItem = styled.li`
	& > div {
		border-radius: var(--radius);
		padding: 10px 15px;
		transition:
			background-color 0.25s,
			color 0.25s;

		&:hover {
			background-color: var(--fg-alpha-2);
		}

		&:active {
			background-color: var(--theme-color);
			color: white;
		}
	}
`;

function FunctionList({ updateFormula }: FunctionListProps): JSX.Element {
	const listItems = FUNCTIONS.map((item) => {
		const handleClick = (): void => {
			const toAppend = item.replace(")", "").replace("π", "pi");
			updateFormula(toAppend, true);
			window.scrollTo(0, 0);
		};

		return (
			<StyledListItem key={item}>
				<div
					role="button"
					tabIndex={0}
					onClick={handleClick}
					onKeyDown={handleKeyboardClick(handleClick)}
				>
					{item}
				</div>
			</StyledListItem>
		);
	});

	return (
		<StyledContainer>
			<ul>{listItems}</ul>
		</StyledContainer>
	);
}

export default FunctionList;
