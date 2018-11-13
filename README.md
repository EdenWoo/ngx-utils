check the tutorial for ref:
https://medium.com/@tomsu/how-to-build-a-library-for-angular-apps-4f9b38b0ed11

-------------------------------------------------------
------------------------PUBLISH------------------------ 
根目录  ng build common --prod

/dist/common里面

npm publish



---------------------------------------------------------------------------
------------------------ADD NEW PROJECT TO PUBLISH-------------------------
//添加新的模块

ng generate library iw-core --prefix ntc

add package: add  "@ng-select/ng-select": "^2.12.0" in peerDependencies -> package.json

cd projects/iw-core

npm publish
