import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import checker from 'vite-plugin-checker';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    define: {
      'process.env': {},
    },
    resolve: {
      alias: [
        { find: 'aave-ui-kit', replacement: path.resolve(__dirname, './src/aave-ui-kit') },
        { find: 'App', replacement: path.resolve(__dirname, './src/App.tsx') },
        { find: 'libs', replacement: path.resolve(__dirname, './src/libs') },
        // { find: /components\/(.*)/, replacement: path.resolve(__dirname, './src/components/$1/index.tsx') },
        { find: 'components', replacement: path.resolve(__dirname, './src/components') },
        { find: 'modules', replacement: path.resolve(__dirname, './src/modules') },
        { find: 'translations', replacement: path.resolve(__dirname, './src/translations') },
        { find: 'defaultMessages', replacement: path.resolve(__dirname, './src/defaultMessages') },
        { find: 'helpers', replacement: path.resolve(__dirname, './src/helpers') },
        { find: 'client', replacement: path.resolve(__dirname, './src/client') },
        { find: 'ui-config', replacement: path.resolve(__dirname, './src/ui-config') },
        { find: 'images', replacement: path.resolve(__dirname, './src/images') },
        { find: 'icons', replacement: path.resolve(__dirname, './src/icons') },
      ],
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ['styled-jsx/babel', { plugins: ['@styled-jsx/plugin-sass'] }],
            [
              'react-intl-auto',
              {
                removePrefix: 'src/',
              },
            ],
          ],
        },
      }),
      checker({
        typescript: true,
        ...(!process.env.VITEST && {
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            dev: {
              logLevel: ['error', 'warning'],
            },
          },
        }),
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          // global: 'globalThis',
          global: 'window',
        },
        plugins: [
          polyfillNode({
            globals: {
              process: true,
              buffer: true,
            },
          }),
        ],
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: [path.resolve(__dirname, 'src')],
        },
      },
    },
  };
});
