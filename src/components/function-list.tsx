import styles from "@/components/function-list.module.css";
import { handleKeyboardClick } from "@/utils";
import type { JSX } from "react";

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

function FunctionList({ updateFormula }: FunctionListProps): JSX.Element {
	const listItems = FUNCTIONS.map((item) => {
		const handleClick = (): void => {
			const toAppend = item.replace(")", "").replace("π", "pi");
			updateFormula(toAppend, true);
			window.scrollTo(0, 0);
		};

		return (
			<li key={item}>
				<div
					className={styles["item"]}
					role="button"
					tabIndex={0}
					onClick={handleClick}
					onKeyDown={handleKeyboardClick(handleClick)}
				>
					{item}
				</div>
			</li>
		);
	});

	return (
		<div className={styles["container"]}>
			<ul>{listItems}</ul>
		</div>
	);
}

export default FunctionList;
