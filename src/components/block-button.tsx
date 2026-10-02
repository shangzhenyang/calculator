import styles from "@/components/block-button.module.css";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { JSX, ReactNode } from "react";

interface BlockButtonProps {
	children: ReactNode;
	icon: IconDefinition;
	onClick: () => void;
}

function BlockButton({
	children,
	icon,
	onClick,
}: BlockButtonProps): JSX.Element {
	return (
		<button
			className={styles["button"]}
			type="button"
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				size="xl"
				fixedWidth
			/>
			{children}
		</button>
	);
}

export default BlockButton;
