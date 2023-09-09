import styles from "@/styles/Footer.module.css";
import { t } from "i18next";

function Footer(): JSX.Element {
	return (
		<footer className={styles["footer"]}>
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
		</footer>
	);
}

export default Footer;
