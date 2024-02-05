import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api/":{
        target:"https://supportdesk-hm1g.onrender.com/",
        changeOrigin:true
      }
    }
  },
  plugins: [react()],
  
})
