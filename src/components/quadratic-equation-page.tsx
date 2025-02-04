import InputBars from "@/components/input-bars";
import ResultBars from "@/components/result-bars";
import globals from "@/globals";
import { InputInfo, InputWritableInfo } from "@/types";
import { BigNumber } from "mathjs";
import { JSX, useState } from "react";

const { bigNan, math } = globals;

function QuadraticEquationPage(): JSX.Element {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");

	const scope: Record<string, math.BigNumber> = {
		a: a && !isNaN(Number(a)) ? math.bignumber(a) : bigNan,
		b: b && !isNaN(Number(b)) ? math.bignumber(b) : bigNan,
		c: c && !isNaN(Number(c)) ? math.bignumber(c) : bigNan,

		delta: bigNan,
	};

	scope.delta = math.evaluate("pow(b, 2) - (4 * a * c)", scope) as BigNumber;
	const delta = Number(scope.delta);
	const hasSolutions = delta >= 0;
	const deltaStr =
		delta +
		((): string => {
			if (delta > 0) {
				return " > 0";
			} else if (delta < 0) {
				return " < 0";
			} else {
				return " = 0";
			}
		})();
	const x1: string = hasSolutions
		? (
				math.evaluate(
					"(-b + sqrt(delta)) / (2 * a)",
					scope,
				) as BigNumber
			).toString()
		: "NaN";
	const x2: string = hasSolutions
		? (
				math.evaluate(
					"(-b - sqrt(delta)) / (2 * a)",
					scope,
				) as BigNumber
			).toString()
		: "NaN";

	const inputs: InputWritableInfo[] = [
		{
			hasError: !!a && Number(a) === 0,
			id: "a",
			updateValue: setA,
			value: a,
		},
		{
			id: "b",
			updateValue: setB,
			value: b,
		},
		{
			id: "c",
			updateValue: setC,
			value: c,
		},
	];

	const allInputsFilled = inputs.every(({ value }) => value !== "");

	const results: InputInfo[] = [
		{
			id: "delta",
			label: <>Δ</>,
			value: deltaStr,
		},
		{
			id: "x1",
			label: (
				<>
					x<sub>1</sub>
				</>
			),
			value: x1,
		},
		{
			id: "x2",
			label: (
				<>
					x<sub>2</sub>
				</>
			),
			value: x2,
		},
	];

	return (
		<main>
			<p>
				{a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} = 0 (a ≠ 0)
			</p>
			<InputBars inputs={[inputs]} />
			{allInputsFilled && (
				<>
					<hr />
					<ResultBars
						enforceNumber={false}
						results={results}
					/>
				</>
			)}
		</main>
	);
}

export default QuadraticEquationPage;
