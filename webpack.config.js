const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== "production";
const { webpack } = require('webpack');
const path = require('path');

let htmlPagesNames = [
    'about-us',
    'demo',
    'contact',
    'gallery',
    'links',
    'offer',
    'repertoire'
];

const multipleHtmlPlugins = htmlPagesNames.map(name => {
    return new htmlWebpackPlugin({
        template: `./src/${name}.html`,
        filename: `${name}.html`,
        chunk: [`${name}`],
    });
});

module.exports = {
    entry: {
        main: './src/js/main.js',
        'about-us': './src/js/about-us.js',
        concat: './src/js/contact.js',
        demo: './src/js/demo.js',
        gallery: './src/js/gallery',
        links: './src/js/links.js',
        offer: './src/js/offer.js',
        repertoire: './src/js/repertoire.js'
    },
    output: {
        clean: true,
        filename: '[name].main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                },
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images'
                },
            },
            {
                test: /\.(mp3|wav)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'audio-demo',
                            useRelativePaths: true
                        }
                    }
                ]
            },
        ]
    },
    /* resolve: {
        alias: {
            "../images/menu-bg.jpg": path.resolve(
                __dirname,
                "src/images/menu-bg.jpg"
            ),
            "../images/bg.gif": path.resolve(
                __dirname,
                "src/images/bg.gif"
            ),
            "../images/stopka.jpg": path.resolve(
                __dirname,
                "src/images/stopka.jpg"
            ),
        }
    }, */
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            linkType: "text/css",
        }),
        new htmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ].concat(multipleHtmlPlugins),
}