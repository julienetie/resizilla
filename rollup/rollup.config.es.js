import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    moduleName: 'resizilla',
    entry: './src/index.js',
    plugins: [babel({
        babelrc: false,
        exclude: 'node_modules/**'
    })],
    format: 'es',
    dest: './dist/resizilla.es.js'
};
