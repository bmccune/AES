module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    clean: {
        build: ["build"],
        dist: ["dist"]
    },
    includes: {
        files: {
            src: [
                'src/html/index.html',
                'src/html/who_we_are.html'

            ], // Source files
            dest: 'build/html', // Destination directory
            flatten: true,
            cwd: '.',
            options: {
              silent: true,
              banner: '<!-- I am a banner <% includes.files.dest %> -->'
            }
        }
    },
    compass: {                  // Task
        dist: {                   // Target
          options: {              // Target options
            sassDir: 'src/sass',
            cssDir: 'build/css',
            environment: 'production'
          }
        },
        dev: {                    // Another target
          options: {
            sassDir: 'src/sass',
            cssDir: 'build/css'
          }
        }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['src/css/*'], dest: 'dist/css/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['build/css/*'], dest: 'dist/css/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['src/img/*'], dest: 'dist/img/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['src/fonts/*'], dest: 'dist/fonts/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['src/js/*'], dest: 'dist/js/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['build/html/*'], dest: 'dist/', flatten: true, filter: 'isFile'}
        ]
      }
    },
    watch: {
        compass: {
            files: [
                'src/sass/**/*.{scss,sass}'
            ],
            tasks: ['clean', 'copy', 'compass:dev']
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-includes');

  

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'includes', 'compass', 'copy']);

};