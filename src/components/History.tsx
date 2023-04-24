import { useState } from "react";
import { t } from "i18next";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";

import styles from "@/styles/History.module.css";

interface Props {
	addToHistory: () => string | undefined;
	canAdd: boolean;
}

function History({ addToHistory, canAdd }: Props) {
	const [historyItems, setHistoryItems] = useState<string[]>([]);

	const handleAddToHistoryClick = () => {
		const valueToAdd = addToHistory();
		if (!valueToAdd) {
			return;
		}
		setHistoryItems((prevHistoryItems) => {
			return [...prevHistoryItems, valueToAdd];
		});
	};

	const historyListItems = historyItems.map((value, index) => {
		const handleDeleteClick = () => {
			setHistoryItems((prevHistoryItems) => {
				const newHistoryItems = [...prevHistoryItems];
				newHistoryItems.splice(index, 1);
				return newHistoryItems;
			});
		};

		return (
			<li key={index}>
				<div className={styles["list-item-main"]}>{value}</div>
				<button
					type="button"
					onClick={handleDeleteClick}
				>{t("delete")}</button>
			</li>
		);
	});

	return (
		<div className={styles["history"]}>
			{canAdd && <BlockButton
				icon={faCirclePlus}
				label="addToHistory"
				onClick={handleAddToHistoryClick}
			/>}
			<ul>{historyListItems}</ul>
		</div>
	);
}

export default History;
