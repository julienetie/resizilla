import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'resizilla',
    entry: './src/index.js',
    plugins: [babel({
        babelrc: false,
        presets: ["es2015-rollup"]
    })],
    format: 'umd',
    dest: './dist/resizilla.js'
};
