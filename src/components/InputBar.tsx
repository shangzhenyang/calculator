import { t } from "i18next";

import styles from "@/styles/InputBar.module.css";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Props {
	id: string;
	label: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

function InputBar({ id, label, value, setValue }: Props) {
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value);
	};

	return (
		<div className={styles["input-bar"]}>
			<label htmlFor={id}>{t(label)}</label>
			<input
				id={id}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputBar;
