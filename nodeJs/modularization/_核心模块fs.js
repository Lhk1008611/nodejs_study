/*
    fs（File System）
        - 通过fs可以操作磁盘中的文件（即IO操作）
        - 引入fs:   require('node:fs')
        - 通过fs模块读取磁盘中的数据时，读取到的数据总会以Buffer对象的形式返回
            - buffer是一个临时用来存储数据的缓冲区
 */

const { readFile } = require('node:fs');
const fs = require('node:fs');
const path = require('node:path');

//同步方式读取文件（会出现阻塞，不推荐使用）
const buffer = fs.readFileSync(path.resolve(__dirname, './test.txt'));
console.log(buffer.toString());

//异步方式读取文件，不会影响后续代码的执行
fs.readFile(path.resolve(__dirname, './test.txt'),
    (error, buffer) => {
        if (error) {
            console.log(error);
        } else {
            console.log(buffer.toString());
        }
    }
)
console.log('后续代码');

/*
    Promise版的fs方法
 */
const fsp = require('node:fs/promises');

fsp.readFile(path.resolve(__dirname, './test.txt'))
    .then((buffer) => {
        console.log(buffer.toString());
    })
    .catch((error) => {
        console.log(error);
    });

/*
    async版的操作磁盘数据方式
 */
(async () => {
    try {
        const buffer = await fsp.readFile(path.resolve(__dirname, './test.txt'));
        console.log(buffer.toString());
    } catch (error) {
        console.log(error);
    }
})();