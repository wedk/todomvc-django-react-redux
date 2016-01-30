// Gruntfile.js
module.exports = function(grunt) {

  var webpack = require('webpack');

  var reactVersion = grunt.file.readJSON('./node_modules/react/package.json')['version'];

  // project configuration
  grunt.initConfig({

    clean: {
      html: ['templates/base.html'],
      css:  ['static/css*.css', 'static/css*.css.map', 'static/todomvc-app-css'],
      js:   ['static/js*.js']
    },

    htmlbuild: {
      build: {
        src: 'templates_src/base.html',
        dest: 'templates',
        options: {
          data: {
            css: 'css.css',
            js: 'js.js',
            cdn: ''
          }
        }
      },
      dist: {
        src: 'templates_src/base.html',
        dest: 'templates',
        options: {
          data: {
            css: '<%= grunt.filerev && grunt.filerev.summary["static/css.css"].substr(7) %>',
            js: '<%= grunt.filerev && grunt.filerev.summary["static/js.js"].substr(7) %>',
            cnd: '<script src="https://fb.me/react-' + reactVersion + '.min.js"></script>\n    ' +
                 '<script src="https://fb.me/react-dom-' + reactVersion + '.min.js"></script>\n    '
          }
        }
      }
    },

    copy: {
      css_todomvc: {
        src: 'node_modules/todomvc-app-css/index.css',
        dest: 'static/todomvc-app-css/index.css'
      }
    },

    sass: {
      build: {
        options: {
          sourcemap: 'auto',
          style: 'expanded'
        },
        files: {
          './static/css.css': './static_src/css/index.scss'
        }
      },
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: {
          './static/css.css': './static_src/css/index.scss',
          './static/todomvc-app-css/index.css': './static/todomvc-app-css/index.css'
        }
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      css: {
        src: ['static/css.css']
      },
      js: {
        src: ['static/js.js']
      }
    },

    webpack: {
      build: {
        entry: {
          app: './static_src/js/index.jsx'
        },
        output: {
          path: 'static',
          filename: 'js.js'
        },
        module: {
          loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-object-rest-spread']
            }
          }]
        },
        plugins: [
          new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
          })
        ],
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      },
      dist: {
        entry: {
          app: './static_src/js/index.jsx'
        },
        output: {
          path: 'static',
          filename: 'js.js'
        },
        module: {
          loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'react'],
              plugins: ['transform-object-rest-spread']
            }
          }]
        },
        plugins: [
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin()
        ],
        externals: {
          // don't bundle the 'react' npm package
          // but get it from a global 'React' variable (CDN)
          'react': 'React',
          'react-dom': 'ReactDOM'
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      }
    },

    lint: {
      build: {
        src: './static_src/js/**'
      }
    },

    watch: {
      js: {
        files: ['./static_src/js/**/*'],
        tasks: ['js:build']
      },
      css: {
        files: ['./static_src/css/**/*'],
        tasks: ['css:build']
      }
    }

  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-webpack');

  // - cleaning
  grunt.registerTask('clean:all', ['clean:html', 'clean:js', 'clean:css']);

  // - HTML tasks
  grunt.registerTask('html:build', ['htmlbuild:build']);
  grunt.registerTask('html:dist',  ['htmlbuild:dist']);
  grunt.registerTask('html',       ['html:build']);

  // - JS tasks
  grunt.registerTask('js:build',   ['clean:js', 'webpack:build']);
  grunt.registerTask('js:dist',    ['clean:js', 'webpack:dist', 'filerev:js']);
  grunt.registerTask('js',         ['js:build']);

  // - CSS/SASS tasks
  grunt.registerTask('css:build',  ['clean:css', 'copy:css_todomvc', 'sass:build']);
  grunt.registerTask('css:dist',   ['clean:css', 'copy:css_todomvc', 'sass:dist', 'filerev:css']);
  grunt.registerTask('css',        ['css:build']);

  // - build (for development environment)
  grunt.registerTask('build',      ['clean:all', 'js:build', 'css:build', 'html:build']);

  // - dist (for production environment)
  grunt.registerTask('dist',       ['clean:all', 'js:dist', 'css:dist', 'html:dist']);

  // - default task
  grunt.registerTask('default',    ['build', 'watch']);

  // - lint task
  grunt.registerMultiTask('lint', 'Run ESLint linting utility', function() {
    var done = this.async();
    var opts = this.options({ opts: [] })['opts'];
    var args = opts.concat(this.filesSrc.slice());

    grunt.util.spawn({
      cmd: 'node_modules/.bin/eslint',
      args: args
    }, function(err, result, code) {
      if (err) {
        grunt.log.error('Lint failed' + err);
      } else {
        grunt.log.ok('Lint passed (but may contain warnings)');
      }
      if (result.stdout.length) {
        grunt.log.writeln(result.stdout);
      }

      done(code === 0);
    });
  });

};