import InputBar from "@/components/input-bar";
import type { InputWritableInfo } from "@/types";
import type { JSX } from "react";
import { Fragment } from "react";

interface InputBarsProps {
	inputs: InputWritableInfo[][];
}

function InputBars({ inputs }: InputBarsProps): JSX.Element {
	const elements = inputs.map((row, index) => {
		const rows = row.map(({ hasError, id, label, value, updateValue }) => {
			return (
				<InputBar
					hasError={hasError}
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
			<Fragment key={rows[0].key}>
				{rows}
				{index !== inputs.length - 1 && <hr />}
			</Fragment>
		);
	});

	return <>{elements}</>;
}

export default InputBars;
