import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import solidPlugin from 'vite-plugin-solid'

const pkgsDir = resolve(__dirname, '../../packages')
const srcDir = resolve(__dirname, 'src')

export default defineConfig({
  ssr: {
    noExternal: [
      "@better-auth-ui/core",
      "@better-auth-ui/solid",
      "@better-auth-ui/zaidan",
      "@kobalte/core",
      "lucide-solid"
    ]
  },
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@better-auth-ui/solid": resolve(pkgsDir, 'solid/src'),
      "@better-auth-ui/zaidan": resolve(pkgsDir, 'zaidan/src'),
      "@better-auth-ui/core": resolve(pkgsDir, 'core/src'),
    }
  },
  plugins: [
    {
      name: 'resolve-package-@-aliases',
      enforce: 'pre',
      resolveId: {
        order: 'pre',
        async handler(source, importer) {
          if (!source.startsWith('@/')) return null
          if (!importer) return null
          const i = importer.split('?')[0]
          if (i.includes('/packages/zaidan/src/')) return this.resolve(resolve(pkgsDir, 'zaidan/src', source.slice(2)), importer, { skipSelf: true })
          if (i.includes('/packages/solid/src/')) return this.resolve(resolve(pkgsDir, 'solid/src', source.slice(2)), importer, { skipSelf: true })
          if (i.includes('/packages/core/src/')) return this.resolve(resolve(pkgsDir, 'core/src', source.slice(2)), importer, { skipSelf: true })
          if (i.includes('/examples/start-zaidan-example/')) return this.resolve(resolve(srcDir, source.slice(2)), importer, { skipSelf: true })
          return null
        }
      }
    },
    tailwindcss(),
    tanstackStart(),
    solidPlugin({ ssr: true }),
  ],
})
