import { Dispatch, SetStateAction } from "react";

import type InputInfo from "@/types/InputInfo";

interface InputInfoWritable extends InputInfo {
	setValue: Dispatch<SetStateAction<string>>;
}

export default InputInfoWritable;
