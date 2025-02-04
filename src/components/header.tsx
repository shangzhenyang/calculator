import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { JSX } from "react";
import styled from "styled-components";

interface HeaderProps {
	toggleSidebar: () => void;
}

const StyledHeaderContainer = styled.header`
	align-items: center;
	border-bottom: var(--border);
	display: flex;
	grid-area: header;
	justify-content: space-between;
	padding: 25px;
`;

const StyledHeaderLeft = styled.div`
	align-items: center;
	display: flex;
	gap: 20px;
`;

const StyledHeaderTitle = styled.h1`
	font-size: 1.5rem;
	font-weight: normal;
	margin: 0;
`;

const StyledSidebarIcon = styled(FontAwesomeIcon)`
	display: none;
	cursor: pointer;

	@media screen and (max-width: 768px) {
		display: block;
	}
`;

function Header({ toggleSidebar }: HeaderProps): JSX.Element {
	return (
		<StyledHeaderContainer>
			<StyledHeaderLeft>
				<StyledSidebarIcon
					icon={faBars}
					size="xl"
					fixedWidth
					role="button"
					tabIndex={0}
					title={t("sidebar").toString()}
					onClick={toggleSidebar}
				/>
				<StyledHeaderTitle>{t("calculator")}</StyledHeaderTitle>
			</StyledHeaderLeft>
			<a
				href="https://github.com/shangzhenyang/calculator"
				target="_blank"
				rel="noreferrer"
				title="GitHub"
			>
				<FontAwesomeIcon
					icon={faGithub}
					size="xl"
					fixedWidth
				/>
			</a>
		</StyledHeaderContainer>
	);
}

export default Header;
