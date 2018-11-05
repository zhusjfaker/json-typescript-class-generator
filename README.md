# json-typescript-class-generator
Automatically generate classes that inherit JSON serialization classes based on JSON files

## 目的
* 方便TS的小伙伴自动根据请求回来的JSON字符串生成可以"响应"/"订阅"的数据类 配合序列化JSONMODIFY 共同使用.


## 代码环境
* node 8.6 +
* @zhusj/jsonmodify (ps: npm i @zhusj/jsonmodify -D)

## 安装
* sudo npm install @zhusj/json-typescript-class-generator -g

## GIT地址
* https://github.com/zhusjfaker/json-typescript-class-generator

## 使用教程
* "json-convert" 为调用命令行工具 (具体操作见下图!)
![跨域访问失败](https://github.com/zhusjfaker/json-typescript-class-generator/blob/master/img/index.png)
<pre>
<code>
zhushijie$ json-convert
当前进程号:15049
当前默认创建路径: /Users/zhushijie/Desktop/github/json-typescript-class-generator/src/classes/
确认当前默认路径(/Users/zhushijie/Desktop/github/json-typescript-class-generator/src/classes/):
test
当前创建类名:
class-test
您的转化对象JSON字符串位置(./covert.json):

{
    "countChannelDelayTask": 0,
    "countChannelNoAcceptTask": 0,
    "countChannelAcceptTask": 0,
    "name": "新疑似刷量用户视频1",
    "id": 377,
    "countChannelTask": 0
}
当前键值数组:
[ 'countChannelDelayTask',
  'countChannelNoAcceptTask',
  'countChannelAcceptTask',
  'name',
  'id',
  'countChannelTask' ]
当前countChannelDelayTask的类型:number
当前countChannelNoAcceptTask的类型:number
当前countChannelAcceptTask的类型:number
当前name的类型:string
当前id的类型:number
当前countChannelTask的类型:number
</code>
</pre>

