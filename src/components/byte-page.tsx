import InputBar from "@/components/input-bar";
import { t } from "i18next";
import { Dispatch, JSX, SetStateAction, useState } from "react";

function BytePage(): JSX.Element {
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
		[setTerabyte, 1024 * 1024 * 1024 * 1024],
	] as [Dispatch<SetStateAction<string>>, number][];

	const calculate = (newByte: number, setterIndex: number): void => {
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

	const clear = (): void => {
		setByte("");
		setKilobyte("");
		setMegabyte("");
		setGigabyte("");
		setTerabyte("");
	};

	const handleChange = (newValue: string, setterIndex: number): void => {
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

	const handleByteChange = (newValue: string): void => {
		handleChange(newValue, 0);
		setByte(newValue);
	};

	const handleKilobyteChange = (newValue: string): void => {
		handleChange(newValue, 1);
		setKilobyte(newValue);
	};

	const handleMegabyteChange = (newValue: string): void => {
		handleChange(newValue, 2);
		setMegabyte(newValue);
	};

	const handleGigabyteChange = (newValue: string): void => {
		handleChange(newValue, 3);
		setGigabyte(newValue);
	};

	const handleTerabyteChange = (newValue: string): void => {
		handleChange(newValue, 4);
		setTerabyte(newValue);
	};

	const inputs = [
		{
			label: "byte",
			onChange: handleByteChange,
			value: byte,
		},
		{
			label: "kilobyte",
			onChange: handleKilobyteChange,
			value: kilobyte,
		},
		{
			label: "megabyte",
			onChange: handleMegabyteChange,
			value: megabyte,
		},
		{
			label: "gigabyte",
			onChange: handleGigabyteChange,
			value: gigabyte,
		},
		{
			label: "terabyte",
			onChange: handleTerabyteChange,
			value: terabyte,
		},
	] as const;

	const inputBars = inputs.map((item) => {
		return (
			<InputBar
				hasError={isNaN(Number(item.value))}
				key={item.label}
				type="number"
				value={item.value}
				onChange={item.onChange}
			>
				{t(item.label)}
			</InputBar>
		);
	});

	return <main>{inputBars}</main>;
}

export default BytePage;
