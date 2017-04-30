var config = require('./webpack.config.js')

config.entry = {
  'vue2-d3-charts': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'Vue2D3Charts',
  libraryTarget: 'umd'
}


module.exports = config
