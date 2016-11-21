function sealed(constructor: Function) {
    consoled.log("Overrider constructor");
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string, sealed: boolean) {
        console.log("Initial constructor");
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let a = new Greeter('Moring');