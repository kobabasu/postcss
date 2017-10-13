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
      watch:   dir.src  + '**/*.*'
    };

    gulp.task(prefix + 'postcss', shell.task([`
      postcss ${style.src} \
      --no-map \
      -o ${style.dist}

      postcss ${dir.pages + '**/*.css'} \
      --no-map \
      -c ${dir.root + 'postcss.config.js'} \
      -d ${dir.dist};
    `]));


    /*
     * min
     */
    gulp.task(prefix + 'postcss:min', shell.task([`
      postcss --no-map ${style.src} -o ${style.dist};
      postcss --no-map ${dir.pages + '**/*.css'} -c ${dir.root + 'postcss.config.js'} -d ${dir.dist};
      for file in \`find ${dir.dist} -type f -name '*.css'\`; do
        name=\`echo $file | awk -F/ '{print $NF}' | grep -v '.*min.*' | sed -e 's/\\..*//g'\`;
        if [ -n "$name" ]; then
          csswring $file > ${dir.dist}$name.min.css;
        fi
      done;
    `]));
      

    /*
     * copy
     */
    gulp.task(prefix + 'postcss:copy', shell.task([`

      mkdir -p ${dir.root + '../css'};
      if [ ! -d ${dir.root + '../stylesheets'} ]; then
        cp -r ${dir.root + 'stylesheets'} ${dir.root + '../'};
      fi
    `]));



    /*
     * example
     */
    const example = {
      dist:  dir.example.css.dist
    };

    gulp.task(prefix + 'postcss:example', shell.task([`
      postcss --no-map ${style.src} -o ${dir.example.css.dist + 'style.css'};
      postcss --no-map ${dir.pages + '**/*.css'} -c ${dir.root + 'postcss.config.js'} -d ${dir.example.css.dist};

      for file in \`find ${dir.dist} -type f -name '*.css'\`; do
        name=\`echo $file | awk -F/ '{print $NF}' | grep -v '.*min.*' | sed -e 's/\\..*//g'\`;
        if [ -n "$name" ]; then
          csswring $file > ${dir.example.css.dist}$name.min.css;
        fi
      done;
    `]));


    /*
     * mocha
     */
    gulp.task(prefix + 'postcss:mocha', shell.task([`
      mocha ${dir.test}*.js \
      --require babel-register \
      -g '^(?!EXCLUDE)' \
      --timeout 10000
    `]));


    /*
     * mocha:cover
     */
    gulp.task(prefix + 'lib:mocha:cover', shell.task([`
      nyc \
      --reporter=lcov \
      --reporter=text \
      --reporter=cobertura \
      mocha ${dir.test}*.js \
      --require babel-register \
      -g '^(?!EXCLUDE)' \
      --timeout 10000
    `]));


    /*
     * mocha:report
     */
    gulp.task(prefix + 'postcss:mocha:report', shell.task([`
      mocha ${dir.test}*.js \
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
        prefix + 'postcss:copy',
        prefix + 'postcss',
        prefix + 'postcss:min',
        prefix + 'postcss:example'
        // prefix + 'postcss:docs'
    ));
  }
};

module.exports = new Postcss();
