import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/style/': "/src/assets/style/",
            '@/hooks/': "/src/hooks/",
        },
    },
    base: "/react-basics/",
})
