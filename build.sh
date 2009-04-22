#!/bin/sh

# build.sh - tiny bash script for packaging Firefox extension
# based on: http://kb.mozillazine.org/Bash_build_script

NAME=bookmark-all
DIRS="content locale skin"
FILES="LICENSE"
TEMP_DIR=build

FILES="$FILES chrome.manifest install.rdf"

rm -rf $TEMP_DIR
mkdir $TEMP_DIR
cp -r $DIRS $FILES $TEMP_DIR
cd $TEMP_DIR
7za a -tzip "$NAME.xpi" -mx=9 * -r > /dev/null 2>&1
# zip -rq9X "$NAME.xpi" *
cp $NAME.xpi ..
cd ..
rm -rf $TEMP_DIR
