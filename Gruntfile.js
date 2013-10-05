/*jslint continue: true, es5: true, evil: true, forin: true, sloppy: true, vars: true, regexp: true, newcap: true, node: true*/
/*global grunt*/

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('make-json', function (type) {
        var docs = grunt.file.read('data/docs.js'),
            json = eval(docs), // this will return a JS object, ready to be stringify-ied
            jsonFull = '',
            jsonMin = '';
        
        if (type === 'full') {
            jsonFull = JSON.stringify(json, null, 2);
        } else if (type === 'bare') {
            jsonMin = JSON.stringify(json);
        } else {
            jsonFull = JSON.stringify(json, null, 2);
            jsonMin = JSON.stringify(json);
        }
        
        if (jsonFull) {
            grunt.file.write('data/docs.json', jsonFull);
            grunt.log.ok('Full doc written.');
        }
        if (jsonMin) {
            grunt.file.write('data/docs.min.json', jsonMin);
            grunt.log.ok('Bare doc written.');
        }
    });
    
    grunt.registerTask('default', ['coffee', 'make-json']);
    grunt.registerTask('bare', ['coffee', 'make-json:bare']);
    grunt.registerTask('dev', ['bare', 'watch']);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            all: {
                options: {
                    bare: true
                },
                files: {
                    'data/docs.js': 'data/docs.coffee'
                }
            }
        },
        watch: {
            dev: {
                files: 'data/docs.coffee',
                tasks: ['bare']
            }
        }
    });
};