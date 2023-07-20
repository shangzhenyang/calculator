import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/InputBar.module.css";

import type { ChangeEvent, ReactNode } from "react";

interface Props {
	children: ReactNode;
	hasError?: boolean;
	id: string;
	type: "text" | "number" | "date";
	value: string;
	onChange?: (newValue: string) => void;
}

function InputBar({
	children,
	hasError,
	id,
	type,
	value,
	onChange,
}: Props): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value);
	};

	return (
		<div className={styles["input-bar"]}>
			<label htmlFor={id}>{children}</label>
			<input
				autoComplete="off"
				className={classnames({
					[styles["error"]]: hasError,
				})}
				id={id}
				placeholder={(onChange && type !== "date") ?
					t("enterNumber").toString() : undefined}
				readOnly={!onChange}
				type={type}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputBar;
