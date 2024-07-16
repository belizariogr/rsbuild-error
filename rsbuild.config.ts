import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({

    plugins: [
        pluginReact(),
        pluginSvgr({ mixedImport: true }),
    ],

    output: {
        minify: !(process.env.NAME === 'dev' || process.env.NAME === 'sandbox'),
        cleanDistPath: true,
        distPath: {
            root: `dist`,
        },
        sourceMap: {
            js: (process.env.NAME === 'dev' || process.env.NAME === 'sandbox') ? 'source-map' : false,
            css: (process.env.NAME === 'dev' || process.env.NAME === 'sandbox'),
        }
    },

    html: {
        title: 'Boa Gestão',
        favicon: './src/icons/favicon.svg',
        appIcon: './src/icons/apple/icon.png',
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
        tags: [
            { tag: 'link', attrs: { rel: 'manifest', href: 'manifest.json', id: "manifest-placeholder" }, append: true },
        ],
    },



});