import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/style/': "/src/assets/style/",
            '@/hooks/': "/src/hooks/",
            '@/img/': "/src/assets/img/",
            '@/utils/': "/src/utils/",
        },
    },
    base: "/react-basics/",
    build: {
        outDir: "build",
        emptyOutDir: true,
        sourcemap: true,
    }
})
