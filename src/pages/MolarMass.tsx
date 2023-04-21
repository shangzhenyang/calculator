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

	const hasSelectedElement = !!selectedElement &&
		!isErrorResult(selectedElement);

	const calculate = (newElement: AllResult, newMole: string) => {
		if (!newMole || isNaN(Number(newMole)) || isErrorResult(newElement)) {
			return;
		}
		const newMoleNum = math.bignumber(newMole);
		const particleResult = math.multiply(
			newMoleNum,
			math.multiply(math.bignumber(6.022), 1e+23)
		);
		setParticle(math.format(particleResult));
		const massResult = math.multiply(
			newMoleNum,
			math.bignumber(newElement.mass)
		);
		setMass(math.format(massResult));
	};

	const calculateBasedOnMass = (newMass: string) => {
		if (
			!newMass ||
			isNaN(Number(newMass)) ||
			!selectedElement ||
			isErrorResult(selectedElement)
		) {
			return;
		}
		const newMassNum = math.bignumber(newMass);
		const moleResult = math.divide(
			newMassNum,
			math.bignumber(selectedElement.mass)
		);
		setMole(math.format(moleResult));
		const particleResult = math.multiply(
			moleResult,
			math.multiply(math.bignumber(6.022), 1e+23)
		);
		setParticle(math.format(particleResult));
	};

	const calculateBasedOnParticle = (newParticle: string) => {
		if (
			!newParticle ||
			isNaN(Number(newParticle)) ||
			!selectedElement ||
			isErrorResult(selectedElement)
		) {
			return;
		}
		const newParticleNum = math.bignumber(newParticle);
		const moleResult = math.divide(
			newParticleNum,
			math.multiply(math.bignumber(6.022), 1e+23)
		);
		setMole(math.format(moleResult));
		const massResult = math.multiply(
			moleResult,
			math.bignumber(selectedElement.mass)
		);
		setMass(math.format(massResult));
	};

	const handleMassChange = (newValue: string) => {
		setMass(newValue);
		calculateBasedOnMass(newValue);
	};

	const handleMoleChange = (newValue: string) => {
		if (!hasSelectedElement) {
			return;
		}
		setMole(newValue);
		calculate(selectedElement, newValue);
	};

	const handleParticleChange = (newValue: string) => {
		setParticle(newValue);
		calculateBasedOnParticle(newValue);
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
				hasError={!!searchTerm && !hasSelectedElement}
				list="element-list"
				placeholder="enterElementOrCompound"
				value={searchTerm}
				onChange={handleSearchTermChange}
			>
				{hasSelectedElement && <div>{selectedElement.symbol}</div>}
			</MainInputBar>
			<datalist id="element-list">{elementOptions}</datalist>
			{hasSelectedElement && <div>
				<InputBar
					hasError={!mole || isNaN(Number(mole))}
					id="mole"
					label="mole"
					value={mole}
					setValue={handleMoleChange}
				/>
				<InputBar
					hasError={!particle || isNaN(Number(particle))}
					id="particle"
					label="particle"
					value={particle}
					setValue={handleParticleChange}
				/>
				<InputBar
					id="mass"
					label="mass"
					value={mass}
					setValue={handleMassChange}
				/>
			</div>}
		</main>
	);
}

export default MolarMass;
