const path = require('path');

const {
    LoaderOptionsPlugin,
    ContextReplacementPlugin,
    DllPlugin,
    DllReferencePlugin,
    ProgressPlugin,
    NoErrorsPlugin,
    DefinePlugin
} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const EVENT = process.env.npm_lifecycle_event || '';
const DLL = EVENT.includes('dll');
const PROD = EVENT.includes('prod');
const DEV = EVENT.includes('dev');
const E2E = EVENT.includes('e2e');

const DLL_VENDORS = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/platform-server',
    '@angular/router',
    'rxjs'
];

const LOCALE_ID = process.env.LOCALE_ID;
const TRANSLATION_FILE = process.env.TRANSLATION_FILE;

module.exports = function webpackConfig() {
    let config = {
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.js', '.json', '.css', '.html', 'xlf'],
            alias: {
                'aot': path.join(__dirname, 'build/aot/src'),
                'components': path.join(__dirname, 'src/app')
            }
        },

        module: {
            rules: [{
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.join(__dirname, 'node_modules/@angular'),
                    path.join(__dirname, 'node_modules/rxjs')]
            },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: [/\.(spec|d)\.ts$/] },
            { test: /\.css$/, loaders: ['raw-loader', 'css-loader'] },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html/, loader: 'raw-loader', exclude: [path.join(__dirname, 'src/index.html')] },
            { test: /\.xlf/, loader: 'raw-loader' }]
        },

        plugins: [
            // Related with issue: https://github.com/angular/angular/issues/11580
            new ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                path.join(__dirname, './src')
            ),
            new ProgressPlugin(),
            new NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                inject: true,
                chunksSortMode: function (a, b) {
                    // polyfills always need to be loaded first 
                    if (a.names[0].indexOf('polyfills')) {
                        return 1;
                    }
                    if (b.names[0].indexOf('polyfills')) {
                        return -1;
                    }
                    return 0;
                }
            }),
            new CopyWebpackPlugin([{
                context: 'locale',
                from: '*.json'
            }])
        ]
    };

    if (DLL) {
        // Entry Point for DLL
        config.entry = {
            polyfills: ['./src/polyfills.browser'],
            vendor: DLL_VENDORS
        };

        // Output for DLL
        config.output = {
            path: path.join(__dirname, 'build/dll'),
            filename: '[name].dll.js',
            library: '[name]'
        };
    } else {

        // Entry Point for PROD 
        if (PROD) {
            config.entry = {
                polyfills: './src/polyfills.browser',
                main: './src/main.browser.aot'
            };
        } else {
            // ... and DEV
            config.entry = {
                polyfills: './src/polyfills.browser',
                main: './src/main.browser'
            };
        }

        // Output for PROD and DEV
        config.output = {
            path: path.join(__dirname, 'build/client'),
            filename: '[name].js'
        };
    }

    if (DEV) {
        if (TRANSLATION_FILE && LOCALE_ID) {
            config.plugins.push(new DefinePlugin({ 'APP_LOCALE_ID': `"${LOCALE_ID}"` }));
            config.resolve.alias['messages.xlf'] = path.join(__dirname, 'locale', TRANSLATION_FILE);
        }

        config.plugins.push(
            new DllReferencePlugin({
                context: '.',
                manifest: require(`./build/dll/polyfills-manifest.json`)
            }),
            new DllReferencePlugin({
                context: '.',
                manifest: require(`./build/dll/vendor-manifest.json`)
            }),

            new AddAssetHtmlPlugin({
                filepath: path.join(__dirname, 'build/dll/polyfills.dll.js')
            }),

            new AddAssetHtmlPlugin({
                filepath: path.join(__dirname, 'build/dll/vendor.dll.js')
            })
        );
    }

    if (DLL) {
        config.plugins.push(
            new DllPlugin({
                name: '[name]',
                path: path.join(__dirname, 'build/dll/[name]-manifest.json'),
            })
        );
    }

    if (PROD) {
        config.plugins.push(
            /*
             * This will prevent emitting corrupted assets but will
             * not cause build to fail.
             * Use --bail to fail the build process on error.
             * 
             */
            new NoErrorsPlugin(),
            new UglifyJsPlugin({
                beautify: false,
                comments: false
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        );

        if (!E2E) {
            config.plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerPort: 5000
                })
            );
        }
    }

    return config;
} ();