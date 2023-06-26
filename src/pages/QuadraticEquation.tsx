import { useState } from "react";

import InputBars from "@/components/InputBars";
import ResultBars from "@/components/ResultBars";

import type InputInfo from "@/types/InputInfo";
import type InputInfoWritable from "@/types/InputInfoWritable";
import type PageProps from "@/types/PageProps";

function QuadraticEquation({ math }: PageProps): JSX.Element {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		a: a && !isNaN(Number(a)) ? math.bignumber(a) : bigNaN,
		b: b && !isNaN(Number(b)) ? math.bignumber(b) : bigNaN,
		c: c && !isNaN(Number(c)) ? math.bignumber(c) : bigNaN,

		delta: bigNaN
	};

	scope.delta = math.evaluate("pow(b, 2) - (4 * a * c)", scope);
	const delta = Number(scope.delta);
	const hasSolutions = delta >= 0;
	const deltaStr = delta + ((): string => {
		if (delta > 0) {
			return " > 0";
		} else if (delta < 0) {
			return " < 0";
		} else {
			return " = 0";
		}
	})();
	const x1: string = hasSolutions ?
		math.evaluate("(-b + sqrt(delta)) / (2 * a)", scope) : "NaN";
	const x2: string = hasSolutions ?
		math.evaluate("(-b - sqrt(delta)) / (2 * a)", scope) : "NaN";

	const inputs: InputInfoWritable[] = [
		{
			hasError: !!a && Number(a) === 0,
			id: "a",
			value: a,
			updateValue: setA
		},
		{
			id: "b",
			value: b,
			updateValue: setB
		},
		{
			id: "c",
			value: c,
			updateValue: setC
		}
	];

	const allInputsFilled = inputs.every(({ value }) => {
		return value !== "";
	});

	const results: InputInfo[] = [
		{
			id: "delta",
			label: (
				<>Δ</>
			),
			value: deltaStr
		},
		{
			id: "x1",
			label: (
				<>x<sub>1</sub></>
			),
			value: x1
		},
		{
			id: "x2",
			label: (
				<>x<sub>2</sub></>
			),
			value: x2
		}
	];

	return (
		<main>
			<p>
				{a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} = 0 (a ≠ 0)
			</p>
			<InputBars inputs={[inputs]} />
			{allInputsFilled && <>
				<hr />
				<ResultBars enforceNumber={false} results={results} />
			</>}
		</main>
	);
}

export default QuadraticEquation;
