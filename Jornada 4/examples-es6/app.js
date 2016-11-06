console.log("[*] Application demo.");

// Proxying a normal object
var target = {};
var handler = {
  get: function (receiver, name) {
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
console.log( p.world );
p.world === 'Hello, world!';

/*
class Point{
    constructor(x=0, y=0){
        this.x = x;    
        this.y = y;
    }

    toString(){
        return `X: ${this.x} Y: ${this.y}`;
    }
}

class Key{
    constructor(key){
        this.key = key;
    }
}

var wm = new WeakMap();

function createData(){
    wm.set(key1, new Point(1,1));
    console.log( wm.has(key1) );
};

function CheckStatus(ev){
    console.log( point1 );    
    key1 = null;
}

createData();
*/