#!/usr/bin/env bash

cd projects/ckeditor5-ngx

npm --no-git-tag-version version patch

ng build ckeditor5-ngx --prod

cd ../../dist/ckeditor5-ngx

npm publish

cd ../../

git add .

git commit -m "new version published"

git push
