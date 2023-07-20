import { Fragment, useState } from "react";
import { t } from "i18next";

import InputBars from "@/components/InputBars";
import ResultBars from "@/components/ResultBars";

import type { InputInfo, InputInfoWritable, PageProps } from "@/types";

function LinearFormula({ math }: PageProps): JSX.Element {
	const [x1, setX1] = useState<string>("");
	const [y1, setY1] = useState<string>("");

	const [x2, setX2] = useState<string>("");
	const [y2, setY2] = useState<string>("");

	const bigNaN = math.bignumber(NaN);
	const scope: Record<string, math.BigNumber> = {
		x1: x1 && !isNaN(Number(x1)) ? math.bignumber(x1) : bigNaN,
		y1: y1 && !isNaN(Number(y1)) ? math.bignumber(y1) : bigNaN,

		x2: x2 && !isNaN(Number(x2)) ? math.bignumber(x2) : bigNaN,
		y2: y2 && !isNaN(Number(y2)) ? math.bignumber(y2) : bigNaN,
	};

	const k = math.evaluate("(y1 - y2) / (x1 - x2)", scope);
	const b = math.evaluate("((-x1 * y2) + (x2 * y1)) / (x2 - x1)", scope);
	const distance = math.evaluate("sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))",
		scope);

	const inputs: InputInfoWritable[][] = [
		[
			{
				id: "x1",
				label: <>x<sub>1</sub></>,
				value: x1,
				updateValue: setX1,
			},
			{
				id: "y1",
				label: <>y<sub>1</sub></>,
				value: y1,
				updateValue: setY1,
			},
		],
		[
			{
				id: "x2",
				label: <>x<sub>2</sub></>,
				value: x2,
				updateValue: setX2,
			},
			{
				id: "y2",
				label: <>y<sub>2</sub></>,
				value: y2,
				updateValue: setY2,
			},
		],
	];

	const allInputsFilled = inputs.flat().every(({ value }) => {
		return value !== "";
	});

	const pointLetters = ["a", "b"];
	const inputPreview = inputs.map((row, index) => {
		return (
			<Fragment key={index}>
				{pointLetters[index]} ({row[0].value || row[0].label}, {row[1].value || row[1].label})
				{index !== inputs.length - 1 && <br />}
			</Fragment>
		);
	});

	const kRounded = math.round(k, 4);
	const bRounded = math.round(b, 4);

	const results: InputInfo[] = [
		{
			id: "k",
			value: k,
		},
		{
			id: "b",
			value: b,
		},
		{
			id: "y",
			value: `${kRounded} * x + (${bRounded})`,
		},
		{
			id: "distance",
			label: <>{t("distanceBetweenTwoPoints")}</>,
			value: distance,
		},
	];

	return (
		<main>
			<p>{inputPreview}</p>
			<InputBars inputs={inputs} />
			{allInputsFilled &&
				<>
					<hr />
					<ResultBars enforceNumber={false} results={results} />
				</>
			}
		</main>
	);
}

export default LinearFormula;
