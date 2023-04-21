import { t } from "i18next";

import styles from "@/styles/Footer.module.css";

function Footer() {
	return (
		<footer className={styles["footer"]}>
			&copy; {new Date().getFullYear()} <a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
		</footer>
	);
}

export default Footer;
