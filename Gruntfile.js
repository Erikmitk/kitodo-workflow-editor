var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  /**
   * Resolve external project resource as file path
   */
  function resolvePath(project, file) {
    return path.join(path.dirname(require.resolve(project)), file);
  }

  grunt.initConfig({

    browserify: {
      options: {
        browserifyOptions: {
          debug: false
        },
        transform: [
          [ 'stringify', { extensions: [ '.bpmn' ] } ],
          [ 'babelify', { global: true } ]
        ],
        banner: "/**\n * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>\n *\n * This file is part of the Kitodo project.\n *\n * It is licensed under MIT License by camunda Services GmbH\n *\n * For the full copyright and license information, please read the\n * Camunda-License.txt file that was distributed with this source code.\n*/\n\n\nvar saveDiagramFunctionCall;"
      },
      src: {
        files: {
          'build/modeler.js': [ 'src/**/*.js', '!src/js/**/*.*' ]
        }
      },
    },

    copy: {
      bpmn_assets: {
        files: [
          {
            expand: true,
            cwd: resolvePath('bpmn-js', 'dist/assets'),
            src: ['**/*.*', '!**/font/**/*.*', '!**/*.js', '!**/bpmn-codes.css', '!**/bpmn.css'],
            dest: 'build/vendor'
          }
        ]
      },

      src_assets: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.*', '!**/*.js', '!**/*.json'],
            dest: 'dist'
          }
        ]
      },

      custom_js: {
        files: [ {
          expand: true,
          cwd: 'src/js/',
          src: ['modeler_custom.js'],
          dest: 'dist/js'
          }
        ]
      }
    },

    less: {
      options: {
        dumpLineNumbers: 'comments',
        paths: [
          'node_modules'
        ]
      },
      styles: {
        files: {
          'build/css/src.css': 'styles/src.less'
        }
      }
    },

    uglify: {
      modeler: {
        options: {
          mangle:false,
          compress: true,
          preserveComments: true,
          yuicompress: true,
          optimization: 2,
          banner: "/**\n * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>\n *\n * This file is part of the Kitodo project.\n *\n * It is licensed under MIT License by camunda Services GmbH\n *\n * For the full copyright and license information, please read the\n * Camunda-License.txt file that was distributed with this source code.\n*/\n\n"
        },
        files: {
          "dist/js/modeler_min.js" : ['build/modeler.js']
        }
      }
    },

    concat: {
      css: {
        src: 'build/**/*.css',
        dest: 'dist/css/modeler.css',
        options: {
          banner: "/**\n * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>\n *\n * This file is part of the Kitodo project.\n *\n * It is licensed under MIT License by camunda Services GmbH\n *\n * For the full copyright and license information, please read the\n * Camunda-License.txt file that was distributed with this source code.\n*/\n\n"
      }
        }
    },

    watch: {
      assets: {
        files: [ 'src/**/*.*' ],
        tasks: [ 'copy:src_assets', 'copy:custom_js' ]
      },

      less: {
        files: [
          'styles/**/*.less',
          'node_modules/bpmn-js-properties-panel/styles/**/*.less'
        ],
        tasks: [
          'less',
          'concat:css'
        ]
      },
      js: {
        files : [ 'src/**/*.js'],
        tasks : ['browserify:src','uglify']
      }
    }
  });

  grunt.registerTask('build', [
    'copy',
    'less',
    'browserify:src',
    'uglify'
  ]);

  grunt.registerTask('auto-build', [
    'copy',
    'less',
    'concat:css',
    'browserify:src',
    'uglify',
    'watch'
  ]);

  grunt.registerTask('default', [ 'auto-build' ]);
};
