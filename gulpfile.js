var gulp = require('gulp');
var connect = require('gulp-connect');
var to5 = require('gulp-6to5');

gulp.task('compile', function() {
  gulp.src('./src/**/*.js')
    .pipe(to5({
      modules: 'amd',
    }))
    .on('error', function(e) {
      console.log(e.message);
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
  gulp.src(['./src/index.html', './src/main.css'])
    .pipe(gulp.dest('dist'))

  gulp.src(['./src/img/*.svg'])
    .pipe(gulp.dest('dist/img'))

  gulp.src(['./bower/requirejs/require.js',
            './bower/react/react-with-addons.js',
            './bower/rxjs/dist/rx.all.js',
            './bower/es6-shim/es6-shim.js'])
    .pipe(gulp.dest('./dist/bower'))
})

gulp.task('build', ['compile', 'copy']);

// WATCH FILES FOR CHANGES
gulp.task('watch', function() {
  gulp.watch(['./src/js/**/*.js', './src/index.html', './src/main.css'], ['build']);
});

// WEB SERVER
gulp.task('serve', function() {
  connect.server({
    root: [__dirname + '/dist'],
    port: 8000
  })
});
