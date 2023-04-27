import InputBar from "@/components/InputBar";

import type InputInfo from "@/types/InputInfo";

interface Props {
	results: InputInfo[];
}

function ResultBars({ results }: Props) {
	const elements = results.map(({ id, label, value }) => {
		// multiply value by 1 to eliminate negative zero
		return (
			<InputBar
				id={id}
				key={id}
				type="text"
				value={(Number(value) * 1).toString()}
			>{label}</InputBar>
		);
	});

	return (
		<>{elements}</>
	);
}

export default ResultBars;
