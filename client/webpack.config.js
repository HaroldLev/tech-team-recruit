const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 3000;

const entries = [
  'webpack-dev-server/client?http://localhost:' + port,
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  './src/main.tsx'
];


module.exports = {
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __API_SERVER_URL__: JSON.stringify('http://localhost:9966/petclinic')
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[
          {
            loader:'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }

        ]
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'src/styles'),
        use: [
          {
            loader:'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        options: {
          limit: 25000
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file',
        options: {
          name: 'public/fonts/[name].[ext]'
        }
      },

      {
        test: /\.tsx?$/,
        include: path.join(__dirname, 'src'),
        use:[
          {
            loader: 'babel-loader',
            options: {
              presets: ['babel/preset-react, @babel/preset-env'],
              plugins: [
                'react-hot-loader/babel'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: path.resolve(__dirname, 'tsconfig.json')
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    host: '0.0.0.0',
    port: port,
    devMiddleware: {
      stats: {
        all: false,
        errors: true,
        timings: true,
        warnings: false,
      },
    },
    // Configure webSocketURL on automatic mode
    // Useful for codespaces
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws',
    },
    allowedHosts: ['127.0.0.1', 'localhost'],
    // Disable HTTPS when developing in a codespace
    // Because port forwarding does not work with https and self signed certificates
    // Also the codespace proxy is already using HTTPS
    server: 'https',
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:9966',
        secure: false,
      },
    ],
  },
};
