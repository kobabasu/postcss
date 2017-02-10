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

## gulp
1. gulp/dir.es6.sampleをコピーしgulp/dir.es6を作成
1. gulp/dir.es6を変更
1. documentRootのgulpfile.babel.js内で読み込み

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
