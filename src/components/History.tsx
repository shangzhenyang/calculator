import BlockButton from "@/components/BlockButton";
import styles from "@/styles/History.module.css";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";

interface HistoryProps {
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
			<li key={index}>
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
		<div className={styles["history"]}>
			{showAddButton && addToHistory && (
				<BlockButton
					icon={faCirclePlus}
					label="addToHistory"
					onClick={addToHistory}
				/>
			)}
			{showClearButton && (
				<BlockButton
					icon={faBroom}
					label="clearHistory"
					onClick={handleClearHistoryClick}
				/>
			)}
			<ul>{historyListItems}</ul>
		</div>
	);
}

export default History;
