const path = require('path')
const { merge } = require('webpack-merge')
const parts = require('./webpack.parts')

const commonConfig = merge([
  {
    entry: ['./src'],
    output: {
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.json', '.css', '.scss'],
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
    },
  },
  parts.page({
    title: 'Pure js role play game',
    template: path.resolve(__dirname, '/public/index.html'),
  }),
  parts.loadJs(),
  parts.extractCss({
    loaders: [parts.autoprefix(), parts.sassLoader()],
  }),
  parts.extractCssModules({
    loaders: [parts.autoprefix(), parts.sassLoader()],
  }),
  parts.loadImages({ limit: 500 }),
  parts.loadFonts(),
])

// const productionConfig = merge([parts.eliminateUnusedCss()])
const productionConfig = merge([])

const developmentConfig = merge([
  {
    output: {
      assetModuleFilename: 'assets/[name][ext][query]',
    },
    devtool: 'source-map',
  },
])

/**
 * Alternate way to get the mode value
 *
 * const mode = process.argv[process.argv.indexOf('--mode') + 1]
 */
const getConfig = (mode) => {
  switch (mode) {
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    default:
      throw new Error(`Trying to use an unknow mode, ${mode}`)
  }
}

module.exports = (env, options) => {
  console.log({ env, options })
  return getConfig(options.mode)
}
