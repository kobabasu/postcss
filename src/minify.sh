#!/bin/bash
#
# 対象ディレクトリ内のmin.css以外のファイルをminifyする
#


# 対象ディレクトリ
readonly TARGET="../css"


#
# ../css内のmin.css以外のファイルをminifyする
#
find $TARGET -type f -a ! -name "*.min.css" -exec basename {} .css \; |
xargs -I{} cleancss $TARGET/{}.css -o $TARGET/{}.min.css
