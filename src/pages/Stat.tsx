import BlockButton from "@/components/BlockButton";
import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";
import styles from "@/styles/Stat.module.css";
import { PageProps } from "@/types";
import { faBroom, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { BigNumber } from "mathjs";
import { ChangeEvent, Fragment, useState } from "react";

function Stat({ math }: PageProps): JSX.Element {
	const [newNumber, setNewNumber] = useState<string>("");
	const [newNumberHasError, setNewNumberHasError] = useState<boolean>(false);
	const [numbers, setNumbers] = useState<string>("");

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

	const addNumber = (): void => {
		if (!newNumber) {
			return;
		}
		try {
			const evaluated = math.evaluate(newNumber) as BigNumber;
			if (evaluated.isNaN()) {
				throw new Error("NaN");
			}
			setNumbers(
				[...numberArray, evaluated.toNumber()]
					.sort((a, b) => {
						return a - b;
					})
					.join(", "),
			);
			setNewNumber("");
		} catch {
			setNewNumberHasError(true);
		}
	};

	const clear = (): void => {
		setNumbers("");
	};

	const handleNewNumberChange = (newValue: string): void => {
		setNewNumber(newValue);
		setNewNumberHasError(false);
	};

	const handleNumbersChange = (
		event: ChangeEvent<HTMLTextAreaElement>,
	): void => {
		setNumbers(event.target.value);
	};

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
	const average = Number(math.divide(sum, count));
	const maxFrequency = Math.max(...Array.from(frequency.values()));
	const modes = Array.from(frequency.keys()).filter((key) => {
		return frequency.get(key) === maxFrequency;
	});
	const mode = modes.join(", ");
	const maximum = Math.max(...numberArray);
	const minimum = Math.min(...numberArray);
	const range = math.subtract(
		math.bignumber(maximum),
		math.bignumber(minimum),
	);
	const median = count ? Number(math.median(numberArray)) : NaN;
	const lowerQuantile =
		count >= 4
			? count % 4 === 0
				? Number(
						math.divide(
							math.add(
								math.bignumber(numberArray[count / 4 - 1]),
								math.bignumber(numberArray[count / 4]),
							),
							2,
						),
					)
				: numberArray[Math.floor(count / 4)]
			: NaN;
	const upperQuantile =
		count >= 4
			? count % 4 === 0
				? Number(
						math.divide(
							math.add(
								math.bignumber(
									numberArray[(count * 3) / 4 - 1],
								),
								math.bignumber(numberArray[(count * 3) / 4]),
							),
							2,
						),
					)
				: numberArray[Math.floor((count * 3) / 4)]
			: NaN;
	let tmpVariance = math.bignumber(0);
	for (const number of numberArray) {
		tmpVariance = tmpVariance.add(
			math.square(Number(math.subtract(math.bignumber(number), average))),
		);
	}
	const sampleVariance = Number(math.divide(tmpVariance, count - 1));
	const populationVariance = Number(math.divide(tmpVariance, count));
	const standardDeviation = Number(math.sqrt(populationVariance));
	const interquartileRange =
		!isNaN(upperQuantile) && !isNaN(lowerQuantile)
			? math.subtract(upperQuantile, lowerQuantile)
			: NaN;
	const quartileDeviation = !isNaN(interquartileRange)
		? Number(math.divide(interquartileRange, 2))
		: NaN;

	const results = count
		? ([
				{
					label: "range",
					value: range.toString(),
				},
				{
					label: "count",
					value: count.toString(),
				},
				{
					label: "average",
					value: average.toString(),
				},
				{
					label: "sum",
					value: sum.toString(),
				},
				{
					label: "mode",
					value: mode,
				},
				{
					label: "sampleVariance",
					value: sampleVariance.toString(),
				},
				{
					label: "populationVariance",
					value: populationVariance.toString(),
				},
				{
					label: "standardDeviation",
					value: standardDeviation.toString(),
				},
				{
					label: "quartileDeviation",
					value: quartileDeviation.toString(),
				},
				{
					label: "interquartileRange",
					value: interquartileRange.toString(),
				},
				{
					label: "minimum",
					value: minimum.toString(),
				},
				{
					label: "lowerQuantile",
					value: lowerQuantile.toString(),
				},
				{
					label: "median",
					value: median.toString(),
				},
				{
					label: "upperQuantile",
					value: upperQuantile.toString(),
				},
				{
					label: "maximum",
					value: maximum.toString(),
				},
			] as const)
		: ([] as const);

	const resultBars = results.map(({ label, value }) => {
		if (!value || value === "NaN") {
			return <Fragment key={label}></Fragment>;
		}
		return (
			<InputBar
				id={label}
				key={label}
				type="text"
				value={value}
			>
				{t(label)}
			</InputBar>
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
				<button
					type="submit"
					title={t("add").toString()}
				>
					<FontAwesomeIcon
						icon={faCheck}
						fixedWidth
					/>
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
