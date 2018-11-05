#!/usr/bin/env node
"use strict";
const fs = require('fs');
const readline = require('readline');
const path = require("path");
const generator = (argv) => {
    const fileSession = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("当前进程号:" + process.pid);
    let classespath = path.resolve(__dirname) + "/src/classes";
    var filename = null;
    var filepath = null;
    console.log("当前默认创建路径: " + classespath);
    // close事件监听
    fileSession.on("close", function () {
        // 结束程序
        process.exit(0);
    });
    const session = async () => {
        // await comfirmClassPath();
        // await createFileSeesion();
        // await createContentClass();
        fileSession.close();
    };
    session();
};
generator(process.argv.slice(2));
//# sourceMappingURL=index.js.map