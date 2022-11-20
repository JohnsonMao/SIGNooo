#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git checkout -B main
git add -A
git commit -m 'deploy'

git push -f https://github.com/JohnsonMao/SIGNooo.git main:gh-pages

cd -
