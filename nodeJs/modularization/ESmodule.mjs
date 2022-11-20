export let a = 10;
export let b = 'lhk';
export let c = {
    name: 'lhk',
    sex: 'man',
    age: '22'
};

/*
    默认导出
 */
export default function sum(a, b) {
    return a + b;
}

console.log('ESmodule.js');