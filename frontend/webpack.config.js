const path = require( 'path' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const Dotenv = require( 'dotenv-webpack' )

//const { config } = require( 'dotenv' )
//config( )

console.log( 'hello world', process.env.EXPRESS_PORT)

module.exports = (env, { mode }) => {
    const isProduction = mode === 'production';
    return {
        mode,
        entry: path.join( __dirname, 'src', 'index.tsx' ),
        resolve: {
            extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
        },
        output: {
            publicPath: '/',
            path: path.resolve( __dirname, 'dist' ),
            filename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
            chunkFilename: isProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.?(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                            plugins: [
                                [ { minify: isProduction, transpileTemplateLiterals: isProduction } ],
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.(png|jp(e*)g|gif|webp|avif)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin( {
                favicon: path.join( __dirname, './assets', 'favicon.ico' ),
                minify: isProduction,
                hash: isProduction,
                cache: isProduction,
                showErrors: !isProduction,
                templateContent: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0"><title>360 Feedback</title></head><body><div id="root"></div></body></html>'
            } ),
            new Dotenv( { systemvars: true } ),
            new MiniCssExtractPlugin( )
        ],
        performance: {
            maxEntrypointSize: Infinity,
            maxAssetSize: 1024 ** 2,
        },
        devtool: 'inline-source-map',
        devServer: {
            host: '0.0.0.0',
            port: process.env.EXPRESS_PORT,
            server: 'http',
            historyApiFallback: true,
        }
    }
}