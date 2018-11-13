#!/usr/bin/env bash

cd projects/iw-core

npm --no-git-tag-version version patch

ng build iw-core --prod

cd ../../dist/iw-core

npm publish

cd ../../

git add .

git commit -m "new version published"

git push
