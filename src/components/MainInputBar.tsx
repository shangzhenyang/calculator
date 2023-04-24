import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/MainInputBar.module.css";

import type {
	ChangeEvent,
	KeyboardEventHandler,
	ReactNode
} from "react";

interface Props {
	children: ReactNode;
	className?: string;
	hasError?: boolean;
	list?: string;
	placeholder: string;
	value: string;
	setValue: (newValue: string) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

function MainInputBar({
	children,
	className,
	hasError,
	list,
	placeholder,
	value,
	setValue,
	onKeyDown
}: Props) {
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setValue(evt.target.value);
	};

	return (
		<div className={styles["main-input-bar"]}>
			<input
				autoComplete="off"
				autoFocus={true}
				className={classnames(className, {
					[styles["error"]]: hasError
				})}
				list={list}
				placeholder={t(placeholder).toString()}
				value={value}
				onChange={handleChange}
				onKeyDown={onKeyDown}
			/>
			{children}
		</div>
	);
}

export default MainInputBar;
