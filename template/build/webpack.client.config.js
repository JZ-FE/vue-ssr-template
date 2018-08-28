const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  optimization: {
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    runtimeChunk: {
      name: 'manifest',
    },
    // extract vendor chunks for better caching
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test(module) {
            // a module is extracted into the vendor chunk if...
            return (
              // it's inside node_modules
              /node_modules/.test(module.context) &&
              // and not a CSS file
              !/\.css$/.test(module.request)
            )
          }
        }
      }
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: '{{ name }}',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/]
    })
  )
}

if (process.env.npm_config_report) {
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
