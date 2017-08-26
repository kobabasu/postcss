# micro-postcss
postcssを利用するためnodejs環境とpostcss-cliのインストールが必要

```
git clone git@github.com-kobabasu:kobabasu/micro-postcss.git postcss 
```

## npm
1. 必要があればdevelopブランチを使う  
   `git checkout develop`
1. `npm start`
1. `npm install`

## bower
example用の`test/*.html`で読み込むようにtest専用のライブラリを用意する  
.bowerrcでexample/vendor以下にインストールされるよう設定
1. jqueryやfontawesomeやmaterial-designなどいらないものを削除
1. `cp bower.json.sample bower.json`
1. `bower install`

## gulp
1. 単独で動かす場合はgulpfile.babel.js.sampleをgulpfile.babel.jsにリネーム
1. projectに追加する場合はすでにあるgulpfile.babel.jsを編集
1. cp gulp/dir.es6.sample gulp/dir.es6
1. dir.es6を編集。  
   rootは`package.json`からみたmicro-postcssレポジトリのディレクトリを指定  
   `node_modules`は`package.json`からみた`node_modules/`の場所を指定。ほとんどの場合`./`
1. gulp postcss:example:reportで正常に動作するか試す
1. dir.es6のsrcを実際にソースがあるディレクトリに変更


## check
1. ブラウザで確認
   `gulp <dir.es6で設定した名前>:postcss:build`
   作成されたhtmlが動作するか確認

## guide
1. ブラウザで確認
   `gulp <dir.es6で設定した名前>:postcss:example`
   /example/index.htmlが動作するか確認

## todo
- [ ] postcss-cli v3 がでたらcompressがswitchできるかどうか試す
- [ ] postcss-cli v3 がでたらnextcssrcの読み込みを試す
- [ ] bower packageの読み込み方
- [ ] postcss.jsonのmapのinline:false化
- [ ] styleguideをどうするか(候補sc5, postcss-style-guide)
