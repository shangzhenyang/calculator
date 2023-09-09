import styles from "@/styles/MainInputBar.module.css";
import classNames from "classnames";
import { t } from "i18next";
import {
	ChangeEvent,
	FormEvent,
	KeyboardEventHandler,
	ReactNode,
} from "react";

interface MainInputBarProps {
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
	onSubmit,
}: MainInputBarProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange(event.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		onSubmit?.();
	};

	return (
		<form
			className={styles["main-input-bar"]}
			onSubmit={handleSubmit}
		>
			<input
				autoComplete="off"
				className={classNames(className, {
					[styles["error"]]: hasError,
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
