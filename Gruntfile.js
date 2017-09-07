module.exports = function(grunt) {
  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'js-custom-drop-down.min.css':'sass/js-custom-drop-down.scss',
            'custom-style.min.css':'sass/custom-style.scss'
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-sass');
  
    grunt.registerTask('default', ['sass']);
  };