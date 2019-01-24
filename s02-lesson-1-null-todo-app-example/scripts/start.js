const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: "development",
	bail: true,
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../build'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.js$/,
						use: 'babel-loader',
						exclude: /node_modules/
					},
					{
						test: /\.sass$/,
						use: [
							MiniCssExtractPlugin.loader,
							'css-loader',
							'sass-loader',
						]
					},
					{
						loader: 'file-loader',
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.ejs$/],
						options: {
							name: 'media/[name].[hash:8].[ext]',
						},
					}
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// both options are optional
			filename: "[name].css",
		}),
		new HTMLWebpackPlugin({
			template: './public/index.ejs',
			appMountId: "root"
		})
	]
}