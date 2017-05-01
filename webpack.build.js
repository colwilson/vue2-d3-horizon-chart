var config = require('./webpack.config.js')

config.entry = {
  'vue2-d3-horizon-chart': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'Vue2D3HorizonChart',
  libraryTarget: 'umd'
}


module.exports = config
