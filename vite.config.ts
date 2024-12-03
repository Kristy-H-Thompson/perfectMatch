import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './',
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Use PORT environment variable, fallback to 3000
    host: '0.0.0.0', // Make sure to bind the server to all network interfaces (important for cloud services)
  },
  plugins: [react()],
});