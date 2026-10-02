import styles from "@/components/main-input-bar.module.css";
import clsx from "clsx";
import { t } from "i18next";
import type {
	ChangeEvent,
	FormEvent,
	JSX,
	KeyboardEventHandler,
	ReactNode,
} from "react";

interface MainInputBarProps {
	children: ReactNode;
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
			className={styles["form"]}
			onSubmit={handleSubmit}
		>
			<input
				autoComplete="off"
				className={clsx(styles["input"], hasError && styles["error"])}
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
