const path = require('path');

module.exports = {
  entry: './client/index.js',
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  
  module: {
    rules: [
        {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
        },
        { 
          test: /\.css$/, 
          use: ['style-loader', 'css-loader', 'sass-loader'] 
        }
    ]
  },
  mode: process.env.NODE_ENV,
  devServer: {
      contentBase: 'dist',
      port: 8080,
      historyApiFallback: true,
      proxy: {
          '/todo': 'http://localhost:3535',
          '/mark': 'http://localhost:3535',
      }
  }
}