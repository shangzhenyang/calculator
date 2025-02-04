import InputBar from "@/components/input-bar";
import { InputInfo } from "@/types";
import { JSX } from "react";

interface ResultBarsProps {
	enforceNumber: boolean;
	results: InputInfo[];
}

function ResultBars({ enforceNumber, results }: ResultBarsProps): JSX.Element {
	const elements = results.map(({ id, label, value }) => {
		// multiply value by 1 to eliminate negative zero
		const finalValue = enforceNumber
			? (Number(value) * 1).toString()
			: value.toString();

		return (
			<InputBar
				key={id}
				type="text"
				value={finalValue}
			>
				{label || id}
			</InputBar>
		);
	});

	return <>{elements}</>;
}

export default ResultBars;
