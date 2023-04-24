import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "@/styles/BlockButton.module.css";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Props {
	icon: IconDefinition;
	label: string;
	onClick: () => void;
}

function BlockButton({ icon, label, onClick }: Props) {
	return (
		<button
			className={styles["block-button"]}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} size="xl" />
			{t(label)}
		</button>
	);
}

export default BlockButton;
