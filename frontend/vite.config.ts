/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(),eslint()],	
	server: {
		open: '/index.html',
	}, 
	resolve: {
		alias: {
			'@root': path.resolve(__dirname, ''),
		},
	},
	test: {
		environment: 'happy-dom',
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html']
		},
		setupFiles: ['setupTest.ts']
	},
}); 
