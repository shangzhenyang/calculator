import InputBars from "@/components/InputBars";
import ResultBars from "@/components/ResultBars";
import { InputInfo, InputInfoWritable, PageProps } from "@/types";
import { BigNumber } from "mathjs";
import { Fragment, useState } from "react";

function ThreeVarLinearEquations({ math }: PageProps): JSX.Element {
	const [a1, setA1] = useState<string>("");
	const [b1, setB1] = useState<string>("");
	const [c1, setC1] = useState<string>("");
	const [d1, setD1] = useState<string>("");

	const [a2, setA2] = useState<string>("");
	const [b2, setB2] = useState<string>("");
	const [c2, setC2] = useState<string>("");
	const [d2, setD2] = useState<string>("");

	const [a3, setA3] = useState<string>("");
	const [b3, setB3] = useState<string>("");
	const [c3, setC3] = useState<string>("");
	const [d3, setD3] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		a1: a1 && !isNaN(Number(a1)) ? math.bignumber(a1) : bigNaN,
		a2: a2 && !isNaN(Number(a2)) ? math.bignumber(a2) : bigNaN,
		a3: a3 && !isNaN(Number(a3)) ? math.bignumber(a3) : bigNaN,
		b1: b1 && !isNaN(Number(b1)) ? math.bignumber(b1) : bigNaN,
		b2: b2 && !isNaN(Number(b2)) ? math.bignumber(b2) : bigNaN,
		b3: b3 && !isNaN(Number(b3)) ? math.bignumber(b3) : bigNaN,
		c1: c1 && !isNaN(Number(c1)) ? math.bignumber(c1) : bigNaN,
		c2: c2 && !isNaN(Number(c2)) ? math.bignumber(c2) : bigNaN,
		c3: c3 && !isNaN(Number(c3)) ? math.bignumber(c3) : bigNaN,
		d1: d1 && !isNaN(Number(d1)) ? math.bignumber(d1) : bigNaN,
		d2: d2 && !isNaN(Number(d2)) ? math.bignumber(d2) : bigNaN,
		d3: d3 && !isNaN(Number(d3)) ? math.bignumber(d3) : bigNaN,
		delta: bigNaN,
	};

	scope.delta = math.evaluate(
		"(a1 * b2 * c3) +" +
		" (b1 * c2 * a3) +" +
		" (c1 * a2 * b3) -" +
		" (c1 * b2 * a3) -" +
		" (a1 * c2 * b3) -" +
		" (b1 * a2 * c3)",
		scope,
	) as BigNumber;
	const x = math.evaluate(
		"((d1 * b2 * c3) +" +
		" (b1 * c2 * d3) +" +
		" (c1 * d2 * b3) -" +
		" (c1 * b2 * d3) -" +
		" (d1 * c2 * b3) -" +
		" (b1 * d2 * c3)" +
		") / delta",
		scope,
	) as BigNumber;
	const y = math.evaluate(
		"((a1 * d2 * c3) +" +
		" (d1 * c2 * a3) +" +
		" (c1 * a2 * d3) -" +
		" (c1 * d2 * a3) -" +
		" (a1 * c2 * d3) -" +
		" (d1 * a2 * c3)" +
		") / delta",
		scope,
	) as BigNumber;
	const z = math.evaluate(
		"((a1 * b2 * d3) +" +
		" (b1 * d2 * a3) +" +
		" (d1 * a2 * b3) -" +
		" (d1 * b2 * a3) -" +
		" (a1 * d2 * b3) -" +
		" (b1 * a2 * d3)" +
		") / delta",
		scope,
	) as BigNumber;

	const inputs: InputInfoWritable[][] = [
		[
			{
				id: "a1",
				label: <>a<sub>1</sub></>,
				updateValue: setA1,
				value: a1,
			},
			{
				id: "b1",
				label: <>b<sub>1</sub></>,
				updateValue: setB1,
				value: b1,
			},
			{
				id: "c1",
				label: <>c<sub>1</sub></>,
				updateValue: setC1,
				value: c1,
			},
			{
				id: "d1",
				label: <>d<sub>1</sub></>,
				updateValue: setD1,
				value: d1,
			},
		],
		[
			{
				id: "a2",
				label: <>a<sub>2</sub></>,
				updateValue: setA2,
				value: a2,
			},
			{
				id: "b2",
				label: <>b<sub>2</sub></>,
				updateValue: setB2,
				value: b2,
			},
			{
				id: "c2",
				label: <>c<sub>2</sub></>,
				updateValue: setC2,
				value: c2,
			},
			{
				id: "d2",
				label: <>d<sub>2</sub></>,
				updateValue: setD2,
				value: d2,
			},
		],
		[
			{
				id: "a3",
				label: <>a<sub>3</sub></>,
				updateValue: setA3,
				value: a3,
			},
			{
				id: "b3",
				label: <>b<sub>3</sub></>,
				updateValue: setB3,
				value: b3,
			},
			{
				id: "c3",
				label: <>c<sub>3</sub></>,
				updateValue: setC3,
				value: c3,
			},
			{
				id: "d3",
				label: <>d<sub>3</sub></>,
				updateValue: setD3,
				value: d3,
			},
		],
	];

	const allInputsFilled = inputs.flat().every(({ value }) => {
		return value !== "";
	});

	const inputPreview = inputs.map((row, index) => {
		return (
			<Fragment key={index}>
				{row[0].value || row[0].label}x + {row[1].value || row[1].label}
				y + {row[2].value || row[2].label}
				z = {row[3].value || row[3].label}
				{index !== inputs.length - 1 && <br />}
			</Fragment>
		);
	});

	const results: InputInfo[] = [
		{
			id: "x",
			value: x.toString(),
		},
		{
			id: "y",
			value: y.toString(),
		},
		{
			id: "z",
			value: z.toString(),
		},
	];

	return (
		<main>
			<p>{inputPreview}</p>
			<InputBars inputs={inputs} />
			{allInputsFilled &&
				<>
					<hr />
					<ResultBars enforceNumber={true} results={results} />
				</>
			}
		</main>
	);
}

export default ThreeVarLinearEquations;
