/*
    npm的相关命令
        - npm init 初始化项目，自动创建package.json文件（需要输入引导）
        - npm init -y 初始化项目，按照默认值创建package.json文件
        - npm install 包名  下载指定的包
            - 下载的包会放入当前项目下的node_modules目录下
            - 且会自动在package.json文件中添加下载的包的"dependencies"属性
            - 会自动添加package-lock.json文件
                - package-lock.json文件 帮助加速npm下载
        - npm install   自动安装package.json文件中"dependencies"属性中的所有包
        - nom install 包名 -g   全局安装
            - 全局安装是将包安装到计算机中，不会被放入node_modules目录下
            - 全局安装的通常都是一些工具（命令行工具之类的）
        - npm uninstall 包名    卸载指定包，卸载后会自动清除该包的依赖属性

    npm镜像
        - npm仓库服务器位于国外，国内用户下载包时会很慢
        - 通过配置npm镜像服务器可以解决该问题
        - 镜像的配置：（镜像网站：https://npmmirror.com/）
            - 1. 通过安装cnpm替代npm使用国内的npm镜像（使用方式与npm一样）
                - npm install -g cnpm --registry=https://registry.npmmirror.com
            - 2.修改npm的仓库地址为国内镜像仓库
                - npm set registry https://registry.npmmirror.com
            - 还原至原版npm仓库
                - npm config delete registry
            - 查看npm仓库地址
                - npm config get registry
 */

//下载好的包直接引入即可使用
const _ = require("lodash");
console.log(_);