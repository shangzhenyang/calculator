import styles from "@/styles/FunctionList.module.css";

import type { Dispatch, SetStateAction } from "react";

interface Props {
	setFormula: Dispatch<SetStateAction<string>>;
}

function FunctionList({ setFormula }: Props) {
	const functions = [
		"abs()",
		"cbrt()",
		"ceil()",
		"cos()",
		"cosh()",
		"cot()",
		"csc()",
		"e",
		"exp()",
		"floor()",
		"log10()",
		"log2()",
		"π",
		"pow()",
		"random()",
		"round()",
		"sec()",
		"sin()",
		"sinh()",
		"sqrt()",
		"tan()",
		"tanh()",
		"(π/180)"
	];

	const listItems = functions.map((item) => {
		const handleClick = () => {
			const toAppend = item
				.replace(")", "")
				.replace("π", "pi");

			setFormula((prev) => {
				return prev + toAppend;
			});
		};

		return (
			<li
				key={item}
				role="button"
				tabIndex={0}
				onClick={handleClick}
			>{item}</li>
		);
	});

	return (
		<div className={styles["function-list"]}>
			<ul>{listItems}</ul>
		</div>
	);
}

export default FunctionList;