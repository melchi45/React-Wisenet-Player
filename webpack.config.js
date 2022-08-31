var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

var alias = {
  'react-dom': '@hot-loader/react-dom',
};

var extension_output_path = 'build/extension';
var app_output_path = 'build/app';

// load the secrets
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

var options = {};

var extension_options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
    options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx'),
    main: path.join(__dirname, 'src', 'pages', 'Main', 'index.jsx'),
    apps: [path.join(__dirname, 'src', 'pages', 'Apps', 'index.jsx')],
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'contentScript', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, extension_output_path),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            'src',
            'manifest',
            'extension_manifest.json'
          ),
          to: path.join(__dirname, extension_output_path, 'manifest.json'),
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
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'icons', 'favicon.ico'),
          to: path.join(__dirname, extension_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            'src',
            'pages',
            'Content',
            'content.styles.css'
          ),
          to: path.join(__dirname, extension_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-128.png'),
          to: path.join(__dirname, extension_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-34.png'),
          to: path.join(__dirname, extension_output_path),
          force: true,
        },
      ],
    }),
    // copy resource for worker on ump player.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            'node_modules',
            '@melchi45',
            'ump-player',
            'dist',
            'media'
          ),
          to: path.join(__dirname, extension_output_path, 'media'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Main', 'index.html'),
      filename: 'main.html',
      chunks: ['main'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Apps', 'index.html'),
      filename: 'apps.html',
      chunks: ['apps'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

var app_options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
    options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx'),
    main: path.join(__dirname, 'src', 'pages', 'Main', 'index.jsx'),
    apps: [path.join(__dirname, 'src', 'pages', 'Apps', 'index.jsx')],
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'contentScript', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, app_output_path),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'manifest', 'app_manifest.json'),
          to: path.join(__dirname, app_output_path, 'manifest.json'),
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
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'icons', 'favicon.ico'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            'src',
            'pages',
            'Content',
            'content.styles.css'
          ),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-512.png'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-128.png'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-64.png'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-32.png'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src', 'assets', 'img', 'icon-16.png'),
          to: path.join(__dirname, app_output_path),
          force: true,
        },
      ],
    }),
    // copy resource for worker on ump player.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(
            __dirname,
            'node_modules',
            '@melchi45',
            'ump-player',
            'dist',
            'media'
          ),
          to: path.join(__dirname, app_output_path, 'media'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Main', 'index.html'),
      filename: 'main.html',
      chunks: ['main'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Apps', 'index.html'),
      filename: 'apps.html',
      chunks: ['apps'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (env.BUILD_ENV === 'app') {
  console.log('Application Extension build');
  options = app_options;
} else {
  console.log('Boilerplate Extension build');
  options = extension_options;
}

if (env.NODE_ENV === 'development') {
  console.log('Devemopment Mode for ' + env.BUILD_ENV);
  options.devtool = 'cheap-module-source-map';
} else {
  console.log('Production Mode for ' + env.BUILD_ENV);
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
