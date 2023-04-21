import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { create, all } from "mathjs";

import FunctionList from "@/components/FunctionList";
import Keyboard from "@/components/Keyboard";

import styles from "@/styles/Regular.module.css";

import type { ChangeEvent, KeyboardEvent } from "react";

function Regular() {
	const [formula, setFormula] = useState<string>("");
	const [useAnswer, setUseAnswer] = useState<boolean>(false);

	const math = create(all, {
		number: "BigNumber",
		precision: 16
	});

	const backspace = () => {
		setFormula((prevFormula) => {
			return prevFormula
				.trim()
				.slice(0, -1)
				.trim();
		});
	};

	const calculate = () => {
		const formulaParts = formula.split("=");
		const index = useAnswer ? formulaParts.length - 1 : 0;
		const formulaProcessed = formulaParts[index]
			.replaceAll("×", "*")
			.replaceAll("÷", "/")
			.replaceAll("π", "pi")
			.trim()
			.toLowerCase();
		if (!formulaProcessed) {
			return;
		}
		setFormula(formulaProcessed + " = " + math.evaluate(formulaProcessed));
	};

	const handleFormulaChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setFormula(evt.target.value);
	};

	const handleFormulaKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
		switch (evt.key) {
			case "Enter":
				calculate();
				break;
			case "Escape":
				setFormula("");
				break;
			default:
				break;
		}
		setUseAnswer(false);
	};

	return (
		<main className={styles["regular"]}>
			<div className={styles["input-bar"]}>
				<input
					className={styles["formula-input"]}
					placeholder={t("enterFormula").toString()}
					value={formula}
					onChange={handleFormulaChange}
					onKeyDown={handleFormulaKeyDown}
				/>
				<button
					title={t("backspace").toString()}
					onClick={backspace}
				>
					<FontAwesomeIcon icon={faDeleteLeft} size="xl" />
				</button>
			</div>
			<div className={styles["keyboard-area"]}>
				<FunctionList setFormula={setFormula} />
				<Keyboard
					calculate={calculate}
					setFormula={setFormula}
					setUseAnswer={setUseAnswer}
				/>
			</div>
		</main>
	);
}

export default Regular;
