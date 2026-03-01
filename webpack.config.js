const path = require('path');
const webpack = require('webpack');

const banner = `
/**
 * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>
 *
 * This file is part of the Kitodo project.
 *
 * It is licensed under MIT License by camunda Services GmbH
 *
 * For the full copyright and license information, please read the
 * Camunda-License.txt file that was distributed with this source code.
 */
`;

module.exports = {
  mode: 'production',           // or "production"

  entry: './src/index.js',         // <-- set this to your actual entry JS file

  output: {
	filename: 'modeler.js',
	path: path.resolve(__dirname, 'build'),
	clean: true
  },

  module: {
	rules: [
	  {
		test: /\.bpmn$/,
		use: 'raw-loader'
	  },
	  {
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
		  loader: 'babel-loader',
		  options: {
			presets: [
			  ['@babel/preset-env', { targets: "last 2 versions, not dead" }]
			]
		  }
		}
	  }
	]
  },

  plugins: [
	new webpack.BannerPlugin({ banner, raw: true })
  ],

  devtool: false
};
