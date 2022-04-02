import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import path from 'path'
import { glob } from 'glob'


const templates = glob.sync('views/*.svelte')

const serverSideConfig = (template) => ({
    input: template,
    output: {
        //file: template.replace('svelte', 'js'),
        file:`${template.replace('.svelte', '.js').replace('views/', 'views/templates/')}`,
        format: 'esm',
    },
    plugins: [
        svelte({
            compilerOptions: {
                generate: 'ssr',
            }
        }),
        //css({output: `static/${template}.css`}),
        postcss({
            extract: path.resolve(`${template.replace('.svelte', '').replace('views/', 'views/templates/')}.css`)
        }),
        resolve(),
        commonjs(),
    ]
});

export default [
    ...templates.map(serverSideConfig),
];