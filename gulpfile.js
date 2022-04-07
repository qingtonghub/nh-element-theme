'use strict';

const { series, parallel, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const fs = require('fs');

// 打包原element-ui css
function compileOri() {
  return src('./src/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./ori-temp'));
}

// 打包新增 css
function compilePlus() {
  return src('./plus/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['ie > 9', 'last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest('./plus-temp'));
}

// 将新增plus中css 加入到element-ui打包好的css中
function concatCss() {
  const notRenameList = ['base.css', 'index.css'];
  const srcDir = './ori-temp/';
  const plusDir = './plus-temp/';
  const dirs = fs.readdirSync(srcDir).filter(function(file) {
    return !fs.statSync(srcDir + file).isDirectory();
  });
  // console.log(dirs);
  return new Promise((resolve) => {
    let len = 0;
    dirs.map(function(dir, index) {
      len++;
      const ori = srcDir + dir;
      const plus = plusDir + dir;
      src([ori, plus], { allowEmpty: true })
        .pipe(concat(dir))
        .pipe(rename(function(path) {
          const { basename, extname } = path;
          const filename = basename + extname;
          return {
            ...path,
            basename: notRenameList.indexOf(filename) > -1 ? basename : 'nh-' + path.basename,
            extname: '.css'
          };
        }))
        .pipe(dest('./lib'))
        .on('end', function() {
          if (index === len - 1) {
            return resolve();
          }
        });
    });
  });
}

function copyfont() {
  return src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(dest('./lib/fonts'));
}
exports.build = series(parallel(compileOri, compilePlus), parallel(copyfont, concatCss));
