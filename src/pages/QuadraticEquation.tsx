import { useState } from "react";

import InputBar from "@/components/InputBar";

import type PageProps from "@/types/PageProps";

function QuadraticEquation({ math }: PageProps) {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");

	const scope = {
		a: a && !isNaN(Number(a)) ? math.bignumber(a) : NaN,
		b: b && !isNaN(Number(b)) ? math.bignumber(b) : NaN,
		c: c && !isNaN(Number(c)) ? math.bignumber(c) : NaN,
		delta: 0
	};
	scope.delta = math.evaluate("pow(b, 2) - (4 * a * c)", scope);
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

	const inputs = [
		{
			id: "a",
			value: a,
			setValue: setA
		},
		{
			id: "b",
			value: b,
			setValue: setB
		},
		{
			id: "c",
			value: c,
			setValue: setC
		}
	] as const;

	const inputBars = inputs.map(({ id, value, setValue }) => {
		return (
			<InputBar
				id={id}
				key={id}
				type="number"
				value={value}
				onChange={setValue}
			>{id} =</InputBar>
		);
	});

	const allInputsFilled = inputs.every(({ value }) => {
		return value !== "";
	});

	const results = [
		{
			id: "delta",
			label: (
				<>Δ =</>
			),
			value: delta
		},
		{
			id: "x1",
			label: (
				<>x<sub>1</sub> =</>
			),
			value: x1
		},
		{
			id: "x2",
			label: (
				<>x<sub>2</sub> =</>
			),
			value: x2
		}
	] as const;

	const resultBars = results.map(({ id, label, value }) => {
		return (
			<InputBar
				id={id}
				key={id}
				type="text"
				value={value}
			>{label}</InputBar>
		);
	});

	return (
		<main>
			<p>
				{a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} = 0 (a ≠ 0)
			</p>
			{inputBars}
			{allInputsFilled && <>
				<hr />
				{resultBars}
			</>}
		</main>
	);
}

export default QuadraticEquation;
