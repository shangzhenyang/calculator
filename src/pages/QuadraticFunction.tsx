import { useEffect, useState } from "react";
import { t } from "i18next";

import InputBar from "@/components/InputBar";
import InputBars from "@/components/InputBars";

import type InputInfoWritable from "@/types/InputInfoWritable";
import type PageProps from "@/types/PageProps";

function QuadraticFunction({ math }: PageProps) {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");
	const [x, setX] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		a: a && !isNaN(Number(a)) ? math.bignumber(a) : bigNaN,
		b: b && !isNaN(Number(b)) ? math.bignumber(b) : bigNaN,
		c: c && !isNaN(Number(c)) ? math.bignumber(c) : bigNaN,
		x: x && !isNaN(Number(x)) ? math.bignumber(x) : bigNaN,

		delta: bigNaN
	};

	const h = math.evaluate("-b / (2 * a)", scope);
	const k = math.evaluate("(4 * a * c - pow(b, 2)) / (4 * a)", scope);
	const y = math.evaluate("a * pow(x, 2) + b * x + c", scope);

	const hRounded = math.round(h, 2).toString();
	const kRounded = math.round(k, 2).toString();

	const xIntercepts = [];
	scope.delta = math.evaluate("pow(b, 2) - 4 * a * c", scope);
	const delta = Number(scope.delta);
	if (delta > 0) {
		const x1 = math.evaluate("(-b + sqrt(delta)) / (2 * a)", scope);
		const x2 = math.evaluate("(-b - sqrt(delta)) / (2 * a)", scope);
		xIntercepts.push(x1, x2);
	} else if (delta === 0) {
		xIntercepts.push(h);
	}
	const xInterceptStr = xIntercepts.map((x) => {
		return `(${math.round(x, 2).toString()}, 0)`;
	}).join(` ${t("and").toString()} `) || t("none").toString();

	const isUpward = parseInt(a) > 0;
	const extremumType = isUpward ? "minimum" : "maximum";

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

	useEffect(() => {
		setX(h);
	}, [a, b, c]);

	return (
		<main>
			<p>
				y = {a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} (a ≠ 0)
			</p>
			<InputBars inputs={[inputs]} />
			{allInputsFilled && <>
				<p>
					{t("vertexForm")}{t("colon")}y = {a}(x - ({hRounded}))
					<sup>2</sup> + ({kRounded})
					<br />
					{t("symmetryAxis")}{t("colon")}{t("line")} x = {hRounded}
					<br />
					{t("vertexPointCoordinates")}{t("colon")}
					({hRounded}, {kRounded})
					<br />
					{t("parabolaOpening")}{t("colon")}
					{t(isUpward ? "upward" : "downward")}
					<br />
					{t("xIncrease", {
						comparison: ">",
						number: hRounded,
						delta: t(isUpward ? "increases" : "decreases")
					})}
					<br />
					{t("xIncrease", {
						comparison: "<",
						number: hRounded,
						delta: t(isUpward ? "decreases" : "increases")
					})}
					<br />
					{t(extremumType)}{t("colon")}y = {kRounded}
					<br />
					{t("xIntercept")}{t("colon")}{xInterceptStr}
					<br />
					{t("yIntercept")}{t("colon")}(0, {c})
				</p>
				<InputBar
					id="x"
					type="number"
					value={x}
					onChange={setX}
				>x</InputBar>
				<InputBar
					id="y"
					type="text"
					value={y.toString()}
				>y</InputBar>
			</>}
		</main>
	);
}

export default QuadraticFunction;
