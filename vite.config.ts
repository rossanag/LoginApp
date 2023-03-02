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
});
