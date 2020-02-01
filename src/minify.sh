#!/bin/bash
#
# ../css内のmin.css以外のファイルをminifyする
#


# レポジトリ内にあるsrcのディレクトリ 
readonly REPO="./src"
# ファイルのあるディレクトリ 
readonly SRC="../stylesheet"
# 出力するディレクトリ
readonly DIST="../css"

#
# ../css内のmin.css以外のファイルをminifyする
#
find $DIST -type f -a ! -name "*.min.css" -exec basename {} .css \; |
xargs -I{} cleancss $DIST/{}.css -o $DIST/{}.min.css
