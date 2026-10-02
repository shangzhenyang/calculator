import BlockButton from "@/components/block-button";
import styles from "@/components/history.module.css";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import type { JSX } from "react";

interface HistoryProps {
	historyItems: string[];
	shouldShowAddButton?: boolean;
	shouldShowClearButton?: boolean;
	addToHistory?: () => void;
	updateHistoryItems: (callback: (value: string[]) => string[]) => void;
	updateInputValue?: (newValue: string) => void;
}

function History({
	historyItems,
	shouldShowAddButton,
	shouldShowClearButton,
	addToHistory,
	updateHistoryItems,
	updateInputValue,
}: HistoryProps): JSX.Element {
	const handleClearHistoryClick = (): void => {
		updateHistoryItems(() => []);
		updateInputValue?.("");
	};

	const historyListItems = historyItems.map((value, index) => {
		const handleDeleteClick = (): void => {
			updateHistoryItems((prevHistoryItems) => {
				const newHistoryItems = [...prevHistoryItems];
				newHistoryItems.splice(index, 1);
				return newHistoryItems;
			});
		};

		const handleEnterClick = (): void => {
			updateInputValue?.(value);
		};

		return (
			<li
				className={styles["list-item"]}
				key={index}
			>
				<div className={styles["list-item-main"]}>{value}</div>
				{updateInputValue && (
					<button
						type="button"
						onClick={handleEnterClick}
					>
						{t("enter")}
					</button>
				)}
				<button
					type="button"
					onClick={handleDeleteClick}
				>
					{t("delete")}
				</button>
			</li>
		);
	});

	return (
		<div className={styles["container"]}>
			{shouldShowAddButton && addToHistory && (
				<BlockButton
					icon={faCirclePlus}
					onClick={addToHistory}
				>
					{t("addToHistory")}
				</BlockButton>
			)}
			{shouldShowClearButton && (
				<BlockButton
					icon={faBroom}
					onClick={handleClearHistoryClick}
				>
					{t("clearHistory")}
				</BlockButton>
			)}
			<ul className={styles["list"]}>{historyListItems}</ul>
		</div>
	);
}

export default History;
