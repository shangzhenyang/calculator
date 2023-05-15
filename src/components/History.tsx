import { t } from "i18next";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";

import styles from "@/styles/History.module.css";

interface Props {
	historyItems: string[];
	showAddButton?: boolean;
	showClearButton?: boolean;
	addToHistory?: () => void;
	updateHistoryItems: (callback: (value: string[]) => string[]) => void;
	updateInputValue?: (newValue: string) => void;
}

function History({
	historyItems,
	showAddButton,
	showClearButton,
	addToHistory,
	updateHistoryItems,
	updateInputValue
}: Props) {
	const handleClearHistoryClick = () => {
		updateHistoryItems(() => {
			return [];
		});
		updateInputValue?.("");
	};

	const historyListItems = historyItems.map((value, index) => {
		const handleDeleteClick = () => {
			updateHistoryItems((prevHistoryItems) => {
				const newHistoryItems = [...prevHistoryItems];
				newHistoryItems.splice(index, 1);
				return newHistoryItems;
			});
		};

		const handleEnterClick = () => {
			updateInputValue?.(value);
		};

		return (
			<li key={index}>
				<div className={styles["list-item-main"]}>{value}</div>
				{updateInputValue && <button
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
