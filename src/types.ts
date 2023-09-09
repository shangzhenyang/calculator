import { ReactNode } from "react";
import { MathJsStatic } from "mathjs";

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
