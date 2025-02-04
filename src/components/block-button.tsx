import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { JSX, ReactNode } from "react";
import styled from "styled-components";

interface BlockButtonProps {
	children: ReactNode;
	icon: IconDefinition;
	onClick: () => void;
}

const StyledButton = styled.button`
	align-items: center;
	border: var(--border);
	border-radius: var(--radius);
	display: flex;
	flex: 1;
	font-size: inherit;
	gap: 10px;
	padding: 15px 20px;
	width: 100%;
`;

function BlockButton({
	children,
	icon,
	onClick,
}: BlockButtonProps): JSX.Element {
	return (
		<StyledButton
			type="button"
			onClick={onClick}
		>
			<FontAwesomeIcon
				icon={icon}
				size="xl"
				fixedWidth
			/>
			{children}
		</StyledButton>
	);
}

export default BlockButton;
