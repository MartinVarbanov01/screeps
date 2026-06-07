module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-copy');
    require('dotenv').config();
    grunt.initConfig({
    clean: {
        dist: ['dist/*.js']  // or just ['dist/'] to wipe the whole folder
    },
    copy: {
        dist: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.js','**/*.json'],
                dest: 'dist/',
                rename: function(dest, src) {
                    return dest + src.replace(/\//g, '.');
                }
            }]
        }
    },
    screeps: {
        options: {
            email: process.env.SCREEPS_EMAIL,
            token: process.env.SCREEPS_TOKEN,
            branch: process.env.SCREEPS_BRANCH,
        },
        dist: {
            src: ['dist/*.js'],
        }
    }
});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-screeps');

grunt.registerTask('default', ['clean:dist', 'copy:dist', 'screeps:dist']);
}