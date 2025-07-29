import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This 'base' property is essential for deploying to a subfolder on GitHub Pages.
  // It tells Vite where the assets (CSS, JS, images) will be located on the server.
  // The value should be your repository name, surrounded by slashes.
  base: '/my-portfolio/',
});
