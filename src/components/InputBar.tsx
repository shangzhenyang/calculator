import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/InputBar.module.css";

import type { ChangeEvent } from "react";

interface Props {
	hasError?: boolean;
	id: string;
	label: string;
	value: string;
	setValue: (newValue: string) => void;
}

function InputBar({ hasError, id, label, value, setValue }: Props) {
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value);
	};

	return (
		<div className={styles["input-bar"]}>
			<label htmlFor={id}>{t(label)}</label>
			<input
				className={classnames({
					[styles["error"]]: hasError
				})}
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputBar;
