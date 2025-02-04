import { t } from "i18next";
import { JSX } from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	margin-top: auto;
	padding: 5px;
`;

function Footer(): JSX.Element {
	return (
		<StyledFooter>
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
		</StyledFooter>
	);
}

export default Footer;
