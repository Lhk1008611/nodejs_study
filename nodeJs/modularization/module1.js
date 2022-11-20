console.log("这是module1模块")

exports.a = 'lhk';
exports.b = 'man';

module.exports = {
    aa: 'lhk',
    bb: [1, 2, 3, 4],
    cc: ()=>{
        console.log(1111);
    },
}