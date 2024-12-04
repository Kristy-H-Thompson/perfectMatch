import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for static sites
export default defineConfig({
  build: {
    outDir: 'dist', // This is the default folder for static build output
  },
  plugins: [react()],
});