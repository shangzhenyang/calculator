import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBroom, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import BlockButton from "@/components/BlockButton";
import InputBar from "@/components/InputBar";
import MainInputBar from "@/components/MainInputBar";

import styles from "@/styles/Stat.module.css";

import type { ChangeEvent } from "react";

function Stat() {
	const [newNumber, setNewNumber] = useState<string>("");
	const [numbers, setNumbers] = useState<string>("");

	const numberArray = numbers
		.replace(/(,|，|、|\n|\s)+/g, ",")
		.replace(/\s/g, "")
		.split(",")
		.filter((item) => {
			return item !== "" && !isNaN(Number(item));
		})
		.map((item) => {
			return Number(item);
		});

	const count = numberArray.length;

	const clear = () => {
		setNumbers("");
	};

	const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setNumbers(evt.target.value);
	};

	return (
		<main>
			<MainInputBar
				placeholder="enterNewNumber"
				value={newNumber}
				setValue={setNewNumber}
			>
				<button>
					<FontAwesomeIcon icon={faCirclePlus} size="xl" />
					{t("add").toString()}
				</button>
			</MainInputBar>
			<div className={styles["stat-editor"]}>
				<label htmlFor="added-numbers">{t("addedNumbers")}</label>
				<textarea
					id="added-numbers"
					value={numbers}
					onChange={handleChange}
				></textarea>
				<BlockButton
					icon={faBroom}
					label="clear"
					onClick={clear}
				/>
			</div>
			<InputBar
				id="count"
				label="count"
				value={count.toString()}
			/>
		</main>
	);
}

export default Stat;
