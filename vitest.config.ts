import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/__tests__/**/*.spec.ts'],
    exclude: ['src/__tests__/metaverse-conditional.spec.ts'],
    environment: 'node',
    globals: true,
    setupFiles: [],
    testTimeout: 60000,
  },
  esbuild: {
    target: 'node18',
  },
})
