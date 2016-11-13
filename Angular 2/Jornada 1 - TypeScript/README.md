# Typescript ~~orientado a Angular 2~~.

En el directorio de resources he dejado el PDF de especificación del lenguaje. Pero me parece mas sencillo y accesible el "Handbook" de la web. También hay más material de estudio.

Un buen lugar por donde empezar es la web del lenguaje:

https://www.typescriptlang.org/docs/tutorial.html

Un buen lugar donde ver diferentes ejemplos de uso del lenguaje:

https://www.typescriptlang.org/samples/

## Plan para esta sesión

* En primer lugar dejar en cada uno de los equipos de los asistentes el compilador y las herramientas para codificar TypeScript.
* Repasar los elementos mas importantes de TypeScript, partiendo de la base del curso anterior en el que se repasó ES6.
    
    * Tipos
    * Clases: Modificadores de visibilidad, Static y clases abstractas.
    * Interfaces
    * Decoradores
    * Mixins
    * Funciones. Sobrecarga.
    * Generics
    * Modules
    * Namespaces
    * declare: Ambient declarations

* Entender la integración con JavaScript, en especial Typings.

## Instalando el compilador

_Vamos a instalar el compilador y a probar que podemos compilar algo_

> npm install -g typescript

Entramos en la carpeta "primerprograma" y echamos un vistazo al fichero "helloworld.ts" y lo compilamos:

> tsc helloword.ts

Ejecutamos el código generado en node:

> tsc helloword.ts

## Visual Studio code

Lo mejor es usar un entorno integrado que permita manejar el proyecto de una manera sencilla. Lo mejor es crear un fichero de configuración de proyecto.

> tsc --init

Eso generará un fichero de configuración por defecto.

### Vamos a crear una tarea para compliar TypeScript.

Pulsar *Ctrl+Shift+P* y escribir *Configurar ejecutor de tareas*, y pulsar Enter, después seleccionar *Compilar un proyecto de TypeScript*, eso generará un fichero *tasks.json*.

Podemos compilar tecleando: *Ctrl+Shift+B*

Si cometemos algún error de codificación el entorno nos avisará.

_No creo que tener un fichero de tareas sea una buena idea como solución general a la codificación ya que eso obliga a que todas las personas que trabajen en el proyecto usen el mismo editor, por eso creo que debería de automatizarse con otras herramientas_

### Algunos atajos de teclado:

* *Shift+Alt+F* formatea el código.
* *Ctrl+Shift+M* problemas.

### Proyectos hibridos JS / TypeScript

Podemos indicar la presencia de código en JavaScript incluyendo la siguiente entrada en el fichero de configuración *tsconfig.json* _allowJs:true_.

### Algunas extensiones interesantes

* (Angular 2 snippets) https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2
* (TSLint) https://marketplace.visualstudio.com/items?itemName=eg2.tslint
* (Ejecución de código desde el navegador) https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner

En https://code.visualstudio.com/Docs/languages/typescript podemos ver muchos detalles de como dejar VS Code listo para trabajar.

## Repaso a lo más descado de TypeScript

Puesto que TypeScript es un superconjunto de ES6 aka Ecmascript 2015, tengamos en cuenta que nos vamos a encontrar con los siguientes elementos de ES6 en TypeScript.
El elemento diferenciador mas fácilmente identificable son los tipos de datos, que en el caso de TypeScript son necesarios ya que el lenguaje está fuertemente tipado.

### Tipos básicos

#### Boolean
    
```javascript
let isDone: boolean = false;
```

#### Number

```javascript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

#### String

```javascript
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;

// => String templates are wellcome.
let sentence: string = `Hello, my name is ${ fullName }.

I'll be ${ age + 1 } years old next month.`
```

#### Array

```javascript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3]; //Usando genericos
```

#### Tuple

Tuple types allow you to express an array where the type of a fixed number of elements is known, but need not be the same. For example, you may want to represent a value as a pair of a string and a number:

```javascript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
x = [10, "hello"]; // Error
```

When accessing an element with a known index, the correct type is retrieved:

```javascript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

#### Enum

```javascript
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
```

#### Any

El valor desconocido. Cuando no sabemos el tipo de dato. Especialmente interesante cuando tratamos con librerias en JS.

```javascript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

#### Void

Nada.

```javascript
function warnUser(): void {
    alert("This is my warning message");
}
```

#### Null and Undefined

La herencia de JS.

#### Never

Representa un tipo de valor que nunca ocurre. Es el resultado de las funciones o expresión que "siempre" devuelve una excepción. 

```javascript
// Function returning never must have unreachable end point
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
function infiniteLoop(): never {
    while (true) {
    }
}
```

#### Type assertions

La idea es aportar pistas al compilador de TypeScript sobre el tipo de dato que estamos manejando:

"Type assertions are a way to tell the compiler “trust me, I know what I’m doing.” A type assertion is like a type cast in other languages, but performs no special checking or restructuring of data. It has no runtime impact, and is used purely by the compiler. TypeScript assumes that you, the programmer, have performed any special checks that you need."

```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

// O usando "as"

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;


