import { ReactNode } from "react";

interface InputInfo {
	hasError?: boolean;
	id: string;
	label?: ReactNode;
	value: string;
}

export default InputInfo;
