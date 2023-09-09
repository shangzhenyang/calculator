import InputBar from "@/components/InputBar";
import { InputInfo } from "@/types";

interface ResultBarsProps {
	enforceNumber: boolean;
	results: InputInfo[];
}

function ResultBars({ enforceNumber, results }: ResultBarsProps): JSX.Element {
	const elements = results.map(({ id, label, value }) => {
		// multiply value by 1 to eliminate negative zero
		const finalValue = enforceNumber ?
			(Number(value) * 1).toString() :
			value.toString();

		return (
			<InputBar
				id={id}
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
