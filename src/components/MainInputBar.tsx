import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/MainInputBar.module.css";

import type {
	ChangeEventHandler,
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
	onChange: ChangeEventHandler<HTMLInputElement>;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

function MainInputBar({
	children,
	className,
	hasError,
	list,
	placeholder,
	value,
	onChange,
	onKeyDown
}: Props) {
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
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			{children}
		</div>
	);
}

export default MainInputBar;
