const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.svg$/,
				use: "svg-inline-loader"
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader"
			}
		]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index_bundle.js",
		publicPath: "/otus-reactjs/"
	},
	plugins: [
		new HtmlWebpackPlugin({
			base: "/otus-reactjs/",
			template: path.resolve(__dirname, "src/index.html")
		}),
		new CopyPlugin({
			patterns: [
				{from: "404.html", to: ""}
			]
		})
	]
}