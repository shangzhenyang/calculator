import { t } from "i18next";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";

import styles from "@/styles/History.module.css";

import type { Dispatch, SetStateAction } from "react";

interface Props {
	addToHistory?: () => void;
	historyItems: string[];
	setHistoryItems: Dispatch<SetStateAction<string[]>>;
	setInputValue?: Dispatch<SetStateAction<string>>;
	showAddButton?: boolean;
	showClearButton?: boolean;
}

function History({
	addToHistory,
	historyItems,
	setHistoryItems,
	setInputValue,
	showAddButton,
	showClearButton
}: Props) {
	const handleClearHistoryClick = () => {
		setHistoryItems([]);
	};

	const historyListItems = historyItems.map((value, index) => {
		const handleDeleteClick = () => {
			setHistoryItems((prevHistoryItems) => {
				const newHistoryItems = [...prevHistoryItems];
				newHistoryItems.splice(index, 1);
				return newHistoryItems;
			});
		};

		const handleEnterClick = () => {
			setInputValue?.(value);
		};

		return (
			<li key={index}>
				<div className={styles["list-item-main"]}>{value}</div>
				{setInputValue && <button
					type="button"
					onClick={handleEnterClick}
				>{t("enter")}</button>}
				<button
					type="button"
					onClick={handleDeleteClick}
				>{t("delete")}</button>
			</li>
		);
	});

	return (
		<div className={styles["history"]}>
			{showAddButton && addToHistory && <BlockButton
				icon={faCirclePlus}
				label="addToHistory"
				onClick={addToHistory}
			/>}
			{showClearButton && <BlockButton
				icon={faBroom}
				label="clearHistory"
				onClick={handleClearHistoryClick}
			/>}
			<ul>{historyListItems}</ul>
		</div>
	);
}

export default History;
