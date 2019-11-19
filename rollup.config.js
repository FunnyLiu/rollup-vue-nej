import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';


export default {
    input:'raw/test/ui.vue',
    output: {
        format: 'amd',
        file: 'src/test/ui.js',
        strict: false
    },
    plugins:[
        resolve(),
        vue(),
    ]
}