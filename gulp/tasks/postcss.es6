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
      cfg:     dir.cfg,
      cfgmin:  dir.cfgmin,
      src:     dir.src  + 'style.css',
      dist:    dir.dist + 'style.css',
      min:     dir.dist + 'style.min.css',
      map:     dir.dist + 'style.min.css.map',
      watch:   dir.src  + '**/*.*',
      example: dir.example
    };

    gulp.task(prefix + 'postcss', shell.task([`
      postcss -c ${style.cfg} \
      --input ${style.src} -o ${style.dist}
    `]));


    /*
     * min 
     * mapファイルはinline
     */
    gulp.task(prefix + 'postcss:min', shell.task([`
      postcss --map -c ${style.cfgmin} \
      --input ${style.src} -o ${style.min} 
    `]));


    /*
     * lib
     * mapファイルはinline
     */
    const lib = {
      src:   dir.src  + 'lib.css',
      dist:  dir.dist + 'lib.css',
      min:   dir.dist + 'lib.min.css',
      map:   dir.dist + 'lib.min.css.map'
    };

    gulp.task(prefix + 'postcss:lib', shell.task([`
      postcss --map -c ${style.cfgmin} \
      --input ${lib.src} -o ${lib.min} 
    `]));


    /*
     * example
     */
    gulp.task(prefix + 'postcss:example', shell.task([`
      postcss --map -c ${style.cfgmin} \
      --input ${lib.src} -o ${style.example + 'lib.css'};
      postcss -c ${style.cfg} \
      --input ${style.src} -o ${style.example + 'style.css'};
    `]));


    /*
     * watch
     */
    gulp.task(prefix + 'postcss:watch', () => {
      gulp
        .watch([style.watch], gulp.series(prefix + 'postcss'))
        .on('error', err => process.exit(1));
    });


    /*
     * build
     */
    gulp.task(prefix + 'postcss:build',
      gulp.series(
        prefix + 'postcss',
        prefix + 'postcss:min',
        prefix + 'postcss:lib'
        // prefix + 'postcss:docs'
    ));
  }
};

module.exports = new Postcss();
