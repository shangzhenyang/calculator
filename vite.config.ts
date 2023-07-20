import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("mathjs")) {
						return "mathjs";
					} else if (id.includes("node_modules")) {
						return "vendor";
					} else if (id.includes("translations")) {
						return "translations";
					}
				},
			},
		},
	},
	css: {
		postcss: {
			plugins: [autoprefixer],
		},
	},
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Calculator",
				short_name: "Calculator",
				id: "/",
				theme_color: "#0066cc",
				description: "A versatile calculator app that offers a wide range of calculation features, supporting regular and scientific calculations, number base conversions, byte conversions, date difference calculations, molar mass calculations, statistical calculations, equation solving, and quadratic function analysis.",
				icons: [{
					src: "https://www.shangzhenyang.com/images/avatar.png",
					sizes: "720x720",
					type: "image/png",
					purpose: "any",
				}],
			},
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
