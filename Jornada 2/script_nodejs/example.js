const v8 = require('v8');

for(let i = 0; i < 10; i++){
    console.log(i + '. Hola mundo!');
}

console.log( v8.getHeapStatistics() );

//http://node.green/
/*
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}

let aPoint = new Point(1,1);
console.log( aPoint.toString() );
*/