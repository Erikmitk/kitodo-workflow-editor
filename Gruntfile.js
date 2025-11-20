var path = require('path');

var bpmnModdlePath = require.resolve('bpmn-moddle');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  /**
   * Resolve external project resource as file path
   */
  function resolvePath(project, file) {
    return path.join(path.dirname(require.resolve(project)), file);
  }

  grunt.initConfig({

    webpack: {
      modeler: require('./webpack.config.js')
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

      localization: {
        files: [
          {
          expand: true,
          cwd: 'src/language/',
          src: ['*.js'],
          dest: 'build/language'
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
          banner: '/**\n * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>\n *\n * This file is part of the Kitodo project.\n *\n * It is licensed under MIT License by camunda Services GmbH\n *\n * For the full copyright and license information, please read the\n * Camunda-License.txt file that was distributed with this source code.\n*/\n\n'
        },
        files: {
          'dist/js/modeler_min.js' : ['build/modeler.js', 'build/language/*.js']
        }
      }
    },

    concat: {
      css: {
        src: 'build/**/*.css',
        dest: 'dist/css/modeler.css',
        options: {
          banner: '/**\n * (c) Kitodo. Key to digital objects e. V. <contact@kitodo.org>\n *\n * This file is part of the Kitodo project.\n *\n * It is licensed under MIT License by camunda Services GmbH\n *\n * For the full copyright and license information, please read the\n * Camunda-License.txt file that was distributed with this source code.\n*/\n\n'
      }
        }
    },

    watch: {
      assets: {
        files: [ 'src/**/*.*' ],
        tasks: [ 'copy:src_assets', 'copy:custom_js' , 'copy:localization']
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
        tasks : ['webpack:modeler','uglify']
      }
    }
  });

  grunt.registerTask('build', [
    'copy',
    'less',
    'concat:css',
    'webpack:modeler',
    'uglify'
  ]);

  grunt.registerTask('auto-build', [
    'copy',
    'less',
    'concat:css',
    'webpack:modeler',
    'uglify',
    'watch'
  ]);

  grunt.registerTask('default', [ 'auto-build' ]);
};