### Recordar un poco el uso de *let* y *const*

Igual que en ES6

### Clases

En realidad es una extensión de ES6:

```javascript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```

pero al que podemos incluir visibilidad a los miembros de la clase:

* private 
* public 
* protected

```javascript
class Animal {
    private name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
    protected moveInternal(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```

ejemplo de *protected*:

```javascript
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```

Recordar que también podemos indicar si es *readonly*.

También podemos utilizar *get/set* para crear Accessors:

```javascript
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

Otro aspecto importante es que podemos hacer uso de *static* para definir elementos estáticos de clase, tanto propiedades como métodos.

Algo muy interesante es que podemos crear clases abstractas, en el sentido clásico. Estas clases están parcialmente implementadas, son por decirlo así, una mezcla entre una clase y una intefaz. No se pueden instanciar directamente. Es necesario extenderlas para poder instanciarlas.

```javascript
abstract class Department {

    constructor(public name: string) {
    }

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // must be implemented in derived classes
}

class AccountingDepartment extends Department {

    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // ok to create a reference to an abstract type
department = new Department(); // error: cannot create an instance of an abstract class
department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReports(); // error: method doesn't exist on declared abstract type
```

#### Advanced Techniques

_Si hay tiempo_

### Funciones

Con nombre y anónimas:

```javascript
// Named function
function add(x, y) {
    return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x+y; };
```

Recordad que ahora tenemos tipos, tanto para los parámetros de entrada como para el parámetro de salida:

```javascript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x+y; }; 
```

Recordar que gracias a ES6, tenemos: 

* Parámetros opcionales.
* Parámetros por defecto.
* Parámetros REST.
* lexical this.

Pero además tenemos:

1. Sobrecargas

Este código es un poco "pincho" ya que *pickCard* no especifica el tipo devuelto:

```javascript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

Podemos usar esta forma de definir la función sobrecargada y la ventaja es que ahora tenemos un tipado completo:

```javascript
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```

2. this como parámetro

Echemos un vistazo a este ejemplo:

```javascript
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

La función anónima *createCardPicker* utiliza internamente una referencia al objeto *Deck* desde la que es invocada, pero podemos especificar el tipo de *this* explicitamente en la llamada. Notar que no es necesario incluir *this* como parámetro a la llamada de la función. 

### Enums

```javascript
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
```

```javascript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
```

### Symbols

Lo mismo que en ES6

### Iteradores y generadores

Lo mismo que en ES6

### Directivas del "transpilador"

Son elementos que no pertenecen al lenguaje. Usan la sintaxis XML dentro de un comentario en línea con 3 barras "///" y permiten dar instrucciones de como se quire que se procese determinado elementos. 
Si están en nuestro código deber ir en la cabecera del fichero.

Ejemplo:

```
/// <reference path="..." />
```

Especifica al compilador donde está un determinado módulo. 

### Interfaces

Las interfaces, al igual que en otros lenguajes, especifican una estructura de clase; propiedades, métodos, sin especificar su implementación.

```javascript
interface LabelledValue {
    label: string;
}

function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

#### Propiedades opcionales

```javascript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

#### Propiedades Readonly

```javascript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

El valor se asigna en el constructor:

```javascript
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

Recordad que *const* lo usaremos para variables y *readonly* para propiedades: 

También tenemos un tipo 'ReadonlyArray':

```javascript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

#### Function Types

No solo podemos crear interfaces de clases también podemos crear interfaces de funciones. (Ver la potencia de )
Primero definimos la interfaz de la función.

```javascript
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

después podemos instanciar esa interfaz creando su implementación.

```javascript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) : boolean {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}
```

como convención se puede nombrar ficheros _*.d.ts_ para indicar que se trata de un fichero de definición. _Ver el apartado de typings_

#### Interfaces de clase

```javascript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

#### Herencia de interfaces

Las interfaces también pueden extender mediante el mecanimos de herencia: 

```
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

### Generics

TODO

### Mixins

TODO

### Módulos

TODO

### Decoradores

TODO

### Namespaces

TODO


## Typings

Podemos utilizar código y librerias escritas en JavaScript desde TypeScript, pero es muy recomendable tener los tipos de acceso para poder hacer una clara integración entre los dos lenguajes. Por eso tenemos typings una iniciativa que permite tener wrappers para muchas de las librerias ya existentes, de esa forma podemos usar lodash, jquery, backbone de cuasinativa en TypeScript.

Desde aquí podemos buscar un paquete en concreto que necesitemos integrar:

http://microsoft.github.io/TypeSearch/

_Vamos a realizar un ejemplo de integración TypeScript-jQuery_

https://github.com/Microsoft/TypeScriptSamples/tree/master/jquery

## Lo más importante:

* Los nuevos tipos de datos
* interfaces
* Modulos y Namespaces
* Decorators
* Mixins
* Ambient declarations. declare => Permiten declarar variables, funciones, o clases que estarán disponibles en el código aunque sin emitir código javascript al respecto. Esto es útil en los archivos de definición especialmente. Y se hace mediante la palabra reservada “declare”