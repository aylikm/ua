const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const babel = require('gulp-babel')

const browserSyncFunc = () => {
  browserSync.init({
    server: 'dist/',
    open: false
  })
}
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
}

const compJs = () => {
  return gulp.src('src/js/*.js')
  .pipe(babel(
    {
      presets: ['@babel/env', 'minify']
    }
  ))
  .pipe(gulp.dest('dist/js'))
}
const sassComp = () => {
  return gulp.src( 'src/sass/*.scss' )
    .pipe( sass({outputStyle: 'compressed'}).on( 'error', sass.logError ) )
    .pipe( autoprefixer())
    .pipe( gulp.dest( './dist/css' ));
}
// const indexEjs = () => {
//   return gulp.src(["src/ejs/index.ejs", '!' + "src/ejs/_*.ejs"])
//     .pipe(ejs())
//     .pipe(rename("index.html"))
//     .pipe( gulp.dest( "./dist" ) );
// }
const lookEjs = () => {
  return gulp.src(["src/ejs/index.ejs", '!' + "src/ejs/_*.ejs"])
    .pipe(ejs())
    .pipe(rename("index.html"))
    .pipe( gulp.dest( "./dist" ) );
}
const itemEjs = () => {
  return gulp.src(["src/ejs/item/index.ejs", '!' + "src/ejs/_*.ejs"])
    .pipe(ejs())
    .pipe(rename("index.html"))
    .pipe( gulp.dest( "./dist/item" ) );
}

const watchFiles = () => {
  gulp.watch( "src/sass/*.scss", gulp.series( [sassComp, browserSyncReload] ) );
  gulp.watch( "src/**/*.ejs", gulp.series( [lookEjs, itemEjs, browserSyncReload] ) );
  gulp.watch( "src/js/*.js", gulp.series( [compJs, browserSyncReload] ) );
}

exports.default = gulp.parallel(watchFiles, browserSyncFunc)