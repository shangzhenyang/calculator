import { useState } from "react";
import { t } from "i18next";

import InputBar from "@/components/InputBar";

import type { Dispatch, SetStateAction } from "react";

function Byte() {
	const [byte, setByte] = useState("");
	const [kilobyte, setKilobyte] = useState("");
	const [megabyte, setMegabyte] = useState("");
	const [gigabyte, setGigabyte] = useState("");
	const [terabyte, setTerabyte] = useState("");

	const setters = [
		[setByte, 1],
		[setKilobyte, 1024],
		[setMegabyte, 1024 * 1024],
		[setGigabyte, 1024 * 1024 * 1024],
		[setTerabyte, 1024 * 1024 * 1024 * 1024]
	] as [Dispatch<SetStateAction<string>>, number][];

	const calculate = (newByte: number, setterIndex: number) => {
		if (isNaN(newByte)) {
			return;
		}
		setters.forEach(([setter, multiplier], index) => {
			if (index === setterIndex) {
				return;
			}
			setter((newByte / multiplier).toString());
		});
	};

	const clear = () => {
		setByte("");
		setKilobyte("");
		setMegabyte("");
		setGigabyte("");
		setTerabyte("");
	};

	const handleChange = (newValue: string, setterIndex: number) => {
		if (!newValue) {
			clear();
			return;
		}
		const number = Number(newValue);
		if (isNaN(number)) {
			return;
		}
		const multiplier = setters[setterIndex][1];
		calculate(number * multiplier, setterIndex);
	};

	const handleByteChange = (newValue: string) => {
		handleChange(newValue, 0);
		setByte(newValue);
	};

	const handleKilobyteChange = (newValue: string) => {
		handleChange(newValue, 1);
		setKilobyte(newValue);
	};

	const handleMegabyteChange = (newValue: string) => {
		handleChange(newValue, 2);
		setMegabyte(newValue);
	};

	const handleGigabyteChange = (newValue: string) => {
		handleChange(newValue, 3);
		setGigabyte(newValue);
	};

	const handleTerabyteChange = (newValue: string) => {
		handleChange(newValue, 4);
		setTerabyte(newValue);
	};

	const inputs = [
		{
			label: "byte",
			value: byte,
			onChange: handleByteChange
		},
		{
			label: "kilobyte",
			value: kilobyte,
			onChange: handleKilobyteChange
		},
		{
			label: "megabyte",
			value: megabyte,
			onChange: handleMegabyteChange
		},
		{
			label: "gigabyte",
			value: gigabyte,
			onChange: handleGigabyteChange
		},
		{
			label: "terabyte",
			value: terabyte,
			onChange: handleTerabyteChange
		}
	] as const;

	const inputBars = inputs.map((item) => {
		return (
			<InputBar
				hasError={isNaN(Number(item.value))}
				id={item.label + "-input"}
				key={item.label}
				type="number"
				value={item.value}
				onChange={item.onChange}
			>{t(item.label)}</InputBar>
		);
	});

	return (
		<main>{inputBars}</main>
	);
}

export default Byte;
