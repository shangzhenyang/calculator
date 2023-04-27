import { useState } from "react";
import { t } from "i18next";

import InputBar from "@/components/InputBar";

import type { Dispatch, SetStateAction } from "react";
import type PageProps from "@/types/PageProps";

function Base({ math }: PageProps) {
	const [binary, setBinary] = useState("");
	const [octal, setOctal] = useState("");
	const [decimal, setDecimal] = useState("");
	const [hexadecimal, setHexadecimal] = useState("");

	const binaryPrefix = "0b";
	const octalPrefix = "0o";
	const hexadecimalPrefix = "0x";

	const setters = [
		[setBinary, "bin"],
		[setOctal, "oct"],
		[setDecimal, ""],
		[setHexadecimal, "hex"]
	] as [Dispatch<SetStateAction<string>>, string][];

	const calculate = (newDecimal: string, setterIndex: number) => {
		if (isNaN(Number(newDecimal))) {
			return;
		}
		setters.forEach(([setter, base], index) => {
			if (index === setterIndex) {
				return;
			}
			if (base) {
				const result = math.evaluate(`${base}(${newDecimal})`);
				setter(result.toString().substring(2));
			} else {
				setter(newDecimal);
			}
		});
	};

	const clear = () => {
		setBinary("");
		setOctal("");
		setDecimal("");
		setHexadecimal("");
	};

	const handleChange = (
		newValue: string,
		setterIndex: number,
		prefix?: string
	) => {
		if (!newValue || newValue.includes(".")) {
			clear();
			return;
		}
		if (prefix && !newValue.startsWith(prefix)) {
			newValue = prefix + newValue;
		}
		const number = Number(newValue);
		if (isNaN(number)) {
			return;
		}
		calculate(math.evaluate(newValue).toString(), setterIndex);
	};

	const handleBinaryChange = (newValue: string) => {
		handleChange(newValue, 0, binaryPrefix);
		setBinary(newValue);
	};

	const handleOctalChange = (newValue: string) => {
		handleChange(newValue, 1, octalPrefix);
		setOctal(newValue);
	};

	const handleDecimalChange = (newValue: string) => {
		handleChange(newValue, 2);
		setDecimal(newValue);
	};

	const handleHexadecimalChange = (newValue: string) => {
		handleChange(newValue, 3, hexadecimalPrefix);
		setHexadecimal(newValue);
	};

	const hasError = (value: string, prefix?: string) => {
		if (!value) {
			return false;
		}
		if (value.includes(".")) {
			return true;
		}
		if (prefix && !value.startsWith(prefix)) {
			value = prefix + value;
		}
		return isNaN(Number(value));
	};

	const inputs = [
		{
			hasError: hasError(binary, binaryPrefix) || binary.length > 64,
			label: "binary",
			value: binary,
			onChange: handleBinaryChange
		},
		{
			hasError: hasError(octal, octalPrefix),
			label: "octal",
			value: octal,
			onChange: handleOctalChange
		},
		{
			hasError: hasError(decimal),
			label: "decimal",
			value: decimal,
			onChange: handleDecimalChange
		},
		{
			hasError: hasError(hexadecimal, hexadecimalPrefix),
			label: "hexadecimal",
			value: hexadecimal,
			onChange: handleHexadecimalChange
		}
	] as const;

	const inputBars = inputs.map((item) => {
		return (
			<InputBar
				hasError={item.hasError}
				id={item.label + "-input"}
				key={item.label}
				placeholder="enterNumber"
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

export default Base;
