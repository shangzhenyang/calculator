import BlockButton from "@/components/block-button";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { t } from "i18next";
import { JSX } from "react";
import styled from "styled-components";

interface HistoryProps {
	historyItems: string[];
	showAddButton?: boolean;
	showClearButton?: boolean;
	addToHistory?: () => void;
	updateHistoryItems: (callback: (value: string[]) => string[]) => void;
	updateInputValue?: (newValue: string) => void;
}

const StyledHistoryContainer = styled.div`
	margin: 15px;
`;

const StyledHistoryList = styled.ul`
	margin: 15px 0;

	&:empty {
		display: none;
	}
`;

const StyledHistoryListItem = styled.li`
	background-color: var(--fg-alpha-1);
	display: flex;
	overflow: hidden;

	&:first-of-type {
		border-top-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
	}

	&:last-of-type {
		border-bottom-left-radius: var(--radius);
		border-bottom-right-radius: var(--radius);
	}

	&:nth-child(even) {
		background-color: var(--fg-alpha-05);
	}

	& > * {
		font-size: inherit;
		padding: 10px 15px;
	}
`;

const StyledListItemMain = styled.div`
	cursor: text;
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	user-select: text;
`;

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
			<StyledHistoryListItem key={index}>
				<StyledListItemMain>{value}</StyledListItemMain>
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
			</StyledHistoryListItem>
		);
	});

	return (
		<StyledHistoryContainer>
			{showAddButton && addToHistory && (
				<BlockButton
					icon={faCirclePlus}
					onClick={addToHistory}
				>
					{t("addToHistory")}
				</BlockButton>
			)}
			{showClearButton && (
				<BlockButton
					icon={faBroom}
					onClick={handleClearHistoryClick}
				>
					{t("clearHistory")}
				</BlockButton>
			)}
			<StyledHistoryList>{historyListItems}</StyledHistoryList>
		</StyledHistoryContainer>
	);
}

export default History;
