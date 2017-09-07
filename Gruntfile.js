module.exports = function(grunt) {
  
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            'style.min.css':['sass/js-custom-drop-down.scss', 'sass/style.scss'],
          }
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-sass');
  
    grunt.registerTask('default', ['sass']);
  };