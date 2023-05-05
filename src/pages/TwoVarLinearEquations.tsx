import { Fragment, useState } from "react";

import InputBars from "@/components/InputBars";
import ResultBars from "@/components/ResultBars";

import type InputInfo from "@/types/InputInfo";
import type InputInfoWritable from "@/types/InputInfoWritable";
import type PageProps from "@/types/PageProps";

function TwoVarLinearEquations({ math }: PageProps) {
	const [a1, setA1] = useState<string>("");
	const [b1, setB1] = useState<string>("");
	const [c1, setC1] = useState<string>("");

	const [a2, setA2] = useState<string>("");
	const [b2, setB2] = useState<string>("");
	const [c2, setC2] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		a1: a1 && !isNaN(Number(a1)) ? math.bignumber(a1) : bigNaN,
		b1: b1 && !isNaN(Number(b1)) ? math.bignumber(b1) : bigNaN,
		c1: c1 && !isNaN(Number(c1)) ? math.bignumber(-c1) : bigNaN,

		a2: a2 && !isNaN(Number(a2)) ? math.bignumber(a2) : bigNaN,
		b2: b2 && !isNaN(Number(b2)) ? math.bignumber(b2) : bigNaN,
		c2: c2 && !isNaN(Number(c2)) ? math.bignumber(-c2) : bigNaN
	};

	const x = math.evaluate("((b1 * c2) - (b2 * c1)) / ((a1 * b2) - (b1 * a2))",
		scope);
	const y = math.evaluate("((a1 * c2) - (a2 * c1)) / ((b1 * a2) - (a1 * b2))",
		scope);

	const inputs: InputInfoWritable[][] = [
		[
			{
				id: "a1",
				label: (
					<>a<sub>1</sub></>
				),
				value: a1,
				setValue: setA1
			},
			{
				id: "b1",
				label: (
					<>b<sub>1</sub></>
				),
				value: b1,
				setValue: setB1
			},
			{
				id: "c1",
				label: (
					<>c<sub>1</sub></>
				),
				value: c1,
				setValue: setC1
			}
		],
		[
			{
				id: "a2",
				label: (
					<>a<sub>2</sub></>
				),
				value: a2,
				setValue: setA2
			},
			{
				id: "b2",
				label: (
					<>b<sub>2</sub></>
				),
				value: b2,
				setValue: setB2
			},
			{
				id: "c2",
				label: (
					<>c<sub>2</sub></>
				),
				value: c2,
				setValue: setC2
			}
		]
	];

	const allInputsFilled = inputs.flat().every(({ value }) => {
		return value !== "";
	});

	const inputPreview = inputs.map((row, index) => {
		return (
			<Fragment key={index}>
				{row[0].value || row[0].label}x + {row[1].value || row[1].label}
				y = {row[2].value || row[2].label}
				{index !== inputs.length - 1 && <br />}
			</Fragment>
		);
	});

	const results: InputInfo[] = [
		{
			id: "x",
			value: x
		},
		{
			id: "y",
			value: y
		}
	];

	return (
		<main>
			<p>{inputPreview}</p>
			<InputBars inputs={inputs} />
			{allInputsFilled && <>
				<hr />
				<ResultBars enforceNumber={true} results={results} />
			</>}
		</main>
	);
}

export default TwoVarLinearEquations;
