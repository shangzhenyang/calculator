import styles from "@/styles/Keyboard.module.css";
import { t } from "i18next";

interface KeyboardProps {
	calculate: () => void;
	updateFormula: (newValue: string, append?: boolean) => void;
	updateUseAnswer: (newValue: boolean) => void;
}

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
			<button
				className={styles["key"]}
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
			</button>
		);
	});

	return <div className={styles["keyboard"]}>{keyElements}</div>;
}

export default Keyboard;
