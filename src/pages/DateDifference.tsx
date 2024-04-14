import InputBar from "@/components/InputBar";
import DateShift from "date-shift";
import { t } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";

function DateDifference(): JSX.Element {
	const millisecondsInDay = 1000 * 60 * 60 * 24;
	const todayDate = new DateShift().toString("-");

	const [startDate, setStartDate] = useState<string>(todayDate);
	const [endDate, setEndDate] = useState<string>(todayDate);
	const [dayDifference, setDayDifference] = useState<string>("");

	const calculate = (newStartDate: string, newEndDate: string): void => {
		if (!newStartDate || !newEndDate) {
			return;
		}
		const startDateShift = new DateShift(newStartDate);
		const endDateShift = new DateShift(newEndDate);
		const result = startDateShift.daysBetween(endDateShift);
		setDayDifference(result.toString());
	};

	const calculateBasedOnDayDifference = (
		newDayDifference: number,
		newDate: string,
		setter: Dispatch<SetStateAction<string>>,
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
				setEndDate,
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
				setStartDate,
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
			onChange: handleStartDateChange,
			type: "date",
			value: startDate,
		},
		{
			hasError: !!(dayDifference || startDate) && !endDate,
			id: "endDate",
			onChange: handleEndDateChange,
			type: "date",
			value: endDate,
		},
		{
			hasError: isNaN(Number(dayDifference)),
			id: "dayDifference",
			onChange: handleDayDifferenceChange,
			type: "text",
			value: dayDifference,
		},
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

	return <main>{inputBars}</main>;
}

export default DateDifference;
