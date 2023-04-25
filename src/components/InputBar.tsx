import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/InputBar.module.css";

import type { ChangeEvent, ReactNode } from "react";

interface Props {
	children: ReactNode;
	hasError?: boolean;
	id: string;
	placeholder?: string;
	type: "text" | "number";
	value: string;
	onChange?: (newValue: string) => void;
}

function InputBar({
	children,
	hasError,
	id,
	placeholder,
	type,
	value,
	onChange
}: Props) {
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange?.(evt.target.value);
	};

	return (
		<div className={styles["input-bar"]}>
			<label htmlFor={id}>{children}</label>
			<input
				autoComplete="off"
				className={classnames({
					[styles["error"]]: hasError
				})}
				id={id}
				placeholder={placeholder && t(placeholder).toString()}
				readOnly={!onChange}
				type={type}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputBar;
