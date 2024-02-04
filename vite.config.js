import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api/":{
        target:"https://ill-gray-fly-tux.cyclic.app/",
        changeOrigin:true
      }
    }
  },
  plugins: [react()],
  
})
