#!/usr/bin/env bash

cd projects/iw-base

npm --no-git-tag-version version patch

ng build iw-base --prod

cd ../../dist/iw-base

npm publish

cd ../../

git add .

git commit -m "new version published"

git push
