import classnames from "classnames";
import { t } from "i18next";

import styles from "@/styles/MainInputBar.module.css";

import type {
	ChangeEvent,
	FormEvent,
	KeyboardEventHandler,
	ReactNode
} from "react";

interface Props {
	children: ReactNode;
	className?: string;
	hasError: boolean;
	list?: string;
	placeholder: string;
	value: string;
	onChange: (newValue: string) => void;
	onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
	onSubmit?: () => void;
}

function MainInputBar({
	children,
	className,
	hasError,
	list,
	placeholder,
	value,
	onChange,
	onKeyDown,
	onSubmit
}: Props) {
	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		onChange(evt.target.value);
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit?.();
	};

	return (
		<form
			className={styles["main-input-bar"]}
			onSubmit={handleSubmit}
		>
			<input
				autoComplete="off"
				autoFocus={true}
				className={classnames(className, {
					[styles["error"]]: hasError
				})}
				list={list}
				placeholder={t(placeholder).toString()}
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={onKeyDown}
			/>
			{children}
		</form>
	);
}

export default MainInputBar;
