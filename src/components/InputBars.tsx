import { Fragment } from "react";

import InputBar from "@/components/InputBar";

import type InputInfoWritable from "@/types/InputInfoWritable";

interface Props {
	inputs: InputInfoWritable[][];
}

function InputBars({ inputs }: Props): JSX.Element {
	const elements = inputs.map((row, index) => {
		const rows = row.map(({ hasError, id, label, value, updateValue }) => {
			return (
				<InputBar
					hasError={hasError}
					id={id}
					key={id}
					type="number"
					value={value.toString()}
					onChange={updateValue}
				>
					{label || id}
				</InputBar>
			);
		});

		return (
			<Fragment key={index}>
				{rows}
				{index !== inputs.length - 1 && <hr />}
			</Fragment>
		);
	});

	return (
		<>{elements}</>
	);
}

export default InputBars;
