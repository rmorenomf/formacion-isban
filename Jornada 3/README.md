# Jornada 3: 

# Patrones de diseño: Singleton, Factory, MVC, Decorator.

## Singleton

El patrón de diseño singleton (instancia única) está diseñado para restringir la creación de objetos pertenecientes a una clase o el valor de un tipo a un único objeto. Su intención consiste en garantizar que una clase sólo tenga una instancia y proporcionar un punto de acceso global a ella.

Este tipo de patrón se implementa creando en nuestra clase un método que crea a su vez una instancia del objeto sólo si aún no existe alguna. Para asegurar que la clase no puede ser instanciada nuevamente se regula el alcance del constructor (con atributos como protegido o privado).

Javascript permite la creación directa de objetos. De hecho, es de los pocos lenguajes de programación que poseen esta característica, por lo que un esquema de este tipo no es estrictamente necesario. Obsérvese el siguiente ejemplo:

```javascript
var namespace = {
  singleton: {
    amethod: function() {
      console.log("amethod");
    }
  }
};
```
// Invoke: namespace.singleton.amethod

Si necesitamos crear el singleton bajo demanda (lo que conocemos generalmente con el término lazily), el código se complica un poco:

```javascript
var namespace = {
  _singleton: null,
  getSingleton: function() {
    if (!this._singleton) {
      this._singleton = {
        amethod: function() {
          console.log("amethod");
        }
      }
    }
    return this._singleton;
  }
};
// Invoke: namespace.getSingleton().amethod()
```

Usando ES6:

```javascript
var namespace = {
  _singleton: null,
  get singleton() {
    if (!this._singleton) {
      this._singleton = {
        amethod: function() {
          console.log("amethod");
        }
      }
    }
    return this._singleton;
  }
};
// Invoke: namespace.singleton.amethod()
```

Otra forma de expresarlo sería:

```javascript
var namespace = {
  let _singleton: null,
   constructor() {
        if(!this._singleton){
              _singleton = this;
        }
        return _singleton;
      }


  get singleton() {
    if (!this._singleton) {
      this._singleton = {
        amethod: function() {
          console.log("amethod");
        }
      }
    }
    return this._singleton;
  }
};
// Invoke: namespace.singleton.amethod()
```

```javascript
let instance = null;

class Cache{  
    constructor() {
        if(!instance){
              instance = this;
        }

        // to test whether we have singleton or not
        this.time = new Date()

        return instance;
      }
}
```

Aunque debido a las características de Javascript un patrón singleton no es estrictamente necesario, ni especialmente útil, los desarrolladores que provienen de otros lenguajes como Java se encontrarán mucho más cómodos con una estructura que les resulta muy familiar.


## Factory


El patrón Factory se encarga de la creación de objetos (Fabrica de objetos) sin la necesidad de definir la clase exacta del objeto a ser creado. 

El patrón Factory encapsula y separa la creación de objetos del resto del código. En situaciones donde la creación de un objeto pueda ser compleja o sujeta a cambios una Factory puede actuar a mantener la codificación clara.

Este patrón se puede separar en 3 tipos de comportamiento según las necesidades:


1. Simple Factory
2. SubClases del Factory
3. AbstractFactory
4. Simple Factory

Es un objeto que encapsula la creación de otros objetos. A medida que tu Factory gana en complejidad ( esto es la posibilidad de crear más objetos de diferentes tipos) será necesario que parametrices el objeto para simplificar el mantenimiento. 

```javascript
// Creamos nuestras clases que crearemos con el Factory
function Car ( params ) {
this.wheels = params.wheels || "4";
this.color = params.color || "Black";
}


function Bike ( params ) {
this.wheels = params.wheels || "2";
this.color = params.color || "White";
}

// Creamos el Factory
function VehicleFactory(){}

// y lo extendemos con prototype
VehicleFactory.prototype.createVehicle = function(params) {
if (params.tipo== 'car') {
return new Car(params);
} else if (params.tipo== 'bike') {
return new Bike(params);
}
};
```

### Uso de la clase Factory:

```javascript
// creamos la instancia del Factory
var miFactory = new VehicleFactory();

// Si queremos un coche Rojo
var ford = miFactory.createVehicle({tipo:"car", color:"Red"});

//si queremos una bicicleta Azul
var orbea = miFactory.createVehicle({tipo:"bike", color:"Blue"});
```

### SubClases del Factory

Definimos una interfaz para la creación de objetos donde permitimos a las subclases decidir qué clase se desea instanciar. 
Este patrón resuelve el problema  creando un método  aparte para crear los objetos y para decidir qué subclases son capaces de sobrescribir dicho método para que ellos sean los que especifiquen el tipo de objeto que se creará.

```javascript
//Creamos un vehículo genérico
function Vehicle (params){
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
```

Cuando trabajamos con subclases podemos sobrescribir el Factory padre para adecuarlo al objeto que queremos retornar:

```javascript
// creamos una subclase
function CarFactory () {}

// del factory padre
CarFactory.prototype = new VehicleFactory();

// y modificamos el objeto a crear
CarFactory.prototype.vehicleClass = Car;
```

Ahora ya tenemos un factory para la clase Perro, si deseas construye tu la necesaria para crear el gato. Ahora para llamarlo:

```javascript
var miFactory = new CarFactory();
var seat = miFactory.createVehicle({color:"Yellow", tradeMark:"Seat"});
console.log(seat.color);
```

### AbstractFactory

Con este patrón podemos crear los tipos de objetos que deseemos sin la necesidad de que el factory conozca qué son. Deberíamos utilizar esta variante del patrón cuando un sistema debe crear objetos independientemente de lo que hagan.

