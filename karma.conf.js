const ENV = process.env.npm_lifecycle_event;
const runOnce = ENV === 'test:dev' || ENV === 'test:prod';

module.exports = function (config) {

    const configuration = {

        basePath: '',

        frameworks: [
            'jasmine'
        ],

        files: [
            { pattern: 'src/main.test.js', watched: false }
        ],

        preprocessors: {
            './src/main.test.js': ['coverage', 'webpack', 'sourcemap']
        },

        webpack: require('./webpack.test.js'),

        coverageReporter: {
            dir: 'reports/coverage/',
            reporters: [
                { type: 'text-summary' },
                { type: 'json', subdir: '.', file: 'coverage.json' },
                { type: 'html', subdir: '.' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
            ]
        },

        junitReporter: {
            outputDir: `reports/tests/testreport`,
            outputFile: 'report.xml',
            suite: 'connect-opencti-client',
            useBrowserName: false
        },

        reporters: ENV === 'test:dev' ? ['junit', 'mocha', 'coverage'] : ['junit', 'mocha'],

        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: runOnce
    };

    config.set(configuration);
};
