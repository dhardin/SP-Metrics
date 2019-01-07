module.exports = {
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
      },
}