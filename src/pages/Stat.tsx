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
	const BIG_NAN: BigNumber = math.bignumber(NaN);

	const [newNumber, setNewNumber] = useState<string>("");
	const [newNumberHasError, setNewNumberHasError] = useState<boolean>(false);
	const [numbers, setNumbers] = useState<string>("");

	const numberArray = numbers
		.replace(/(,|，|、|\n|\s)+/g, ",")
		.replace(/\s/g, "")
		.split(",")
		.filter((item) => !!item)
		.map((item) => math.bignumber(item))
		.filter((item) => !item.isNaN());

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
				[...numberArray, evaluated].sort(compareBigNumber).join(", "),
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

	numberArray.sort(compareBigNumber);
	const count: number = numberArray.length;
	const frequency = new Map<number, BigNumber>();
	let sum: BigNumber = math.bignumber(0);
	for (const item of numberArray) {
		const number = item.toNumber();
		frequency.set(
			number,
			(frequency.get(number) || math.bignumber(0)).add(1),
		);
		sum = sum.add(number);
	}
	const average: BigNumber = math.divide(sum, count) as BigNumber;
	const frequencyValues: BigNumber[] = Array.from(frequency.values());
	const maxFrequency: BigNumber =
		frequencyValues.length > 0 ? math.max(...frequencyValues) : BIG_NAN;
	const modes: number[] = Array.from(frequency.keys()).filter((key) =>
		frequency.get(key)?.equals(maxFrequency),
	);
	const mode: string = modes.join(", ");
	const maximum: BigNumber =
		numberArray.length > 0 ? math.max(...numberArray) : BIG_NAN;
	const minimum: BigNumber =
		numberArray.length > 0 ? math.min(...numberArray) : BIG_NAN;
	const range: BigNumber = math.subtract(maximum, minimum);
	const median: BigNumber = count > 0 ? math.median(numberArray) : BIG_NAN;
	const lowerQuantile: BigNumber =
		count >= 4
			? count % 4 === 0
				? (math.divide(
						math.add(
							numberArray[count / 4 - 1],
							numberArray[count / 4],
						),
						2,
					) as BigNumber)
				: numberArray[Math.floor(count / 4)]
			: BIG_NAN;
	const upperQuantile: BigNumber =
		count >= 4
			? count % 4 === 0
				? (math.divide(
						math.add(
							numberArray[(count * 3) / 4 - 1],
							numberArray[(count * 3) / 4],
						),
						2,
					) as BigNumber)
				: numberArray[Math.floor((count * 3) / 4)]
			: BIG_NAN;
	let tmpVariance: BigNumber = math.bignumber(0);
	for (const number of numberArray) {
		tmpVariance = tmpVariance.add(
			math.square(math.subtract(number, average)),
		);
	}
	const sampleVariance: BigNumber = math.divide(
		tmpVariance,
		count - 1,
	) as BigNumber;
	const populationVariance: BigNumber = math.divide(
		tmpVariance,
		count,
	) as BigNumber;
	const standardDeviation: BigNumber = math.sqrt(populationVariance);
	const interquartileRange =
		!upperQuantile.isNaN() && !lowerQuantile.isNaN()
			? math.subtract(upperQuantile, lowerQuantile)
			: BIG_NAN;
	const quartileDeviation: BigNumber = !interquartileRange.isNaN()
		? (math.divide(interquartileRange, 2) as BigNumber)
		: BIG_NAN;

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

function compareBigNumber(a: BigNumber, b: BigNumber): number {
	const result = a.minus(b);
	if (result.isNegative()) {
		return -1;
	} else if (result.isPositive()) {
		return 1;
	} else {
		return 0;
	}
}

export default Stat;
