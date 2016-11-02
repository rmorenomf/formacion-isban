console.log("[*] Application Loaded.");

function HabitacionHotel() {
  this.precio = function () { return 1999; };
}

function VistasAlMar(room) {
  var price = room.precio();
    room.precio = function() {
    return price + 500;
  }
}

/*Decorador 2*/
function CamaDoble( room ){
  var price = room.precio();
    room.precio = function(){
    return price + 1000;
  };
}

/*Decorador 3*/
function SuitePresidencial( room ){
  var price = room.precio();
  room.precio = function(){
    return price + 12500;
  };
}

var burjAlArab = new HabitacionHotel();
VistasAlMar(burjAlArab);
CamaDoble(burjAlArab);
SuitePresidencial(burjAlArab);
console.log(burjAlArab.precio() ); //15999