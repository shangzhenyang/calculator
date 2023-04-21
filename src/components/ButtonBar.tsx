import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/ButtonBar.module.css";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ButtonItem {
	icon: IconDefinition;
	label: string;
	onClick: () => void;
}

interface Props {
	buttons: ButtonItem[];
}

function ButtonBar({ buttons }: Props) {
	const buttonElements = buttons.map((button) => {
		return (
			<button
				key={button.label}
				onClick={button.onClick}
			>
				<FontAwesomeIcon icon={button.icon} size="xl" />
				{t(button.label)}
			</button>
		);
	});

	return (
		<div className={styles["button-bar"]}>
			{buttonElements}
		</div>
	);
}

export default ButtonBar;
