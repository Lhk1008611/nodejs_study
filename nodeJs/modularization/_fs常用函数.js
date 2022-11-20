/*
    fs常用函数
        - fs.readFile() 读取文件
        - fs.appendFile()  将数据添加到已有文件中,文件不存在则创建文件并添加数据
        - fs.mkdir()  创建目录
        - fs.rmdir()  删除目录
        - fs.rm()     删除文件、文件夹
        - fs.rename()   重命名
        - fs.copyFile() 复制文件（复制）
 */
const fs = require('node:fs/promises')
const path = require('node:path')
fs.appendFile(
    path.resolve(__dirname, './test.txt'),
    'appendFile添加数据'
).then((result) => {
    console.log('添加成功');
});