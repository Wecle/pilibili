import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		viteEslint({
			failOnError: false
		})
	],
	resolve: {
		alias: {
			"@/": path.resolve(__dirname, "src")
		}
	},
	envDir: "env"
})
