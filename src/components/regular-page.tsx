import FunctionList from "@/components/function-list";
import History from "@/components/history";
import Keyboard from "@/components/keyboard";
import MainInputBar from "@/components/main-input-bar";
import styles from "@/components/regular-page.module.css";
import globals from "@/globals";
import {
	faClockRotateLeft,
	faDeleteLeft,
	faEquals,
	faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import type { BigNumber } from "mathjs";
import type { JSX, KeyboardEvent } from "react";
import { useState } from "react";

const { math } = globals;

function RegularPage(): JSX.Element {
	const [failedFormula, setFailedFormula] = useState<string>();
	const [formula, setFormula] = useState<string>("");
	const [historyItems, setHistoryItems] = useState<string[]>([]);
	const [isHistoryShown, setIsHistoryShown] = useState<boolean>(false);
	const [shouldUseAnswer, setShouldUseAnswer] = useState<boolean>(false);

	const hasFormulaError = failedFormula === formula;

	const backspace = (): void => {
		setFormula((prevFormula) => prevFormula.trim().slice(0, -1).trim());
	};

	const calculate = (): void => {
		const formulaParts = formula.split("=");
		const index = shouldUseAnswer ? formulaParts.length - 1 : 0;
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
			const result = math.evaluate(formulaProcessed) as BigNumber;
			if (typeof result === "function") {
				throw new Error("NaN");
			}
			const formulaWithResult =
				formulaProcessed + " = " + result.toString();
			setFormula(formulaWithResult);
			setHistoryItems((prevHistoryItems) => [
				formulaWithResult,
				...prevHistoryItems,
			]);
		} catch {
			setFailedFormula(formula);
		}
	};

	const handleFormulaChange = (newValue: string): void => {
		setFormula(newValue);
	};

	const handleFormulaKeyDown = (
		event: KeyboardEvent<HTMLInputElement>,
	): void => {
		if (event.key === "Escape") {
			setFormula("");
		}
		setShouldUseAnswer(false);
	};

	const handleFormulaSubmit = (): void => {
		calculate();
		setShouldUseAnswer(false);
	};

	const toggleHistory = (): void => {
		setIsHistoryShown((prevIsHistoryShown) => !prevIsHistoryShown);
	};

	const updateFormula = (newValue: string, append = false): void => {
		if (append) {
			setFormula(formula + newValue);
		} else {
			setFormula(newValue);
		}
	};

	const updateHistoryItems = (
		callback: (value: string[]) => string[],
	): void => {
		setHistoryItems(callback);
	};

	const updateShouldUseAnswer = (newValue: boolean): void => {
		setShouldUseAnswer(newValue);
	};

	return (
		<main className={styles["main"]}>
			<MainInputBar
				hasError={hasFormulaError}
				placeholder="enterFormula"
				value={formula}
				onChange={handleFormulaChange}
				onSubmit={handleFormulaSubmit}
				onKeyDown={handleFormulaKeyDown}
			>
				{isHistoryShown && (
					<>
						<button
							title={t("equal").toString()}
							type="submit"
						>
							<FontAwesomeIcon
								icon={faEquals}
								fixedWidth
							/>
						</button>
						<button
							title={t("keyboard").toString()}
							type="button"
							onClick={toggleHistory}
						>
							<FontAwesomeIcon
								icon={faKeyboard}
								fixedWidth
							/>
						</button>
					</>
				)}
				{!isHistoryShown && (
					<>
						<button
							title={t("backspace").toString()}
							type="button"
							onClick={backspace}
						>
							<FontAwesomeIcon
								icon={faDeleteLeft}
								fixedWidth
							/>
						</button>
						<button
							title={t("history").toString()}
							type="button"
							onClick={toggleHistory}
						>
							<FontAwesomeIcon
								icon={faClockRotateLeft}
								fixedWidth
							/>
						</button>
					</>
				)}
			</MainInputBar>
			{isHistoryShown && (
				<div>
					<History
						historyItems={historyItems}
						shouldShowClearButton
						updateHistoryItems={updateHistoryItems}
						updateInputValue={updateFormula}
					/>
				</div>
			)}
			{!isHistoryShown && (
				<div className={styles["keyboard-area"]}>
					<FunctionList updateFormula={updateFormula} />
					<Keyboard
						calculate={calculate}
						updateFormula={updateFormula}
						updateShouldUseAnswer={updateShouldUseAnswer}
					/>
				</div>
			)}
		</main>
	);
}

export default RegularPage;