```javascript
var AbstractAnimalFactory = (function () {

// almacen de clases registradas
var clasesRegistradas = {};

return {
    createAnimal: function ( tipo, params ) {
        var clase = clasesRegistradas[tipo];
        if(clase) {
            return new clase(params);
        } else {
            return null;
        }
    },

    registerClass: function ( tipo, clase ) {
        clasesRegistradas[tipo] = clase;
        return AbstractAnimalFactory;
        }
    };

})();
```

Aquí el factory abstracto no tiene porque conocer lo que está instanciando, solo necesita mantener un registro de los objetos a crear:

```javascript
// Registramos la clase Gato
AbstractAnimalFactory.registerClass("gato", Gato );


// instanciamos un gatito
var minino = AbstractAnimalFactory.createAnimal( "gato" , {nombre:"Chelsea"} );
console.log(minino.nombre);
```

La ventaja es que podemos ya mismo crear nuevas clases y registrarlas en el factory abstracto y él ya podrá devolvernos instancias del mismo sin necesidad de modificar nada más:

```javascript
//Nueva Clase
function Oso (params){
    this.color = params.color || "Blanco";
    this.carnivoro= params.carnivoro|| true;
    this.nombre = params.nombre || "Yogui";
    this.actitud = params.actitud || "Peligroso";
}

//La registramos y fabricamos
AbstractAnimalFactory.registerClass("oso", Oso );
var yogui= AbstractAnimalFactory.createAnimal("oso",{});
console.log(yogui.nombre);
```

Cuando utilizarlo:

* Cuando la configuración de nuestros objetos necesita un alto nivel de complejidad.
* Cuando necesitamos generar diferentes instancias dependiendo del entorno.
* Cuando trabajamos con muchos objetos que comparten las mismas propiedades.
 
Cuando No utilizarlo:

* En general se considera una buena práctica implementarlo, pero sólo si el desarrollo vale la pena, es decir si es desarrollo o la lógica es sencilla, simplemente no vale la pena añadir complejidad a nuestro código.

## MVC

Este patrón pretende separar los datos y la lógica de negocio de una aplicación de la interfaz de usuario y el módulo encargado de gestionar los eventos y las comunicaciones. Para ello MVC propone la construcción de tres componentes distintos que son el modelo, la vista y el controlador, es decir, por un lado define componentes para la representación de la información, y por otro lado para la interacción del usuario. 
Este patrón de arquitectura de software se basa en las ideas de reutilización de código y la separación de conceptos, características que buscan facilitar la tarea de desarrollo de aplicaciones y su posterior mantenimiento.

### Actores de este patrón:

#### Modelo
Representa al estado de la aplicación. Puede haber dos opciones esencialmente:
Struts proporciona una clase base org.apache.struts.action.ActionForm que se debe extender cuando se desea obtener la entrada de datos proporcionada por el usuario en la petición HTTP.
El modelo puede ser un Bean o clase ordinaria sin necesidad extender ActionForm.

#### Vista
La vista es una página JSP que no debe contener lógica de negocio, ni flujo de la aplicación e información del modelo, sólo tags. Utiliza el modelo generado para obtener la información y presentarla

#### Controlador
El Servlet ActionServlet actúa de controlador, recibe la petición del navegador y decide qué subclase de Action va tratar la petición en función de lo que se ha declarado en el fichero de configuración struts-config.xml.
Subclase de Action. Actualiza el estado del modelo, y, controla el flujo de la aplicación y tratamiento de errores. Una instancia de una subclase de Action puede tratar la petición y responder al cliente o indicar al Servlet controlador a qué componente del sistema debe delegar el control (esta es la opción la que se lleve a cabo). Las instancias de las subclases de Action tienen acceso al contexto del Servlet controlador y demás objetos que actúan con el contenedor Web.

Ver ejemplo proyecto: design-patterns/mvc-example

Esquema sencillo:

Una típica colaboración entre los componentes de un MVC


## Decorator

Un decorador es un objeto que añaden funcionalidad a otro objeto de forma dinámica. Se puede utilizar para mejorar el comportamiento de un objeto sin requerir editar la clase. 

<Ver un ejemplo en Python>

Cuando usarlo:

* Cuando se desea añadir capacidades de forma individual a objetos sin necesidad de utilizar los mecanismos de herencia.
* Cuando sea deseable eliminar una funcionalidad en el futuro. Mediante quitar el decorador.
* Cuando extender clases mediante subclases sea inmanejable o sobrecargue el modelo de clases.

Pros and Contras:

* Bueno: Más flexible que los mecanismos de herencia.
* Bueno: No carga en exceso la jerarquía de clases.
* Malo: Creamos muchos pequeños objetos.

### Ejemplo en JavaScript “clásico”.

```javascript
var User = function(name) {
   this.name = name;
 
   this.say = function() {
       log.add("User: " + this.name);
   };
}
 
var DecoratedUser = function(user, street, city) {
   this.user = user;
   this.name = user.name;  // ensures interface stays the same
   this.street = street;
   this.city = city;
 
   this.say = function() {
       log.add("Decorated User: " + this.name + ", " +
                  this.street + ", " + this.city);
   };
}
 
// logging helper
 
var log = (function() {
   var log = "";
 
   return {
       add: function(msg) { log += msg + "\n"; },
       show: function() { alert(log); log = ""; }
   }
})();
 
function run() {
 
   var user = new User("Kelly");
   user.say();
 
   var decorated = new DecoratedUser(user, "Broadway", "New York");
   decorated.say();
 
   log.show();
}
```