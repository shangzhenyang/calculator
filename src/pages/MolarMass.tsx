import { useState } from "react";
import i18n from "i18next";
import { elements, getCompound, isErrorResult } from "@shangzhen/periodic-table";

import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";

import type { ChangeEvent } from "react";
import type { AllResult } from "@shangzhen/periodic-table";
import type PageProps from "@/types/PageProps";

function MolarMass({ math }: PageProps) {
	const [mole, setMole] = useState<string>("1");
	const [mass, setMass] = useState<string>("");
	const [particle, setParticle] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedElement, setSelectedElement] = useState<AllResult>();

	const hasSelectedElement = selectedElement &&
		!isErrorResult(selectedElement);

	const calculate = (newElement: AllResult, newMole: string) => {
		if (isErrorResult(newElement)) {
			return;
		}
		const moleNum = math.bignumber(newMole);
		if (math.isNaN(moleNum) || moleNum.isZero()) {
			return;
		}
		const particleResult = math.multiply(
			math.multiply(moleNum, 6.022),
			1e+23
		);
		setParticle(math.format(particleResult));
		const massResult = math.multiply(
			moleNum,
			math.bignumber(newElement.mass)
		);
		setMass(math.format(massResult));
	};

	const handleSearchTermChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(evt.target.value);
		const result = getCompound(evt.target.value);
		setSelectedElement(result);
		setMole("1");
		calculate(result, "1");
	};

	const elementOptions = elements.map((element) => {
		const name = {
			"en-US": element.name,
			"zh-CN": element.name_chs,
			"zh-TW": element.name_cht
		}[i18n.language];

		return (
			<option key={element.symbol} value={element.symbol}>
				{element.number}. {name}
			</option>
		);
	});

	return (
		<main>
			<MainInputBar
				list="element-list"
				placeholder="enterElementOrCompound"
				value={searchTerm}
				onChange={handleSearchTermChange}
			>
				{hasSelectedElement && <div>{selectedElement.symbol}</div>}
			</MainInputBar>
			<datalist id="element-list">{elementOptions}</datalist>
			{hasSelectedElement && <>
				<InputBar
					id="mole"
					label="mole"
					value={mole}
					setValue={setMole}
				/>
				<InputBar
					id="particle"
					label="particle"
					value={particle}
					setValue={setParticle}
				/>
				<InputBar
					id="mass"
					label="mass"
					value={mass}
					setValue={setMass}
				/>
			</>}
		</main>
	);
}

export default MolarMass;
