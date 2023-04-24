import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import FunctionList from "@/components/FunctionList";
import Keyboard from "@/components/Keyboard";
import MainInputBar from "@/components/MainInputBar";

import styles from "@/styles/Regular.module.css";

import type { KeyboardEvent } from "react";
import type PageProps from "@/types/PageProps";

function Regular({ math }: PageProps) {
	const [formula, setFormula] = useState<string>("");
	const [formulaHasError, setFormulaHasError] = useState<boolean>(false);
	const [useAnswer, setUseAnswer] = useState<boolean>(false);

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
		try {
			const result = math.evaluate(formulaProcessed);
			if (result.isNaN()) {
				throw new Error("NaN");
			}
			setFormula(formulaProcessed + " = " + result);
		} catch {
			setFormulaHasError(true);
		}
	};

	const handleFormulaChange = (newValue: string) => {
		setFormula(newValue);
		setFormulaHasError(false);
	};

	const handleFormulaKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
		if (evt.key === "Escape") {
			setFormula("");
		}
		setUseAnswer(false);
	};

	const handleFormulaSubmit = () => {
		calculate();
		setUseAnswer(false);
	};

	return (
		<main className={styles["regular"]}>
			<MainInputBar
				className={styles["formula-input"]}
				hasError={formulaHasError}
				placeholder="enterFormula"
				value={formula}
				onChange={handleFormulaChange}
				onSubmit={handleFormulaSubmit}
				onKeyDown={handleFormulaKeyDown}
			>
				<button
					title={t("backspace").toString()}
					type="button"
					onClick={backspace}
				>
					<FontAwesomeIcon icon={faDeleteLeft} size="xl" />
				</button>
			</MainInputBar>
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
