// noinspection JSAnnotator
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
	root: path.join(process.cwd(), 'src'),
	css: {
		modules: {
			localsConvention: 'camelCase'
		}
	},
	server: {
		port: 3000
	},
	plugins: [react()],
	build: {
		outDir: path.join(process.cwd(), 'build'),
		emptyOutDir: true
	},
	test: {
		globals: true,
		root: path.join(process.cwd(), 'test'),
		environment: 'jsdom',
		setupFiles: [path.join(process.cwd(), 'test', 'setup.ts')]
	}
});
