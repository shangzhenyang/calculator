import { Fragment, useState } from "react";

import InputBar from "@/components/InputBar";

import type PageProps from "@/types/PageProps";

function ThreeVarLinearEquations({ math }: PageProps) {
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

	const scope = {
		a1: a1 && !isNaN(Number(a1)) ? math.bignumber(a1) : NaN,
		b1: b1 && !isNaN(Number(b1)) ? math.bignumber(b1) : NaN,
		c1: c1 && !isNaN(Number(c1)) ? math.bignumber(c1) : NaN,
		d1: d1 && !isNaN(Number(d1)) ? math.bignumber(d1) : NaN,

		a2: a2 && !isNaN(Number(a2)) ? math.bignumber(a2) : NaN,
		b2: b2 && !isNaN(Number(b2)) ? math.bignumber(b2) : NaN,
		c2: c2 && !isNaN(Number(c2)) ? math.bignumber(c2) : NaN,
		d2: d2 && !isNaN(Number(d2)) ? math.bignumber(d2) : NaN,

		a3: a3 && !isNaN(Number(a3)) ? math.bignumber(a3) : NaN,
		b3: b3 && !isNaN(Number(b3)) ? math.bignumber(b3) : NaN,
		c3: c3 && !isNaN(Number(c3)) ? math.bignumber(c3) : NaN,
		d3: d3 && !isNaN(Number(d3)) ? math.bignumber(d3) : NaN,

		delta: 0
	};

	scope.delta = math.evaluate("(a1 * b2 * c3) + (b1 * c2 * a3) + (c1 * a2 * b3) - (c1 * b2 * a3) - (a1 * c2 * b3) - (b1 * a2 * c3)", scope);
	const x = math.evaluate("((d1 * b2 * c3) + (b1 * c2 * d3) + (c1 * d2 * b3) - (c1 * b2 * d3) - (d1 * c2 * b3) - (b1 * d2 * c3)) / delta", scope);
	const y = math.evaluate("((a1 * d2 * c3) + (d1 * c2 * a3) + (c1 * a2 * d3) - (c1 * d2 * a3) - (a1 * c2 * d3) - (d1 * a2 * c3)) / delta", scope);
	const z = math.evaluate("((a1 * b2 * d3) + (b1 * d2 * a3) + (d1 * a2 * b3) - (d1 * b2 * a3) - (a1 * d2 * b3) - (b1 * a2 * d3)) / delta", scope);

	const inputs = [
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
			},
			{
				id: "d1",
				label: (
					<>d<sub>1</sub></>
				),
				value: d1,
				setValue: setD1
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
			},
			{
				id: "d2",
				label: (
					<>d<sub>2</sub></>
				),
				value: d2,
				setValue: setD2
			}
		],
		[
			{
				id: "a3",
				label: (
					<>a<sub>3</sub></>
				),
				value: a3,
				setValue: setA3
			},
			{
				id: "b3",
				label: (
					<>b<sub>3</sub></>
				),
				value: b3,
				setValue: setB3
			},
			{
				id: "c3",
				label: (
					<>c<sub>3</sub></>
				),
				value: c3,
				setValue: setC3
			},
			{
				id: "d3",
				label: (
					<>d<sub>3</sub></>
				),
				value: d3,
				setValue: setD3
			}
		]
	] as const;

	const inputBars = inputs.map((row, index) => {
		const rows = row.map(({ id, label, value, setValue }) => {
			return (
				<InputBar
					id={id}
					key={id}
					type="number"
					value={value}
					onChange={setValue}
				>{label}</InputBar>
			);
		});

		return (
			<Fragment key={index}>
				{rows}
				{index !== inputs.length - 1 && <hr />}
			</Fragment>
		);
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

	const allInputsFilled = inputs.flat().every(({ value }) => {
		return value !== "";
	});

	const results = [
		{
			id: "x",
			label: (
				<>x =</>
			),
			value: x
		},
		{
			id: "y",
			label: (
				<>y =</>
			),
			value: y
		},
		{
			id: "z",
			label: (
				<>z =</>
			),
			value: z
		}
	];

	const resultBars = results.map(({ id, label, value }) => {
		return (
			<InputBar
				id={id}
				key={id}
				type="text"
				value={(value * 1).toString()} // to eliminate negative zero
			>{label}</InputBar>
		);
	});

	return (
		<main>
			<p>{inputPreview}</p>
			{inputBars}
			{allInputsFilled && <>
				<hr />
				{resultBars}
			</>}
		</main>
	);
}

export default ThreeVarLinearEquations;
