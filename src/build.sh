#!/bin/bash
#
# ../javascript/pages内の.cssファイルをコンパイル
#


# レポジトリ内にあるsrcのディレクトリ 
readonly REPO="./src"
# ファイルのあるディレクトリ 
readonly SRC="../stylesheet"
# 出力するディレクトリ
readonly DIST="../css"

#
# ../javascript/pages内の.cssファイルをコンパイル
#
postcss $SRC/pages --config ./postcss.config.js --no-map -d $DIST
