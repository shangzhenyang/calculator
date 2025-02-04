import viteReact from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	build: {
		target: "esnext",
	},
	plugins: [
		viteReact(),
		VitePWA({
			manifest: {
				description:
					"A versatile calculator app that offers a wide range of calculation features, supporting regular and scientific calculations, number base conversions, byte conversions, date difference calculations, molar mass calculations, statistical calculations, equation solving, and quadratic function analysis.",
				icons: [
					{
						purpose: "any",
						sizes: "720x720",
						src: "https://www.shangzhenyang.com/images/avatar.png",
						type: "image/png",
					},
				],
				id: "/",
				name: "Calculator",
				short_name: "Calculator",
				theme_color: "#0066cc",
			},
			registerType: "autoUpdate",
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
