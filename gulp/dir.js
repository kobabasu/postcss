/**
 * ROOTはnode_modulesが存在するディレクトリからのレポジトリの
 * ドキュメントルートを指定
 *
 * nameはtask名の先頭になる
 */

import path from 'path';

const ROOT = './postcss';
const CONTENT_DIR = '../stylesheet';
const DIST_DIR = '../css';

export const dir = {
  name: '',

  root:    ROOT,
  content: path.join(ROOT + '/' + CONTENT_DIR),

  src:     ROOT + '/src',
  dist:    path.join(ROOT + '/' + DIST_DIR),
  test:    ROOT + '/test',
  report:  ROOT + '/results/test-results.xml',

  pages:   path.join(ROOT + '/' + CONTENT_DIR + '/pages'),

  example: {
    js: {
      src: ROOT + '/example/js'
    },

    css: {
      src: ROOT + '/src',
      dist: ROOT + '/example/css'
    }
  }
}
