'use strict';

import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import shell from '/usr/local/lib/node_modules/gulp-shell';

import { dir } from '../dir.es6';

class Postcss extends DefaultRegistry {

  init() {
    // task名の接頭辞を設定
    let prefix = (dir.name == '') ? '' : dir.name + ':';

    /*
     * postcss
     */
    const style = {
      src:     dir.src  + 'style.css',
      dist:    dir.dist + 'style.css',
      watch:   dir.src  + '**/*.*',
      example: dir.example
    };

    gulp.task(prefix + 'postcss', shell.task([`
      postcss ${style.src} \
      -m { inline: false } \
      -o ${style.dist};
    `]));


    /*
     * lib
     */
    const lib = {
      src:   dir.src  + 'lib.css',
      dist:  dir.dist + 'lib.css',
    };

    gulp.task(prefix + 'postcss:lib', shell.task([`
      postcss ${lib.src} \
      -m { inline: false } \
      -o ${lib.dist};
    `]));


    /*
     * example
     */
    gulp.task(prefix + 'postcss:example', shell.task([`
      postcss ${lib.src} \
      -m { inline: false } \
      -o ${style.example + 'lib.css'};
      postcss ${style.src} \
      -m { inline: false } \
      -o ${style.example + 'style.css'};
    `]));


    /*
     * watch
     */
    gulp.task(prefix + 'postcss:watch', () => {
      gulp
        .watch(
          [style.watch],
          gulp.series(prefix + 'postcss')
        )
        .on('error', err => process.exit(1));
    });


    /*
     * build
     */
    gulp.task(prefix + 'postcss:build',
      gulp.series(
        prefix + 'postcss',
        prefix + 'postcss:lib'
        // prefix + 'postcss:docs'
    ));
  }
};

module.exports = new Postcss();
