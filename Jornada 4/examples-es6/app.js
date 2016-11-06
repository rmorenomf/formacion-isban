console.log("[*] Application demo.");

let arr = [1, 2, 3, 4];
let doubled = arr.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8]

let product = (a, b) => a * b;
console.log(product(2, 3)); // 6

let average = numbers => {
    let sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
};
console.log(average(arr)); // 2.5