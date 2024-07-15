import FunctionList from "@/components/FunctionList";
import History from "@/components/History";
import Keyboard from "@/components/Keyboard";
import MainInputBar from "@/components/MainInputBar";
import styles from "@/styles/Regular.module.css";
import { PageProps } from "@/types";
import {
	faClockRotateLeft,
	faDeleteLeft,
	faEquals,
	faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { BigNumber } from "mathjs";
import { KeyboardEvent, useEffect, useState } from "react";

function Regular({ math }: PageProps): JSX.Element {
	const [formula, setFormula] = useState<string>("");
	const [formulaHasError, setFormulaHasError] = useState<boolean>(false);
	const [historyItems, setHistoryItems] = useState<string[]>([]);
	const [showHistory, setShowHistory] = useState<boolean>(false);
	const [useAnswer, setUseAnswer] = useState<boolean>(false);

	const backspace = (): void => {
		setFormula((prevFormula) => {
			return prevFormula.trim().slice(0, -1).trim();
		});
	};

	const calculate = (): void => {
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
			const result = math.evaluate(formulaProcessed) as BigNumber;
			if (typeof result === "function") {
				throw new Error("NaN");
			}
			const formulaWithResult =
				formulaProcessed + " = " + result.toString();
			setFormula(formulaWithResult);
			setHistoryItems((prevHistoryItems) => {
				return [formulaWithResult, ...prevHistoryItems];
			});
		} catch {
			setFormulaHasError(true);
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
		setUseAnswer(false);
	};

	const handleFormulaSubmit = (): void => {
		calculate();
		setUseAnswer(false);
	};

	const toggleHistory = (): void => {
		setShowHistory((prevShowHistory) => {
			return !prevShowHistory;
		});
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

	const updateUseAnswer = (newValue: boolean): void => {
		setUseAnswer(newValue);
	};

	useEffect(() => {
		setFormulaHasError(false);
	}, [formula]);

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
				{showHistory && (
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
				{!showHistory && (
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
			{showHistory && (
				<div>
					<History
						historyItems={historyItems}
						showClearButton={true}
						updateHistoryItems={updateHistoryItems}
						updateInputValue={updateFormula}
					/>
				</div>
			)}
			{!showHistory && (
				<div className={styles["keyboard-area"]}>
					<FunctionList updateFormula={updateFormula} />
					<Keyboard
						calculate={calculate}
						updateFormula={updateFormula}
						updateUseAnswer={updateUseAnswer}
					/>
				</div>
			)}
		</main>
	);
}

export default Regular;
