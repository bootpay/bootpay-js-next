module.exports = {
	entry: './src/bootpay.ts',
	output: {
		path: __dirname,
		filename: "bootpay-latest.js"
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.css', '.sass', '.ts', '.json']
	},
	devServer: {
		port: 3001,
		public: 'ts-cdn.bootapi.com',
		inline: false,
		hot: false
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									forceAllTransforms: true,
									useBuiltIns: 'entry',
									corejs: 3,
									modules: false,
									exclude: ['transform-typeof-symbol'],
									"targets": {
										"browsers": ["last 2 versions"]
									}
								}
							],
							[
								'@babel/preset-typescript',
								{
									"allExtensions": true,
									"isTSX": true,
									"targets": {
										"browsers": ["last 2 versions"]
									}
								}
							]
						],
						plugins: [
							// [
							// 	'@babel/plugin-proposal-class-properties',
							// 	{
							// 		loose: true
							// 	}
							// ],
							// [
							// 	'@babel/plugin-proposal-object-rest-spread',
							// 	{
							// 		useBuiltIns: true
							// 	}
							// ],
							[
								'@babel/plugin-transform-runtime',
								{
									helpers: false,
									regenerator: true,
									corejs: false
								}
							],
							[
								'@babel/plugin-transform-regenerator',
								{
									async: false
								}
							]
						]
					}
				}]
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.sass$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader" // translates CSS into CommonJS
				}, {
					loader: "sass-loader" // compiles Sass to CSS
				}]
			}
		]
	}
};