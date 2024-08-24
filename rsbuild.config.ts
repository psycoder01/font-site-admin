import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

export default defineConfig({
    plugins: [pluginReact(), pluginNodePolyfill()],
    source: {
        define: {
            'process.env.SERVER_URI': JSON.stringify(process.env.SERVER_URI),
            'process.env.AUTH_URI': JSON.stringify(process.env.AUTH_URI),
        }
    }
});
