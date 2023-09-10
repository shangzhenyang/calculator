import App from "@/App";
import "@/styles/globals.css";
import translationEnUs from "@/translations/en-us.json";
import translationZhCn from "@/translations/zh-cn.json";
import translationZhTw from "@/translations/zh-tw.json";
import i18n, { t } from "i18next";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const i18nResources = {
	"en-US": {
		translation: translationEnUs,
	},
	"zh-CN": {
		translation: translationZhCn,
	},
	"zh-TW": {
		translation: translationZhTw,
	},
};

const lang = ((): string => {
	if (/^(yue|zh)(-cn|-sg|-hans(-[a-z]+)?)?$/i.test(navigator.language)) {
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
	fallbackLng: "en-US",
	interpolation: {
		escapeValue: false,
	},
	lng: lang,
	resources: i18nResources,
}).then(() => {
	document.title = t("calculatorByShangzhen");
}).catch(console.error);

document.documentElement.lang = lang;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
