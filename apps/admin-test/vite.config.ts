import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { mercurDashboardPlugin } from '@mercurjs/dashboard-sdk'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl =
    env.VITE_MERCUR_BACKEND_URL || env.MERCUR_BACKEND_URL
  const vendorUrl =
    env.VITE_MERCUR_VENDOR_URL || env.MERCUR_VENDOR_URL

  return {
    plugins: [
      react(),
      mercurDashboardPlugin({
        medusaConfigPath: '../api/medusa-config.ts',
        ...(backendUrl ? { backendUrl } : {}),
        ...(vendorUrl ? { vendorUrl } : {}),
      }),
    ],
    optimizeDeps: {
      exclude: ['@mercurjs/admin', '@mercurjs/vendor', '@medusajs/dashboard'],
      esbuildOptions: {
        plugins: [
          {
            name: 'virtual-medusa-stub',
            setup(build) {
              build.onResolve({ filter: /^virtual:medusa\// }, (args) => ({
                path: args.path,
                namespace: 'virtual-medusa',
              }))
              build.onLoad({ filter: /.*/, namespace: 'virtual-medusa' }, () => ({
                contents: 'export default {}',
                loader: 'js',
              }))
            },
          },
        ],
      },
    },
  }
})
