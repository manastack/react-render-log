import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import * as packageJson from './package.json'

export default defineConfig(() => ({
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/shared/lib/render-log/index.ts'),
      fileName: (format) => `render-log.${format}.js`,
      formats: ['es', 'umd'],
      name: 'ReactEmotionNaming',
    },
    minify: true,
    modulePreload: false,
    outDir: './build',
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [
    dts({
      include: ['src/shared/lib/render-log/'],
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@entities': '/src/entities',
      '@manauser/react-render-log': '/src/shared/lib/render-log',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@widgets': '/src/widgets',
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['/test.config.ts'],
  },
}))
