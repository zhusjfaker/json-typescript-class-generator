#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require("path");

const covert = (str: string): string => {
    return str.replace(/-([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
    });
}

const mkdirSyncRecursion = (dirname: string) => {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirSyncRecursion(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

const generator = (argv: any[]): void => {

    const fileSession = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("当前进程号:" + process.pid);

    let classespath = process.cwd() + "/src/classes/";
    var filename: string | null = null;
    var filepath: string | null = null;

    console.log("当前默认创建路径: " + classespath);

    // close事件监听
    fileSession.on("close", function () {
        // 结束程序
        process.exit(0);
    });

    const comfirmClassPath = async () => {
        return new Promise((resolve, reject) => {
            fileSession.question(`确认当前默认路径(${classespath}): \n`, (answer: string) => {
                if (answer && answer != "") {
                    classespath = process.cwd() + "/" + answer;
                    if (classespath[classespath.length - 1] != "/") {
                        classespath = classespath + "/";
                    }
                }
                if (!fs.existsSync(classespath)) {
                    mkdirSyncRecursion(classespath);
                }
                resolve();
            });
        });
    }

    const createFileSeesion = async () => {
        return new Promise((resolve, reject) => {
            fileSession.question("当前创建类名: \n", (answer: string) => {
                filename = answer;
                filepath = classespath + "/" + covert(answer) + ".ts";
                resolve();
            });
        })
    }

    const createContentClass = () => {
        return new Promise((resolve, reject) => {
            fileSession.question("您的转化对象JSON字符串位置(./covert.json): \n", (answer: string) => {

                var jsonpath = process.cwd() + "/covert.json";
                if (answer && answer != "") {
                    jsonpath = process.cwd() + answer;
                }

                if (!fs.existsSync(jsonpath)) {
                    console.log(`需要转化的json文件${jsonpath}不存在!程序异常暂停!`);
                    resolve();
                }

                var data = fs.readFileSync(jsonpath, 'utf8');
                console.log(data);
                var originModel = JSON.parse(data);


                var keylist = Object.getOwnPropertyNames(originModel);
                console.log("当前键值数组:");
                console.log(keylist);

                let keycontent = "";
                keylist.every((p) => {
                    console.log("当前" + p + "的类型:" + typeof originModel[p]);
                    if (typeof originModel[p] == "string") {
                        keycontent += `

    private _${p}!: string;

    /**
     * Getter ${p}
     * @return {string}
     */
    @JsonProp()
    public get ${p}(): string {
        return this._${p};
    }

    /**
     * Setter ${p}
     * @param {string} value
     */
    public set ${p}(value: string) {
        this._${p} = value;
    }
                        `;
                    } else if (typeof originModel[p] == "number") {
                        keycontent += `

    private _${p}!: number;

    /**
     * Getter ${p}
     * @return {number}
     */
    @JsonProp()
    public get ${p}(): number {
        return this._${p};
    }

    /**
     * Setter ${p}
     * @param {number} value
     */
    public set ${p}(value: number) {
        this._${p} = value;
    }
                        `;

                    } else if (typeof originModel[p] == "boolean") {
                        keycontent += `

    private _${p}!: boolean;

    /**
     * Getter ${p}
     * @return {boolean}
     */
    @JsonProp()
    public get ${p}(): boolean {
        return this._${p};
    }

    /**
     * Setter ${p}
     * @param {boolean} value
     */
    public set ${p}(value: boolean) {
        this._${p} = value;
    }
                        `;

                    } else if (typeof originModel[p] == "object") {
                        if (originModel[p] === null) {
                            keycontent += `

    private _${p}?: any;

    /**
     * Getter ${p}
     * @return {any}
     */
    @JsonProp()
    public get ${p}(): any {
        return this._${p}!;
    }

    /**
     * Setter ${p}
     * @param {any} value
     */
    public set ${p}(value: any) {
        this._${p} = value;
    }
                                                `;
                        } else if (Array.isArray(originModel[p])) {
                            keycontent += `

    private _${p}?: any[];

    /**
     * Getter ${p}
     * @return {any[]}
     */
    @JsonModelArray({})
    public get ${p}(): any[] {
        return this._${p}!;
    }

    /**
     * Setter ${p}
     * @param {any[]} value
     */
    public set ${p}(value: any[]) {
        this._${p} = value;
    }
    `;

                        } else {
                            keycontent += `

    private _${p}?: any;

    /**
     * Getter ${p}
     * @return {any}
     */
    @JsonProp()
    public get ${p}(): any {
        return this._${p}!;
    }

    /**
     * Setter ${p}
     * @param {any} value
     */
    public set ${p}(value: any) {
        this._${p} = value;
    }
                                                `;
                        }
                    } else if (typeof originModel[p] == "undefined") {
                        keycontent += `

    private _${p}?: any;

    /**
     * Getter ${p}
     * @return {any}
     */
    @JsonProp()
    public get ${p}(): any {
        return this._${p}!;
    }

    /**
     * Setter ${p}
     * @param {any} value
     */
    public set ${p}(value: any) {
        this._${p} = value;
    }
                        `;
                    }
                    return true;
                });

                /** 开始写文件 */
                let content = `
import { JsonSerializable, JsonProp } from '@zhusj/jsonmodify';
                
export class ${filename} extends JsonSerializable{
    
    constructor() {
        super();
    }
    ${keycontent}
}
`;
                fs.writeFileSync(filepath, content, "utf8");
                resolve();
            });
        })
    }


    const session = async () => {
        await comfirmClassPath();
        await createFileSeesion();
        await createContentClass();
        fileSession.close();
    }

    session();


}

generator(process.argv.slice(2));