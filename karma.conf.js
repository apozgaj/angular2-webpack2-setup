const ENV = process.env.npm_lifecycle_event;
const runOnce = ENV === 'test:dev' || ENV === 'test:prod';

module.exports = function (config) {

    const configuration = {

        basePath: '',

        frameworks: [
            'jasmine',
            'intl-shim'
        ],

        exclude: [],

        files: [
            { pattern: 'src/main.test.js', watched: false }
        ],

        plugins: [
            require("karma-intl-shim")
        ],

        preprocessors: {
            './src/main.test.js': ['webpack', 'sourcemap']
        },

        webpack: require('./webpack.test.js'),

        junitReporter: {
            outputDir: `reports/tests/testreport`,
            outputFile: 'report.xml',
            suite: 'connect-opencti-client',
            useBrowserName: false
        },

        reporters: ['coverage', 'junit', 'nyan'],

        coverageReporter: {
            dir: 'reports/coverage/',
            reporters: [
                { type: 'text-summary' },
                { type: 'json', subdir: '.', file: 'coverage.json' },
                { type: 'html', subdir: '.' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: !runOnce,

        browsers: ['Chrome'],

        singleRun: runOnce,

    };

    config.set(configuration);
};
