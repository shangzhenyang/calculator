import { useState } from "react";
import { t } from "i18next";

import InputBar from "@/components/InputBar";

import type { Dispatch, SetStateAction } from "react";

function DateDifference(): JSX.Element {
	const millisecondsInDay = 1000 * 60 * 60 * 24;
	const todayDate = new Date().toISOString().split("T")[0];

	const [startDate, setStartDate] = useState<string>(todayDate);
	const [endDate, setEndDate] = useState<string>(todayDate);
	const [dayDifference, setDayDifference] = useState<string>("");

	const calculate = (newStartDate: string, newEndDate: string): void => {
		if (!newStartDate || !newEndDate) {
			return;
		}
		const startTimestamp = new Date(newStartDate).getTime();
		const endTimestamp = new Date(newEndDate).getTime();
		const result = Math.abs(endTimestamp - startTimestamp) /
			millisecondsInDay;
		setDayDifference(result.toString());
	};

	const calculateBasedOnDayDifference = (
		newDayDifference: number,
		newDate: string,
		setter: Dispatch<SetStateAction<string>>
	): void => {
		if (!newDate) {
			return;
		}
		const startTimestamp = new Date(newDate).getTime();
		if (isNaN(newDayDifference)) {
			return;
		}
		const result = startTimestamp + (newDayDifference * millisecondsInDay);
		const resultDate = new Date(result);
		const resultStr = resultDate.toISOString().split("T")[0];
		setter(resultStr);
	};

	const handleStartDateChange = (newValue: string): void => {
		setStartDate(newValue);
		if (!endDate && dayDifference) {
			calculateBasedOnDayDifference(
				Number(dayDifference),
				newValue,
				setEndDate
			);
		} else {
			calculate(newValue, endDate);
		}
	};

	const handleEndDateChange = (newValue: string): void => {
		setEndDate(newValue);
		if (!startDate && dayDifference) {
			calculateBasedOnDayDifference(
				-Number(dayDifference),
				newValue,
				setStartDate
			);
		} else {
			calculate(startDate, newValue);
		}
	};

	const handleDayDifferenceChange = (newValue: string): void => {
		setDayDifference(newValue);
		calculateBasedOnDayDifference(Number(newValue), startDate, setEndDate);
	};

	const inputs = [
		{
			hasError: !!(dayDifference || endDate) && !startDate,
			id: "startDate",
			type: "date",
			value: startDate,
			onChange: handleStartDateChange
		},
		{
			hasError: !!(dayDifference || startDate) && !endDate,
			id: "endDate",
			type: "date",
			value: endDate,
			onChange: handleEndDateChange
		},
		{
			hasError: isNaN(Number(dayDifference)),
			id: "dayDifference",
			type: "text",
			value: dayDifference,
			onChange: handleDayDifferenceChange
		}
	] as const;

	const inputBars = inputs.map(({ hasError, id, type, value, onChange }) => {
		return (
			<InputBar
				hasError={hasError}
				key={id}
				id={id}
				type={type}
				value={value}
				onChange={onChange}
			>
				{t(id)}
			</InputBar>
		);
	});

	return (
		<main>{inputBars}</main>
	);
}

export default DateDifference;
