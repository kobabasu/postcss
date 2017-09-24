[![CircleCI](https://circleci.com/gh/kobabasu/micro-postcss.svg?style=shield&circle-token=c181a31aabfe59d8f79ece75e1af85b0726555a6)](https://circleci.com/gh/kobabasu/micro-postcss)

# micro-postcss
postcssを利用するためnodejs環境とpostcss-cliのインストールが必要

```
git add submodule git@github.com-kobabasu:kobabasu/micro-postcss.git postcss  
git submodule init && git submodule update
```

## npm
preinstallでひとつ上の階層にstylesheets/が作成される
変更はその中で行う
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

## circleci
1. githubとcircleciとslackを連携させる
1. .cicrleci/config.ymlをプロジェクトルートにコピー
1. config.ymlの`working_directory`を編集
1. プロジェクトのREADME.mdのbadgeを編集
1. git push してみて成功するか確認

## Dockerfile
もしcircleciのコンテナになにか追加する必要があれば、
Dockerfileを編集しbuildしdocker hubにpush

1. `hub clone cores/cores-vagrant coreos`
1. config.rb, user-dataをコピー
1. config.rbを編集
1. `shared_folder`でレポジトリのルートを共有
1. `docker build -t kobabasu/alpine-chrome:0.xx` /home/core/share`
1. `docker login`
1. `docker push kobabasu/alpine-chrome:0.xx`
1. docker-composeをインストール
1. `docker-compose up`
1. `docker-compose start`
1. `docker exec chrome gulp mocha:report`や`vagrant ssh -c 'docker exec chrome gulp mocha:report'`で確認
1. 問題なければ`.circleci/config.yml`のimagesのバージョンを変更
1. git pushで確認

## gulp tasks
1. `gulp [prefix]:postcss`  
   style.cssと../stylesheets/pages/以下のファイルをbuildする
1. `gulp [prefix]:postcss:min`  
   style.cssと../stylesheets/pages/以下のファイルをbuildしcsswringで../cssのminがついていないファイルをminifyする
1. `gulp [prefix]:postcss:copy`  
   ./cssと./stylesheetsを上の階層にコピー
1. `gulp [prefix]:postcss:example`  
   ../cssではなくexample/cssへ出力する。合わせてcsswringでminifyしたファイルも作成
1. `gulp [prefix]:postcss:nodejs`  
   mochaでのDOM操作を伴わないファイルをtest (ほぼ使わないはず)
1. `gulp [prefix]:postcss:phantomjs`  
   mocha-phantomjs-coreでDOM操作を伴うファイルをtest
1. `gulp [prefix]:postcss:nodejs:report`  
   mochaでのDOM操作を伴わないファイルをtestしresults/にレポートを作成
1. `gulp [prefix]:postcss:phantomjs:report`  
   mocha-phantomjs-coreでDOM操作を伴うファイルをtestしresults/にレポートを作成
1. `gulp [prefix]:postcss:mocha`  
   mochaでtestディレクトリ内の`js`拡張子が付いたファイルをtest
1. `gulp [prefix]:postcss:mocha:report`  
   mochaでtestディレクトリ内の`js`拡張子が付いたファイルをtestしresults/にレポートを作成
1. `gulp [prefix]:postcss:watch`  
   src/, modules/, test/内のファイルが変更されたらlib:mochaを実行
1. `gulp [prefix]:postcss:build`  
   postcss:copy, postcss, postcss:min, postcss:exampleをまとめて実行

## build files
gulp postcss:buildで一つ上の階層に以下が生成される

1. css/style.css (src/からビルドされたstyle.css), pages/*.cssが出力される
1. css/*.css (pages/*.cssから出力される)
1. stylesheets/layouts (レイアウトに関するcss header, footerなど0
1. stylesheets/pages (各ページ固有のスタイル)
1. stylesheets/fonts (使用するfontsファイル)
1. stylesheets/test (テスト用ファイル)

## edit
1. git submodule init && git submodule updateを実行
1. package.json, bower.json, gulp/dir.es6を作成
1. 必要があれば.htaccess, .htdigest, .htpasswdをコピーして利用  
   (gtmetirixなどの評価が気になる場合はCACHEの項目を有効にする)
1. 必要があれば、src/style.cssのexternal submodule, src/configs/type.cssのfont-faceのパスを変更
1. npm installでpostcss:buildが実行され../に./cssを生成, ./stylesheetsがコピーされる
1. `postcss`でビルド

## todo
- [ ] postcss-cli v3 がでたらcompressがswitchできるかどうか試す
- [ ] postcss-cli v3 がでたらnextcssrcの読み込みを試す
- [ ] bower packageの読み込み方
- [ ] postcss.jsonのmapのinline:false化
- [ ] styleguideをどうするか(候補sc5, postcss-style-guide)
