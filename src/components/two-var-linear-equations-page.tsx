import InputBars from "@/components/input-bars";
import ResultBars from "@/components/result-bars";
import globals from "@/globals";
import { InputInfo, InputWritableInfo } from "@/types";
import { BigNumber } from "mathjs";
import { Fragment, JSX, useState } from "react";

const { bigNan, math } = globals;

function TwoVarLinearEquationsPage(): JSX.Element {
	const [a1, setA1] = useState<string>("");
	const [b1, setB1] = useState<string>("");
	const [c1, setC1] = useState<string>("");

	const [a2, setA2] = useState<string>("");
	const [b2, setB2] = useState<string>("");
	const [c2, setC2] = useState<string>("");

	const scope: Record<string, math.BigNumber> = {
		a1: a1 && !isNaN(Number(a1)) ? math.bignumber(a1) : bigNan,
		a2: a2 && !isNaN(Number(a2)) ? math.bignumber(a2) : bigNan,
		b1: b1 && !isNaN(Number(b1)) ? math.bignumber(b1) : bigNan,
		b2: b2 && !isNaN(Number(b2)) ? math.bignumber(b2) : bigNan,
		c1: c1 && !isNaN(Number(c1)) ? math.bignumber(-Number(c1)) : bigNan,
		c2: c2 && !isNaN(Number(c2)) ? math.bignumber(-Number(c2)) : bigNan,
	};

	const x = math.evaluate(
		"((b1 * c2) - (b2 * c1)) / ((a1 * b2) - (b1 * a2))",
		scope,
	) as BigNumber;
	const y = math.evaluate(
		"((a1 * c2) - (a2 * c1)) / ((b1 * a2) - (a1 * b2))",
		scope,
	) as BigNumber;

	const inputs: InputWritableInfo[][] = [
		[
			{
				id: "a1",
				label: (
					<>
						a<sub>1</sub>
					</>
				),
				updateValue: setA1,
				value: a1,
			},
			{
				id: "b1",
				label: (
					<>
						b<sub>1</sub>
					</>
				),
				updateValue: setB1,
				value: b1,
			},
			{
				id: "c1",
				label: (
					<>
						c<sub>1</sub>
					</>
				),
				updateValue: setC1,
				value: c1,
			},
		],
		[
			{
				id: "a2",
				label: (
					<>
						a<sub>2</sub>
					</>
				),
				updateValue: setA2,
				value: a2,
			},
			{
				id: "b2",
				label: (
					<>
						b<sub>2</sub>
					</>
				),
				updateValue: setB2,
				value: b2,
			},
			{
				id: "c2",
				label: (
					<>
						c<sub>2</sub>
					</>
				),
				updateValue: setC2,
				value: c2,
			},
		],
	];

	const allInputsFilled = inputs.flat().every(({ value }) => value !== "");

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
			value: x.toString(),
		},
		{
			id: "y",
			value: y.toString(),
		},
	];

	return (
		<main>
			<p>{inputPreview}</p>
			<InputBars inputs={inputs} />
			{allInputsFilled && (
				<>
					<hr />
					<ResultBars
						enforceNumber={true}
						results={results}
					/>
				</>
			)}
		</main>
	);
}

export default TwoVarLinearEquationsPage;
