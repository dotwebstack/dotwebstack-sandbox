const path = require('path');

module.exports = {
  entry: './app.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist/assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          // {
          //   loader: 'eslint-loader',
          // },
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
