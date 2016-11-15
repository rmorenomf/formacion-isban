class Car {
    
    MyFunction(x: number): void;
    MyFunction(x: number, s: string , b:number): void;
    MyFunction(x, s?, y?): void{
        console.log("Fucionando");
    }
}

let car = new Car();
car.MyFunction(1,"", 1);