import { Fragment, useState } from "react";

import InputBars from "@/components/InputBars";
import ResultBars from "@/components/ResultBars";

import type InputInfo from "@/types/InputInfo";
import type InputInfoWritable from "@/types/InputInfoWritable";
import type PageProps from "@/types/PageProps";

function QuadraticFormula({ math }: PageProps): JSX.Element {
	const [x1, setX1] = useState<string>("");
	const [y1, setY1] = useState<string>("");

	const [x2, setX2] = useState<string>("");
	const [y2, setY2] = useState<string>("");

	const [x3, setX3] = useState<string>("");
	const [y3, setY3] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		x1: x1 && !isNaN(Number(x1)) ? math.bignumber(x1) : bigNaN,
		y1: y1 && !isNaN(Number(y1)) ? math.bignumber(y1) : bigNaN,

		x2: x2 && !isNaN(Number(x2)) ? math.bignumber(x2) : bigNaN,
		y2: y2 && !isNaN(Number(y2)) ? math.bignumber(y2) : bigNaN,

		x3: x3 && !isNaN(Number(x3)) ? math.bignumber(x3) : bigNaN,
		y3: y3 && !isNaN(Number(y3)) ? math.bignumber(y3) : bigNaN,

		delta: bigNaN,
		x1Squared: bigNaN,
		x2Squared: bigNaN,
		x3Squared: bigNaN
	};

	scope.x1Squared = math.bignumber(Number(math.pow(scope.x1, 2)));
	scope.x2Squared = math.bignumber(Number(math.pow(scope.x2, 2)));
	scope.x3Squared = math.bignumber(Number(math.pow(scope.x3, 2)));
	scope.delta = math.evaluate("x1Squared * x2 + x1 * x3Squared + x2Squared * x3 - x2 * x3Squared - x1Squared * x3 - x1 * x2Squared", scope);
	const a = math.evaluate("(y1 * x2 + x1 * y3 + y2 * x3 - x2 * y3 - y1 * x3 - x1 * y2) / delta", scope);
	const b = math.evaluate("(x1Squared * y2 + y1 * x3Squared + x2Squared * y3 - y2 * x3Squared - x1Squared * y3 - y1 * x2Squared) / delta", scope);
	const c = math.evaluate("(x1Squared * x2 * y3 + x1 * y2 * x3Squared + y1 * x2Squared * x3 - y1 * x2 * x3Squared - x1Squared * y2 * x3 - x1 * x2Squared * y3) / delta", scope);

	const inputs: InputInfoWritable[][] = [
		[
			{
				id: "x1",
				label: (
					<>x<sub>1</sub></>
				),
				value: x1,
				updateValue: setX1
			},
			{
				id: "y1",
				label: (
					<>y<sub>1</sub></>
				),
				value: y1,
				updateValue: setY1
			}
		],
		[
			{
				id: "x2",
				label: (
					<>x<sub>2</sub></>
				),
				value: x2,
				updateValue: setX2
			},
			{
				id: "y2",
				label: (
					<>y<sub>2</sub></>
				),
				value: y2,
				updateValue: setY2
			}
		],
		[
			{
				id: "x3",
				label: (
					<>x<sub>3</sub></>
				),
				value: x3,
				updateValue: setX3
			},
			{
				id: "y3",
				label: (
					<>y<sub>3</sub></>
				),
				value: y3,
				updateValue: setY3
			}
		]
	];

	const allInputsFilled = inputs.flat().every(({ value }) => {
		return value !== "";
	});

	const pointLetters = ["a", "b", "c"];
	const inputPreview = inputs.map((row, index) => {
		return (
			<Fragment key={index}>
				{pointLetters[index]} ({row[0].value || row[0].label}, {row[1].value || row[1].label})
				{index !== inputs.length - 1 && <br />}
			</Fragment>
		);
	});

	const aRounded = math.round(a, 4);
	const bRounded = math.round(b, 4);
	const cRounded = math.round(c, 4);

	const results: InputInfo[] = [
		{
			id: "a",
			value: a
		},
		{
			id: "b",
			value: b
		},
		{
			id: "c",
			value: c
		},
		{
			id: "y",
			value: `(${aRounded}) * x^2 + (${bRounded}) * x + (${cRounded})`
		}
	];

	return (
		<main>
			<p>{inputPreview}</p>
			<InputBars inputs={inputs} />
			{allInputsFilled && <>
				<hr />
				<ResultBars enforceNumber={false} results={results} />
			</>}
		</main>
	);
}

export default QuadraticFormula;
