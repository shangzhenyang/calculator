import type { ReactNode } from "react";
import type { MathJsStatic } from "mathjs";

export interface InputInfo {
	hasError?: boolean;
	id: string;
	label?: ReactNode;
	value: string;
}

export interface InputInfoWritable extends InputInfo {
	updateValue: (newValue: string) => void;
}

export interface PageProps {
	math: MathJsStatic;
}
