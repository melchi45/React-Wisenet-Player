var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin');

// load the secrets
var alias = {
  'react-dom': '@hot-loader/react-dom',
};

var secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

var style_loader = {
  test: /\.css$/,
  loader: 'style-loader!css-loader',
  exclude: /node_modules/,
};

var file_loader = {
  test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
  loader: 'file-loader?name=[name].[ext]',
  exclude: /node_modules/,
};

var html_loader = {
  test: /\.html$/,
  loader: 'html-loader',
  exclude: /node_modules/,
};

var babel_loader = {
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
};

var chrome_extension_app = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: path.join(__dirname, 'src', 'pages', 'App', 'index.jsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['contentScript'],
  },
  output: {
    path: path.resolve(__dirname, 'build', 'app'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [style_loader, file_loader, html_loader, babel_loader],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.jsx', '.js', '.css']),
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // clean the build folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: false,
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/app/manifest.json',
          to: path.join(__dirname, 'build', 'app'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
      {
        logLevel: 'info',
        copyUnmodified: true,
      }
    ),

    new CopyWebpackPlugin(
      [
        {
          from: 'src/app/background.js',
          to: path.join(__dirname, 'build', 'app'),
          force: true,
        },
      ],
      {
        logLevel: 'info',
        copyUnmodified: true,
      }
    ),
    new CopyWebpackPlugin(
      [
        {
          from: 'src/pages/Content/content.styles.css',
          to: path.join(__dirname, 'build', 'app'),
          force: true,
        },
      ],
      {
        logLevel: 'info',
        copyUnmodified: true,
      }
    ),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'App', 'index.html'),
      filename: 'app.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(
        __dirname,
        'src',
        'pages',
        'Background',
        'index.html'
      ),
      filename: 'background.html',
      chunks: ['background'],
    }),
    new WriteFilePlugin(),
  ],
};

if (env.NODE_ENV === 'development') {
  chrome_extension_app.devtool = 'cheap-module-eval-source-map';
}

module.exports = chrome_extension_app;
