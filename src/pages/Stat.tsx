import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";
import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";

import styles from "@/styles/Stat.module.css";

import type { ChangeEvent } from "react";
import type PageProps from "@/types/PageProps";

function Stat({ math }: PageProps) {
	const [newNumber, setNewNumber] = useState<string>("");
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

	const count = numberArray.length;
	const frequency = new Map<number, number>();
	let sum = math.bignumber(0);
	for (const number of numberArray) {
		frequency.set(number, (frequency.get(number) || 0) + 1);
		sum = sum.add(math.bignumber(number));
	}
	const average = math.divide(sum, count);
	const maxFrequency = Math.max.apply(null, Array.from(frequency.values()));
	const modes = Array.from(frequency.keys()).filter((key) => {
		return frequency.get(key) === maxFrequency;
	});
	const mode = modes.join(", ");
	const max = Math.max.apply(null, numberArray);
	const min = Math.min.apply(null, numberArray);
	const range = math.subtract(math.bignumber(max), math.bignumber(min));

	const addNumber = () => {
		if (!newNumber) {
			return;
		}
		try {
			const evaluated = math.evaluate(newNumber);
			setNumbers([...numberArray, evaluated].sort((a, b) => {
				return a - b;
			}).join(", "));
			setNewNumber("");
		} catch {
			return;
		}
	};

	const clear = () => {
		setNumbers("");
	};

	const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setNumbers(evt.target.value);
	};

	const results = count ? [{
		label: "range",
		value: range
	}, {
		label: "count",
		value: count
	}, {
		label: "average",
		value: average
	}, {
		label: "sum",
		value: sum
	}, {
		label: "mode",
		value: mode
	}] : [];

	const inputBars = results.map((result) => {
		return (
			<InputBar
				id={result.label}
				key={result.label}
				label={result.label}
				value={result.value.toString()}
			/>
		);
	});

	return (
		<main>
			<MainInputBar
				placeholder="enterNewNumber"
				value={newNumber}
				onChange={setNewNumber}
				onSubmit={addNumber}
			>
				<button>
					<FontAwesomeIcon icon={faCirclePlus} size="xl" />
					{t("add").toString()}
				</button>
			</MainInputBar>
			<div className={styles["stat-editor"]}>
				<label htmlFor="added-numbers">{t("addedNumbers")}</label>
				<textarea
					id="added-numbers"
					value={numbers}
					onChange={handleChange}
				></textarea>
				<BlockButton
					icon={faBroom}
					label="clear"
					onClick={clear}
				/>
			</div>
			{inputBars}
		</main>
	);
}

export default Stat;
