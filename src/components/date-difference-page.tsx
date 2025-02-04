import InputBar from "@/components/input-bar";
import dayjs from "dayjs";
import { t } from "i18next";
import { Dispatch, JSX, SetStateAction, useState } from "react";

const FORMAT = "YYYY-MM-DD";
const UNIT = "day";

function DateDifferencePage(): JSX.Element {
	const today = dayjs().format(FORMAT);

	const [startDate, setStartDate] = useState<string>(today);
	const [endDate, setEndDate] = useState<string>(today);
	const [dayDifference, setDayDifference] = useState<string>("");

	const calculate = (newStartDate: string, newEndDate: string): void => {
		if (!newStartDate || !newEndDate) {
			return;
		}
		const startDate = dayjs(newStartDate);
		const endDate = dayjs(newEndDate);
		const diff = endDate.diff(startDate, UNIT);
		setDayDifference(diff.toString());
	};

	const calculateBasedOnDayDifference = (
		newDayDifference: number,
		newDate: string,
		setter: Dispatch<SetStateAction<string>>,
	): void => {
		if (
			!newDate ||
			isNaN(newDayDifference) ||
			Math.abs(newDayDifference) > 1_000_000
		) {
			return;
		}
		const startDate = dayjs(newDate);
		const addedDate = startDate.add(newDayDifference, UNIT);
		setter(addedDate.format(FORMAT));
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
			label: t("startDate"),
			onChange: handleStartDateChange,
			type: "date",
			value: startDate,
		},
		{
			hasError: !!(dayDifference || startDate) && !endDate,
			label: t("endDate"),
			onChange: handleEndDateChange,
			type: "date",
			value: endDate,
		},
		{
			hasError: isNaN(Number(dayDifference)),
			label: t("dayDifference"),
			onChange: handleDayDifferenceChange,
			type: "number",
			value: dayDifference,
		},
	] as const;

	const inputBars = inputs.map(
		({ hasError, label, type, value, onChange }) => {
			return (
				<InputBar
					hasError={hasError}
					key={label}
					type={type}
					value={value}
					onChange={onChange}
				>
					{label}
				</InputBar>
			);
		},
	);

	return <main>{inputBars}</main>;
}

export default DateDifferencePage;
