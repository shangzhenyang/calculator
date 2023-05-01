import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import styles from "@/styles/Header.module.css";

function Header() {
	return (
		<header className={styles["header"]}>
			<h1>{t("calculator")}</h1>
			<a
				href="https://github.com/shangzhenyang/calculator"
				target="_blank"
				rel="noreferrer"
				title="GitHub"
			>
				<FontAwesomeIcon icon={faGithub} size="xl" fixedWidth />
			</a>
		</header>
	);
}

export default Header;
