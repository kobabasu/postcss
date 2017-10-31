'use strict';

import gulp from 'gulp';
import DefaultRegistry from 'undertaker-registry';
import shell from '/usr/local/lib/node_modules/gulp-shell';

import { dir } from '../dir.es6';

class Postcss extends DefaultRegistry {

  init() {
    // task名の接頭辞を設定
    const prefix = (dir.name == '') ? '' : dir.name + ':';

    /*
     * postcss
     */
    const style = {
      src:     dir.src  + 'style.css',
      dist:    dir.dist + 'style.css',
      watch:   dir.root  + '../stylesheets/**/*.*'
    };

    gulp.task(prefix + 'postcss', shell.task([`
      postcss ${dir.src}/style.css \
      --no-map \
      -o ${dir.dist}/style.css;

      postcss ${dir.pages + '/**/*.css'} \
      --no-map \
      -c ${dir.root + '/postcss.config.js'} \
      -d ${dir.dist}/;
    `]));


    /*
     * min
     */
    gulp.task(prefix + 'postcss:min', shell.task([`
      postcss ${dir.src}/style.css \
      --no-map \
      -o ${dir.dist}/style.css;

      postcss ${dir.pages + '**/*.css'} \
      --no-map \
      -c ${dir.root + '/postcss.config.js'} \
      -d ${dir.dist}/;

      for file in \`find ${dir.dist} -type f -name '*.css'\`; do
        name=\`echo $file | awk -F/ '{print $NF}' | grep -v '.*min.*' | sed -e 's/\\..*//g'\`;
        if [ -n "$name" ]; then
          csswring $file > ${dir.dist}/$name.min.css;
        fi
      done;
    `]));


    /*
     * mocha
     */
    gulp.task(prefix + 'postcss:mocha', shell.task([`
      mocha ${dir.test}/*.js \
      --require babel-register \
      -g '^(?!EXCLUDE)' \
      --timeout 10000
    `]));


    /*
     * mocha:report
     */
    gulp.task(prefix + 'postcss:mocha:report', shell.task([`
      mocha ${dir.test}/*.js \
      --require babel-register \
      --reporter mocha-junit-reporter \
      --reporter-options mochaFile=${dir.report} \
      -g '^(?!EXCLUDE)' \
      --timeout 10000
    `]));


    /*
     * watch
     */
    gulp.task(prefix + 'postcss:watch', () => {
      gulp
        .watch(
          [
            dir.src + '/**/*.*',
            dir.content + '/**/*.*'
          ],
          gulp.series(
            prefix + 'postcss',
            prefix + 'postcss:min'
          )
        )
        .on('error', err => process.exit(1));
    });


    /*
     * copy
     */
    gulp.task(prefix + 'postcss:copy', gulp.series(
      shell.task([`
        if [ ! -f ${dir.content + '/theme.css'} ]; then
          mkdir -p ${dir.content};
          cp -r ${dir.root + '/stylesheet/*'} ${dir.content}/;
        fi

        if [ ! -f ${dir.dist + '/style.css'} ]; then
          mkdir -p ${dir.dist};
        fi
      `]),
      prefix + 'postcss',
      prefix + 'postcss:min'
    ));


    /*
     * example
     */
    const example = {
      dist:  dir.example.css.dist
    };

    gulp.task(prefix + 'postcss:example', shell.task([`
      postcss ${dir.src}/style.css \
      --no-map \
      -o ${dir.example.css.dist}/style.css;

      postcss ${dir.pages + '**/*.css'} \
      --no-map \
      -c ${dir.root + '/postcss.config.js'} \
      -d ${dir.example.css.dist}/;

      for file in \`find ${dir.example.css.dist} -type f -name '*.css'\`; do
        name=\`echo $file | awk -F/ '{print $NF}' | grep -v '.*min.*' | sed -e 's/\\..*//g'\`;
        if [ -n "$name" ]; then
          csswring $file > ${dir.example.css.dist}/$name.min.css;
        fi
      done;
    `]));


    /*
     * build
     */
    gulp.task(prefix + 'postcss:build',
      gulp.series(
        prefix + 'postcss:copy',
        prefix + 'postcss:mocha:report',
        prefix + 'postcss:example'
    ));
  }
};

module.exports = new Postcss();
