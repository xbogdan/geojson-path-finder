var path = require('path');

module.exports = {
      optimization: {
    minimize: true
  },
  entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'geojson_path_finder.js',
        library: 'geojsonPathFinder',
        libraryTarget: 'var',
    },
    mode: 'production',

};
