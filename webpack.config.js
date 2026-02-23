module.exports = {
  entry: './src/public/app/index.js',
  output: {
    path: __dirname + '/src/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ],
  }
};