var Car = (function () {
    function Car() {
    }
    Car.prototype.MyFunction = function (x, s, y) {
        console.log("Fucionado");
    };
    return Car;
}());
var car = new Car();
car.MyFunction(1, "", 1);
