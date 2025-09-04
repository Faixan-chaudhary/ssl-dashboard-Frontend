import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['15ae1e0446a7.ngrok-free.app', 'dcd250b7b601.ngrok-free.app', 'a0d501a7d562.ngrok-free.app']
  }
})
