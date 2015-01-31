module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env : {
            dev: {
                NODE_ENV : 'DEVELOPMENT'
            },
            prod: {
                NODE_ENV : 'PRODUCTION'
            }
        },
        preprocess : {
             dev: {
                src : './src/tmpl/index.html',
                dest : './src/index.html'
            },
            prod: {
                src : './src/tmpl/index.html',
                dest : './dist/index.html',
                options : {

                    context : {
                        name : '<%= pkg.name %>',
                        version : '<%= pkg.version %>',
                        now : '<%= now %>',
                        ver : '<%= ver %>'
                    }
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9000,
                    hostname: "localhost",

                    // Prevents Grunt to close just after the task (starting the server) completes
                    // This will be removed later as `watch` will take care of that
                    keepalive: true,
                    livereload: true,
                    open: {
                        target: 'http://localhost:9000/src', // target url to open
                        appName: 'Google Chrome', // name of the app that opens, ie: open, start, xdg-open
                    }
                }
            }

        },
        copy: {
            prod: {
                files: [
                    {cwd: '.', src: 'src/tmpl/index.html', dest: 'dist/index.html'},
                    {expand: true, flatten: true, cwd: '.', src: ['src/assets/**/*'], dest: 'dist/assets/'}
                ]
            },
            dev: {
                files: [
                    {cwd: '.', src: 'src/tmpl/index.html', dest: 'src/index.html'},
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/script.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('development', ['env:dev', 'connect:dev', 'preprocess:dev']);
    grunt.registerTask('production', ['env:prod', 'uglify', 'copy:prod', 'preprocess:prod']);
};
