var wallabyWebpack = require('wallaby-webpack');
var webpackPostprocessor = wallabyWebpack({});

//Use phantomjs 2.0.0 or greater
var runner = '/Users/user/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs';
//runner: '/Users/user/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs'
// or
// runner: 'C:\\Tmp\\phantomjs-2.1.1-windows\\bin\\phantomjs.exe'
// or (if you have phantomjs 2 path set in your system environment) just
// runner: 'phantomjs'

module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'src/*.js', load: false},
            {pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false}
        ],
        tests: [
            {pattern: 'tests/*.tests.js', load: false}
        ],
        testFramework: 'mocha',
        compilers: {
            '**/*.js': wallaby.compilers.babel({
            })
        },
        env: {
            type: 'browser',
            runner: runner,
            params: {
                runner: "--web-security=false"
            }
        },
        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};