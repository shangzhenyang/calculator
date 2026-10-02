import styles from "@/components/input-bar.module.css";
import clsx from "clsx";
import { t } from "i18next";
import type { ChangeEvent, JSX, ReactNode } from "react";
import { useId } from "react";

interface InputBarProps {
	children: ReactNode;
	hasError?: boolean;
	type: "text" | "number" | "date";
	value: string;
	onChange?: (newValue: string) => void;
}

function InputBar({
	children,
	hasError,
	type,
	value,
	onChange,
}: InputBarProps): JSX.Element {
	const id = useId();

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange?.(event.target.value);
	};

	return (
		<div className={styles["container"]}>
			<label
				className={styles["label"]}
				htmlFor={id}
			>
				{children}
			</label>
			<input
				autoComplete="off"
				className={clsx(styles["input"], hasError && styles["error"])}
				id={id}
				placeholder={
					onChange && type !== "date"
						? t("enterNumber").toString()
						: undefined
				}
				readOnly={!onChange}
				type={type}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
}

export default InputBar;
