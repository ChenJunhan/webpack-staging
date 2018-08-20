# webpack-staging
这是一个基于webpack的多页面脚手架

## 安装前提
- [安装git](https://git-scm.com/downloads)
- [安装nodeJs](https://nodejs.org/en/)

## 下载
```
$ git clone https://github.com/ChenJunhan/webpack-staging.git
$ npm install
```

## 本地开发
输入 `$ npm start` 在浏览器打开 [localhost:7000](http://localhost:7000) 进行预览，如果不想使用7000的端口号可在修改 **webpack/webpack.development.js** 中的 **port** 参数

## 打包
输入 `$ npm run build` 会打包在 **dist** 文件夹中可发布到线上

## 注意
除了主页其他页面都必须写在 **src/pages** 目录下，先创建一个文件夹，文件夹中的 **html**和 **js** 需跟文件夹名字相同，在 **js** 将对应的 **html**和 **less** 文件 **import** 进来，可参考 **about** 页面 或者 **login** 页面