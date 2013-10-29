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
        build: ["build/css/"],
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
          {expand: true, src: ['src/css/*'], dest: 'build/css/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['src/img/*'], dest: 'build/img/', flatten: true, filter: 'isFile'},
          {expand: true, src: ['src/js/*'], dest: 'build/js/', flatten: true, filter: 'isFile'}

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
  

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compass', 'copy']);

};