import styles from "@/styles/BlockButton.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";

interface BlockButtonProps {
	icon: IconDefinition;
	label: string;
	onClick: () => void;
}

function BlockButton({ icon, label, onClick }: BlockButtonProps): JSX.Element {
	return (
		<button
			className={styles["block-button"]}
			type="button"
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} size="xl" fixedWidth />
			{t(label)}
		</button>
	);
}

export default BlockButton;
