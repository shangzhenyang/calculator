import styles from "@/styles/Keyboard.module.css";

import type { Dispatch, SetStateAction } from "react";

interface Props {
	calculate: () => void;
	setFormula: Dispatch<SetStateAction<string>>;
	setUseAnswer: Dispatch<SetStateAction<boolean>>;
}

function Keyboard({ calculate, setFormula, setUseAnswer }: Props) {
	const clickMap = {
		"C": () => {
			setFormula("");
		},
		"=": () => {
			calculate();
		}
	};

	const keys = [
		"C", "(", ")", "÷",
		"7", "8", "9", "×",
		"4", "5", "6", "-",
		"1", "2", "3", "+",
		"0", ".", ",", "="
	];

	const keyElements = keys.map((key) => {
		const handleClick = () => {
			if (key in clickMap) {
				clickMap[key as keyof typeof clickMap]();
			} else {
				setFormula((prev) => {
					return prev + key;
				});
				setUseAnswer(true);
			}
		};

		return (
			<button
				className={styles["key"]}
				key={key}
				onClick={handleClick}
			>{key}</button>
		);
	});

	return (
		<div className={styles["keyboard"]}>{keyElements}</div>
	);
}

export default Keyboard;
