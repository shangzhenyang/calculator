import History from "@/components/History";
import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";
import { PageProps } from "@/types";
import {
	AllResult,
	elements,
	getCompound,
	isErrorResult,
} from "@shangzhen/periodic-table";
import i18n, { t } from "i18next";
import { useState } from "react";

function MolarMass({ math }: PageProps): JSX.Element {
	const [historyItems, setHistoryItems] = useState<string[]>([]);
	const [mass, setMass] = useState<string>("");
	const [mole, setMole] = useState<string>("1");
	const [particle, setParticle] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedElement, setSelectedElement] = useState<AllResult>();

	const hasSelectedElement = !!selectedElement &&
		!isErrorResult(selectedElement);

	const hasMassError = !mass || isNaN(Number(mass));
	const hasMoleError = !mole || isNaN(Number(mole));
	const hasParticleError = !particle || isNaN(Number(particle));

	const addToHistory = (): void => {
		if (!hasSelectedElement) {
			return;
		}
		let moleNum = Number(mole);
		if (isNaN(moleNum)) {
			moleNum = 1;
		}
		if (mole.includes(".")) {
			moleNum = math.round(moleNum);
		}
		if (moleNum < 1) {
			moleNum = 1;
		}
		const newMoleStr = moleNum.toString();
		setMole(newMoleStr);
		const massResultStr = calculate(selectedElement, newMoleStr);
		const resultParts = [];
		if (moleNum > 1) {
			resultParts.push(moleNum);
		}
		resultParts.push(selectedElement.symbol);
		resultParts.push("-");
		resultParts.push(massResultStr);
		const valueToAdd = resultParts.join("");
		setHistoryItems((prevHistoryItems) => {
			return [valueToAdd, ...prevHistoryItems];
		});
	};

	const calculate = (newElement: AllResult, newMole: string): string => {
		if (!newMole || isNaN(Number(newMole)) || isErrorResult(newElement)) {
			return "";
		}
		const newMoleNum = math.bignumber(newMole);
		const particleResult = math.multiply(
			newMoleNum,
			math.multiply(math.bignumber(6.022), 1e+23),
		);
		setParticle(math.format(particleResult));
		const massResult = math.multiply(
			newMoleNum,
			math.bignumber(newElement.mass),
		);
		const massResultStr = math.format(massResult);
		setMass(massResultStr);
		return massResultStr;
	};

	const calculateBasedOnMass = (newMass: string): void => {
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
			math.bignumber(selectedElement.mass),
		);
		setMole(math.format(moleResult));
		const particleResult = math.multiply(
			moleResult,
			math.multiply(math.bignumber(6.022), 1e+23),
		);
		setParticle(math.format(particleResult));
	};

	const calculateBasedOnParticle = (newParticle: string): void => {
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
			math.multiply(math.bignumber(6.022), 1e+23),
		);
		setMole(math.format(moleResult));
		const massResult = math.multiply(
			moleResult,
			math.bignumber(selectedElement.mass),
		);
		setMass(math.format(massResult));
	};

	const handleMassChange = (newValue: string): void => {
		setMass(newValue);
		calculateBasedOnMass(newValue);
	};

	const handleMoleChange = (newValue: string): void => {
		if (!hasSelectedElement) {
			return;
		}
		setMole(newValue);
		calculate(selectedElement, newValue);
	};

	const handleParticleChange = (newValue: string): void => {
		setParticle(newValue);
		calculateBasedOnParticle(newValue);
	};

	const handleSearchTermChange = (newValue: string): void => {
		setSearchTerm(newValue);
		const result = getCompound(newValue);
		setSelectedElement(result);
		setMole("1");
		calculate(result, "1");
	};

	const updateHistoryItems = (
		callback: (value: string[]) => string[],
	): void => {
		setHistoryItems(callback);
	};

	const elementOptions = elements.map((element) => {
		const name = {
			"en-US": element.name,
			"zh-CN": element.name_chs,
			"zh-TW": element.name_cht,
		}[i18n.language];

		return (
			<option key={element.symbol} value={element.symbol}>
				{element.number}. {name}
			</option>
		);
	});

	const inputs = [
		{
			hasError: hasMoleError,
			label: "mole",
			onChange: handleMoleChange,
			value: mole,
		},
		{
			hasError: hasParticleError,
			label: "particle",
			onChange: handleParticleChange,
			value: particle,
		},
		{
			hasError: hasMassError,
			label: "mass",
			onChange: handleMassChange,
			value: mass,
		},
	] as const;

	const inputBars = inputs.map((input) => {
		return (
			<InputBar
				hasError={input.hasError}
				id={input.label}
				key={input.label}
				type="number"
				value={input.value}
				onChange={input.onChange}
			>
				{t(input.label)}
			</InputBar>
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
				<div>
					{hasSelectedElement ? selectedElement.symbol : "N/A"}
				</div>
			</MainInputBar>
			<datalist id="element-list">{elementOptions}</datalist>
			{hasSelectedElement && <div>{inputBars}</div>}
			<History
				historyItems={historyItems}
				showAddButton={
					hasSelectedElement &&
					!hasMassError &&
					!hasMoleError &&
					!hasParticleError
				}
				addToHistory={addToHistory}
				updateHistoryItems={updateHistoryItems}
			/>
		</main>
	);
}

export default MolarMass;
