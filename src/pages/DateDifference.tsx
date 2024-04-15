import InputBar from "@/components/InputBar";
import DateShift from "date-shift";
import { t } from "i18next";
import { Dispatch, SetStateAction, useState } from "react";

function DateDifference(): JSX.Element {
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
		if (!newDate || isNaN(newDayDifference)) {
			return;
		}
		const startDateShift = new DateShift(newDate);
		startDateShift.addDays(newDayDifference);
		setter(startDateShift.toString("-"));
	};

	const handleStartDateChange = (newValue: string): void => {
		setStartDate(newValue);
		calculate(newValue, endDate);
	};

	const handleEndDateChange = (newValue: string): void => {
		setEndDate(newValue);
		calculate(startDate, newValue);
	};

	const handleDayDifferenceChange = (newValue: string): void => {
		setDayDifference(newValue);
		const newNumberValue = Number(newValue);
		if (newNumberValue < 0) {
			calculateBasedOnDayDifference(
				newNumberValue,
				endDate,
				setStartDate,
			);
		} else {
			calculateBasedOnDayDifference(
				newNumberValue,
				startDate,
				setEndDate,
			);
		}
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
