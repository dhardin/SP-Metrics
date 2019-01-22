module.exports = {
    transpileDependencies: ['veutify', 'vue-underscore'],
    css: {
        loaderOptions: {
            css: {},
            postcss: {}
        },
        extract: false
    },

    baseUrl: './',

    devServer: {
        overlay: {
            warnings: true,
            errors: true
        }
    },

    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
            .use('vue-svg-symbol-loader')
            .loader('vue-svg-symbol-loader')
            .end()

        if (config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css')
            extractCSSPlugin && extractCSSPlugin.tap(() => [{
                filename: '[name].css',
                chunkFilename: '[name].css'
            }])
        }

    },

    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        },

    },

    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined
}