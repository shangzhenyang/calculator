import InputBar from "@/components/InputBar";
import { InputInfoWritable } from "@/types";
import { Fragment } from "react";

interface InputBarsProps {
	inputs: InputInfoWritable[][];
}

function InputBars({ inputs }: InputBarsProps): JSX.Element {
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

	return <>{elements}</>;
}

export default InputBars;
