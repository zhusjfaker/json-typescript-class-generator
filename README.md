# Vue-Component-build
Automatically generate classes that inherit JSON serialization classes based on JSON files

## 目的
* 方便TS的小伙伴自动根据请求回来的JSON字符串生成可以"响应"/"订阅"的数据类 配合序列化JSONMODIFY 共同使用.


## 代码环境
* node 8.6 +
* @zhusj/jsonmodify (ps: npm i @zhusj/jsonmodify -D)

## 安装
* sudo npm install @zhusj/vue-component-build -g

## 使用教程
* 以下 "${****}" 为可替换部分
* 在任意console路径下: vue-component --name ${you wanted to define Component Name} --path ${Relative path suffix of current path}
* vue-component --name test --path ./src/component/  
* 本版本提供以下简单创建方式
* vue-component ${you wanted to define Component Name}
* example: vue-component test (ps: path 默认是 ./src/components! 第一个参数为 组件名称 )

