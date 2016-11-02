import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'resizilla',
    entry: './src/polyfilled.js',
    plugins: [babel({
        babelrc: false,
        exclude: 'node_modules/**'
    })],
    format: 'es',
    dest: './dist/resizilla.polyfilled.es.js'
};
