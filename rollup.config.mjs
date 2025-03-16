import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' with { type: 'json' };

const makeDefaultConfig = hooksOrComponents => {
    return [
        {
            input: `src/${hooksOrComponents}/index.ts`,
            output: [
                {
                    entryFileNames: packageJson.main,
                    dir: 'dist',
                    format: 'cjs',
                    sourcemap: true,
                    assetFileNames: '[name][extname]',
                },
                {
                    dir: 'dist',
                    format: 'esm',
                    sourcemap: true,
                    entryFileNames: packageJson.module,
                    assetFileNames: '[name][extname]',
                },
            ],
            external: ['react', 'react-dom'],
            plugins: [
                resolve(),
                commonjs(),
                typescript({ tsconfig: `./tsconfig.json`, exclude: ['**/stories'] }),
                postcss({
                    plugins: [autoprefixer()],
                    sourceMap: true,
                    extract: true,
                    minimize: true,
                }),
                excludeDependenciesFromBundle({ peerDependencies: true }),
            ],
        },
        {
            input: `dist/esm/index.d.ts`,
            output: [{ file: `dist/index.d.ts`, format: 'esm' }],
            external: ['react', 'react-dom', './BarcodeScanner.css'],
            plugins: [dts(), excludeDependenciesFromBundle({ peerDependencies: true })],
        },
    ];
};

export default [...makeDefaultConfig('components')];
