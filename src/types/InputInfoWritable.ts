import type InputInfo from "@/types/InputInfo";

interface InputInfoWritable extends InputInfo {
	updateValue: (newValue: string) => void;
}

export default InputInfoWritable;
