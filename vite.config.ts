import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './',
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Port should be inside 'server'
    host: '0.0.0.0', // Bind to all network interfaces (required for cloud environments like Render)
  },
  plugins: [react()],
});