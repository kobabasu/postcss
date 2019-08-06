#!/bin/bash
#
# 対象ディレクトリ内のmin.css以外のファイルをminifyする
#


# style.cssのディレクトリ 
readonly SRC="./src"
# ソースファイルのディレクトリ 
readonly TARGET="../stylesheet/pages"
# 設定ファイルのあるディレクトリ 
readonly SETTINGS="./"
# 出力するディレクトリ
readonly DIST="../css"

#
# style.cssをコンパイル
#
postcss --config $SETTINGS/postcss.config.js $SRC/style.css -d $DIST

#
# ../stylesheet/pages内のcssを../cssにコンパイル
#
postcss --config $SETTINGS/postcss.config.js $TARGET -d $DIST
