import styles from "@/styles/FunctionList.module.css";

interface Props {
	updateFormula: (newValue: string, append?: boolean) => void;
}

function FunctionList({ updateFormula }: Props) {
	const functions = [
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
		"(π/180)"
	];

	const listItems = functions.map((item) => {
		const handleClick = () => {
			const toAppend = item
				.replace(")", "")
				.replace("π", "pi");
			updateFormula(toAppend, true);
			window.scrollTo(0, 0);
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
