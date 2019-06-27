const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const devMode ='production'

module.exports = merge(common, {
    mode: 'production',
});