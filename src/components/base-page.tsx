import InputBar from "@/components/input-bar";
import globals from "@/globals";
import { t } from "i18next";
import { BigNumber } from "mathjs";
import { Dispatch, JSX, SetStateAction, useState } from "react";

const BINARY_PREFIX = "0b";
const OCTAL_PREFIX = "0o";
const HEX_PREFIX = "0x";
const VALUE_FILTER = /\s|,/g;

const { math } = globals;

function BasePage(): JSX.Element {
	const [binary, setBinary] = useState("");
	const [octal, setOctal] = useState("");
	const [decimal, setDecimal] = useState("");
	const [hexadecimal, setHexadecimal] = useState("");

	const setters = [
		[setBinary, "bin"],
		[setOctal, "oct"],
		[setDecimal, ""],
		[setHexadecimal, "hex"],
	] as [Dispatch<SetStateAction<string>>, string][];

	const calculate = (newDecimal: string, setterIndex: number): void => {
		if (isNaN(Number(newDecimal))) {
			return;
		}
		setters.forEach(([setter, base], index) => {
			if (index === setterIndex) {
				return;
			}
			if (base) {
				const result = math.evaluate(
					`${base}(${newDecimal})`,
				) as string;
				setter(result.substring(2));
			} else {
				setter(newDecimal);
			}
		});
	};

	const clear = (): void => {
		setBinary("");
		setOctal("");
		setDecimal("");
		setHexadecimal("");
	};

	const handleChange = (
		newValue: string,
		setterIndex: number,
		prefix?: string,
	): void => {
		newValue = newValue.replace(VALUE_FILTER, "");
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
		const result = math.evaluate(newValue) as BigNumber;
		calculate(result.toString(), setterIndex);
	};

	const handleBinaryChange = (newValue: string): void => {
		handleChange(newValue, 0, BINARY_PREFIX);
		setBinary(newValue);
	};

	const handleOctalChange = (newValue: string): void => {
		handleChange(newValue, 1, OCTAL_PREFIX);
		setOctal(newValue);
	};

	const handleDecimalChange = (newValue: string): void => {
		handleChange(newValue, 2);
		setDecimal(newValue);
	};

	const handleHexadecimalChange = (newValue: string): void => {
		handleChange(newValue, 3, HEX_PREFIX);
		setHexadecimal(newValue);
	};

	const hasError = (value: string, prefix?: string): boolean => {
		value = value.replace(VALUE_FILTER, "");
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
			hasError: hasError(binary, OCTAL_PREFIX) || binary.length > 64,
			label: "binary",
			onChange: handleBinaryChange,
			value: binary,
		},
		{
			hasError: hasError(octal, OCTAL_PREFIX),
			label: "octal",
			onChange: handleOctalChange,
			value: octal,
		},
		{
			hasError: hasError(decimal),
			label: "decimal",
			onChange: handleDecimalChange,
			value: decimal,
		},
		{
			hasError: hasError(hexadecimal, HEX_PREFIX),
			label: "hexadecimal",
			onChange: handleHexadecimalChange,
			value: hexadecimal,
		},
	] as const;

	const inputBars = inputs.map((item) => {
		return (
			<InputBar
				hasError={item.hasError}
				key={item.label}
				type="text"
				value={item.value}
				onChange={item.onChange}
			>
				{t(item.label)}
			</InputBar>
		);
	});

	return <main>{inputBars}</main>;
}

export default BasePage;
