const webpack = require('webpack')
const getConfig = require('hjs-webpack')
const isDev = (process.env.NODE_ENV || 'development') === 'development'
const isProd = !isDev && process.env.NODE_ENV === 'production'

const PRO_PUBLIC_PATH = ''
const DEV_PUBLIC_PATH = ''

const PUBLIC_PATH = isProd ? PRO_PUBLIC_PATH : DEV_PUBLIC_PATH
const GA_ID = 'UA-40648195-11'
const GA_SCRIPT = isProd ? 'analytics' : 'analytics_debug'

const template = (context) => {
  return `
  <!DOCTYPE html>
    <html mode="${process.env.NODE_ENV || 'development'}">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/3211b50b31.css" media="all">
        <link href="${PUBLIC_PATH}${context.css}" rel="stylesheet">
      </head>
      <body>
        <div id="root"></div>
        <script deferred src="https://www.gstatic.com/firebasejs/3.2.0/firebase.js"></script>
        <script src="${PUBLIC_PATH}${context.vendor}"></script>
        <script src="${PUBLIC_PATH}${context.main}"></script>
        <script>
          window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', '${GA_ID}', 'auto');
          ga('send', 'pageview');
        </script>
        <script async src="https://www.google-analytics.com/${GA_SCRIPT}.js"></script>
      </body>
    </html>
  `
}

const config = getConfig({
  in: 'src/app.js',
  out: 'public',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    cssFilename: '[name].[contenthash].css'

  },
  clearBeforeBuild: true,
  html: context => {
    return {
      'index.html': template(context)
    }
  }
})

config.module.loaders.push({
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]',
    'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
  ]
})

// config.resolve = {
//   alias: {
//     'react': 'preact-compat',
//     'react-dom': 'preact-compat'
//   }
// }

if (isDev) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('development')}
    })
  )
}

if (isProd) {
  config.entry = {
    main: config.entry,
    vendor: [
      'react', 'react-dom', 'babel-polyfill', 'isomorphic-fetch',
      'debug', 'react-router', 'rx-lite', 'lodash.union', 'lodash.uniqby',
      'lodash.xorby', 'algoliasearch', '@schibstedspain/cv-decorators'
    ]
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    })
  )

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {API_HOST: JSON.stringify('https://favorites-service-apdyapobzp.now.sh')}
    })
  )

  config.output.publicPath = PUBLIC_PATH

  // Remove Dedupe plugin
  // https://github.com/HenrikJoreteg/hjs-webpack/issues/22
  config.plugins = config.plugins.filter((_, i) => i !== 1)
}

module.exports = config
