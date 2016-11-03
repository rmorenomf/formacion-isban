console.log("[*] Application Loaded.");

//Creamos un vehículo genérico
function Vehicle(params){
    this.color = params.color || "Blue";
    this.tradeMark = params.tradeMark || "Ford";
}

// Creamos el Factory
function VehicleFactory(){}

// y lo extendemos con prototype para vehículos genéricos
VehicleFactory.prototype.vehicleClass = Vehicle;
VehicleFactory.prototype.createVehicle = function(params) {
  return new this.vehicleClass(params);
};

// creamos una subclase
function CarFactory(params) {
  
  VehicleFactory.prototype.vehicleClass = CarFactory; 
  Vehicle.call(this, params);

  this.wheels = 4;
  this.doors = 5;
}

console.log("[*] Car.");

CarFactory.prototype = Object.create(Vehicle.prototype);
//CarFactory.prototype.constructor = CarFactory;

//var iCarFactory = new CarFactory({color:"Yellow", tradeMark:"Seat"}); 
//console.log( iCarFactory.color );
//console.log( iCarFactory.wheels );

var car = CarFactory(); 
var seat = car.createVehicle({color:"Yellow", tradeMark:"Seat"});
console.log(seat.color);
console.log(seat.wheels);

/*console.log(miFactory.doors);
var seat = miFactory.createVehicle({color:"Yellow", tradeMark:"Seat"});
console.log(seat.color);
console.log(seat.wheels);
*/