import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faCheck } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";
import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";

import styles from "@/styles/Stat.module.css";

import type { ChangeEvent } from "react";
import type PageProps from "@/types/PageProps";

function Stat({ math }: PageProps) {
	const [newNumber, setNewNumber] = useState<string>("");
	const [newNumberHasError, setNewNumberHasError] = useState<boolean>(false);
	const [numbers, setNumbers] = useState<string>("");

	const addNumber = () => {
		if (!newNumber) {
			return;
		}
		try {
			const evaluated = math.evaluate(newNumber);
			if (evaluated.isNaN()) {
				throw new Error("NaN");
			}
			setNumbers([...numberArray, evaluated].sort((a, b) => {
				return a - b;
			}).join(", "));
			setNewNumber("");
		} catch {
			setNewNumberHasError(true);
		}
	};

	const clear = () => {
		setNumbers("");
	};

	const handleNewNumberChange = (newValue: string) => {
		setNewNumber(newValue);
		setNewNumberHasError(false);
	};

	const handleNumbersChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setNumbers(event.target.value);
	};

	const numberArray = numbers
		.replace(/(,|，|、|\n|\s)+/g, ",")
		.replace(/\s/g, "")
		.split(",")
		.filter((item) => {
			return item && !isNaN(Number(item));
		})
		.map((item) => {
			return Number(item);
		});
	numberArray.sort((a, b) => {
		return a - b;
	});
	const count = numberArray.length;
	const frequency = new Map<number, number>();
	let sum = math.bignumber(0);
	for (const number of numberArray) {
		frequency.set(number, (frequency.get(number) || 0) + 1);
		sum = sum.add(math.bignumber(number));
	}
	const average = math.divide(sum, count);
	const maxFrequency = Math.max(...Array.from(frequency.values()));
	const modes = Array.from(frequency.keys()).filter((key) => {
		return frequency.get(key) === maxFrequency;
	});
	const mode = modes.join(", ");
	const maximum = Math.max(...numberArray);
	const minimum = Math.min(...numberArray);
	const range = math.subtract(
		math.bignumber(maximum),
		math.bignumber(minimum)
	);
	const median = count ? Number(math.median(numberArray)) : undefined;
	const lowerQuantile = (count >= 4) ? (
		count % 4 === 0 ?
			math.divide(math.add(
				math.bignumber(numberArray[(count / 4) - 1]),
				math.bignumber(numberArray[count / 4])
			), 2) :
			numberArray[Math.floor(count / 4)]
	) : undefined;
	const upperQuantile = (count >= 4) ? (
		count % 4 === 0 ?
			math.divide(math.add(
				math.bignumber(numberArray[(count * 3 / 4) - 1]),
				math.bignumber(numberArray[count * 3 / 4])
			), 2) :
			numberArray[Math.floor(count * 3 / 4)]
	) : undefined;
	let tmpVariance = math.bignumber(0);
	for (const number of numberArray) {
		tmpVariance = tmpVariance.add(math.square(Number(math.subtract(
			math.bignumber(number),
			average
		))));
	}
	const sampleVariance = math.divide(tmpVariance, count - 1);
	const populationVariance = math.divide(tmpVariance, count);
	const standardDeviation = math.sqrt(Number(populationVariance));
	const interquartileRange =
		(upperQuantile !== undefined && lowerQuantile !== undefined) ?
			math.subtract(
				upperQuantile,
				lowerQuantile
			) : undefined;
	const quartileDeviation = (interquartileRange !== undefined) ?
		math.divide(interquartileRange, 2) : undefined;

	const results = count ? {
		range,
		count,
		average,
		sum,
		mode,
		sampleVariance,
		populationVariance,
		standardDeviation,
		quartileDeviation,
		interquartileRange,
		minimum,
		lowerQuantile,
		median,
		upperQuantile,
		maximum
	} as const : {} as const;

	const resultBars = Object.keys(results).map((key) => {
		const value = results[key as keyof typeof results];
		if (!value) {
			return null;
		}
		return (
			<InputBar
				id={key}
				key={key}
				type="text"
				value={value.toString()}
			>{t(key)}</InputBar>
		);
	});

	return (
		<main>
			<MainInputBar
				hasError={newNumberHasError}
				placeholder="enterNewNumber"
				value={newNumber}
				onChange={handleNewNumberChange}
				onSubmit={addNumber}
			>
				<button type="submit" title={t("add").toString()}>
					<FontAwesomeIcon icon={faCheck} fixedWidth />
				</button>
			</MainInputBar>
			<div className={styles["stat-editor"]}>
				<label htmlFor="added-numbers">{t("addedNumbers")}</label>
				<textarea
					id="added-numbers"
					value={numbers}
					onChange={handleNumbersChange}
				></textarea>
				<BlockButton
					icon={faBroom}
					label="clear"
					onClick={clear}
				/>
			</div>
			{resultBars}
		</main>
	);
}

export default Stat;
