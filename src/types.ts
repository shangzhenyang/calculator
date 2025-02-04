import { ReactNode } from "react";

export interface InputInfo {
	hasError?: boolean;
	id: string;
	label?: ReactNode;
	value: string;
}

export interface InputWritableInfo extends InputInfo {
	updateValue: (newValue: string) => void;
}
