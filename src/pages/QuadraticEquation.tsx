import { useState } from "react";

import InputBar from "@/components/InputBar";

import type { Dispatch, SetStateAction } from "react";
import type PageProps from "@/types/PageProps";

function QuadraticEquation({ math }: PageProps) {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");

	const scope = {
		a: a ? math.bignumber(a) : NaN,
		b: b ? math.bignumber(b) : NaN,
		c: c ? math.bignumber(c) : NaN,
		delta: 0
	};
	scope.delta = math.evaluate("pow(b, 2) - 4 * a * c", scope);
	const hasSolutions = scope.delta >= 0;
	const delta = scope.delta + (() => {
		if (scope.delta > 0) {
			return " > 0";
		} else if (scope.delta < 0) {
			return " < 0";
		} else {
			return " = 0";
		}
	})();
	const x1: string = hasSolutions ?
		math.evaluate("(-b + sqrt(delta)) / (2 * a)", scope) : "NaN";
	const x2: string = hasSolutions ?
		math.evaluate("(-b - sqrt(delta)) / (2 * a)", scope) : "NaN";

	const inputs = {
		a: [a, setA],
		b: [b, setB],
		c: [c, setC],
	} as const;

	const inputBars = Object.keys(inputs).map((key) => {
		const [value, setValue] = inputs[key as keyof typeof inputs] as [
			string,
			Dispatch<SetStateAction<string>>
		];
		return (
			<InputBar
				id={key}
				key={key}
				type="number"
				value={value}
				onChange={setValue}
			>{key} =</InputBar>
		);
	});

	const results = [{
		id: "delta",
		label: (<>Δ =</>),
		value: delta
	}, {
		id: "x1",
		label: (<>x<sub>1</sub> =</>),
		value: x1
	}, {
		id: "x2",
		label: (<>x<sub>2</sub> =</>),
		value: x2
	}] as const;

	const resultBars = results.map((result) => {
		return (
			<InputBar
				id={result.id}
				key={result.id}
				type="text"
				value={result.value}
			>{result.label}</InputBar>
		);
	});

	return (
		<main>
			<p>
				{a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} = 0 (a ≠ 0)
			</p>
			{inputBars}
			{a && b && c && <>
				<hr />
				{resultBars}
			</>}
		</main>
	);
}

export default QuadraticEquation;
