import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteEslint({
			failOnError: false
		}),
		svgr()
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	envDir: "env",
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: [
					"@import './src/styles/colors.scss';",
					"@import './src/styles/common.scss';",
					"@import './src/styles/fonts.scss';",
					"@import './src/styles/animation.scss';"
				].join('')
			}
		}
	}
})
