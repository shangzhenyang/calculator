import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import i18n, { t } from "i18next";

import translationEnUs from "@/translations/en-us.json";
import translationZhCn from "@/translations/zh-cn.json";
import translationZhTw from "@/translations/zh-tw.json";

import App from "./App";

import "@/styles/globals.css";

const i18nResources = {
	"en-US": {
		translation: translationEnUs
	},
	"zh-CN": {
		translation: translationZhCn
	},
	"zh-TW": {
		translation: translationZhTw
	}
};

const lang = (() => {
	if (/^(yue|zh)(-cn|-hans(-[a-z]+)?)?$/i.test(navigator.language)) {
		return "zh-CN";
	} else if (
		navigator.language.startsWith("zh") ||
		navigator.language.startsWith("yue")
	) {
		return "zh-TW";
	} else {
		return "en-US";
	}
})();

i18n.init({
	resources: i18nResources,
	lng: lang,
	fallbackLng: "en-US",
	interpolation: {
		escapeValue: false
	}
});

document.documentElement.lang = lang;
document.title = t("calculator");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
