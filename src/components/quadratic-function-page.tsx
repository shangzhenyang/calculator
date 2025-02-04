import InputBar from "@/components/input-bar";
import InputBars from "@/components/input-bars";
import globals from "@/globals";
import { InputWritableInfo } from "@/types";
import { t } from "i18next";
import { BigNumber } from "mathjs";
import { JSX, useEffect, useState } from "react";

const { bigNan, math } = globals;

function QuadraticFunctionPage(): JSX.Element {
	const [a, setA] = useState<string>("");
	const [b, setB] = useState<string>("");
	const [c, setC] = useState<string>("");
	const [x, setX] = useState<string>("");

	const scope: Record<string, math.BigNumber> = {
		a: a && !isNaN(Number(a)) ? math.bignumber(a) : bigNan,
		b: b && !isNaN(Number(b)) ? math.bignumber(b) : bigNan,
		c: c && !isNaN(Number(c)) ? math.bignumber(c) : bigNan,
		delta: bigNan,
		x: x && !isNaN(Number(x)) ? math.bignumber(x) : bigNan,
	};

	const h = math.evaluate("-b / (2 * a)", scope) as BigNumber;
	const k = math.evaluate(
		"(4 * a * c - pow(b, 2)) / (4 * a)",
		scope,
	) as BigNumber;
	const y = math.evaluate("a * pow(x, 2) + b * x + c", scope) as BigNumber;

	const hRounded = math.round(h, 2).toString();
	const kRounded = math.round(k, 2).toString();

	const xIntercepts = [];
	scope.delta = math.evaluate("pow(b, 2) - 4 * a * c", scope) as BigNumber;
	const delta = Number(scope.delta);
	if (delta > 0) {
		const x1 = math.evaluate(
			"(-b + sqrt(delta)) / (2 * a)",
			scope,
		) as BigNumber;
		const x2 = math.evaluate(
			"(-b - sqrt(delta)) / (2 * a)",
			scope,
		) as BigNumber;
		if (!isNaN(Number(x1)) && !isNaN(Number(x2))) {
			xIntercepts.push(x1, x2);
		}
	} else if (delta === 0) {
		if (!isNaN(Number(h))) {
			xIntercepts.push(h);
		}
	}
	const xInterceptStr =
		xIntercepts.length > 0
			? xIntercepts
					.map((x) => `(${math.round(x, 2).toString()}, 0)`)
					.join(` ${t("and").toString()} `)
			: t("none").toString();

	const isDownward = Number(a) < 0;
	const isUpward = Number(a) > 0;
	const extremumType = isUpward ? "minimum" : "maximum";

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

	useEffect(() => {
		setX(h.toString());
	}, [a, b, c, h]);

	return (
		<main>
			<p>
				y = {a || "a"}x<sup>2</sup> + {b || "b"}x + {c || "c"} (a ≠ 0)
			</p>
			<InputBars inputs={[inputs]} />
			{allInputsFilled && (
				<>
					<p>
						{t("vertexForm")}
						{t("colon")}y = {a}(x - ({hRounded}))
						<sup>2</sup> + ({kRounded})
						<br />
						{t("symmetryAxis")}
						{t("colon")}
						{t("line")} x = {hRounded}
						<br />
						{t("vertexPointCoordinates")}
						{t("colon")}({hRounded}, {kRounded})
						<br />
						{t("parabolaOpening")}
						{t("colon")}
						{isUpward && t("upward")}
						{isDownward && t("downward")}
						<br />
						{t("xIncrease", {
							comparison: ">",
							delta: t(isUpward ? "increases" : "decreases"),
							number: hRounded,
						})}
						<br />
						{t("xIncrease", {
							comparison: "<",
							delta: t(isUpward ? "decreases" : "increases"),
							number: hRounded,
						})}
						<br />
						{t(extremumType)}
						{t("colon")}y = {kRounded}
						<br />
						{t("xIntercept")}
						{t("colon")}
						{xInterceptStr}
						<br />
						{t("yIntercept")}
						{t("colon")}(0, {c})
					</p>
					<InputBar
						type="number"
						value={x}
						onChange={setX}
					>
						x
					</InputBar>
					<InputBar
						type="text"
						value={y.toString()}
					>
						y
					</InputBar>
				</>
			)}
		</main>
	);
}

export default QuadraticFunctionPage;
