import styles from "@/components/footer.module.css";
import { t } from "i18next";
import type { JSX } from "react";

function Footer(): JSX.Element {
	return (
		<footer className={styles["footer"]}>
			&copy; {new Date().getFullYear()}{" "}
			<a href="https://www.shangzhenyang.com/">{t("shangzhenYang")}</a>
		</footer>
	);
}

export default Footer;
