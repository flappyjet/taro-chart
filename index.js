if (process.env.TARO_ENV === 'h5') {
  module.exports = require('./h5/index.js')
  module.exports.default = module.exports
} else if (process.env.TARO_ENV === 'weapp') {
  module.exports = require('./weapp/index.js'),
  module.exports.default = module.exports
}
