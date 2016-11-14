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
```

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

Mucho de nuestro código no depende realmente del tipo de dato.

```
function reverse<T>(items: T[]): T[] {
    var toreturn = [];
    for (let i = items.length - 1; i >= 0; i--) {
        toreturn.push(items[i]);
    }
    return toreturn;
}

var sample = [1, 2, 3];
var reversed = reverse(sample);
console.log(reversed); // 3,2,1

// Safety!
reversed[0] = '1'; // Error!
reversed = ['1', '2']; // Error!
reversed[0] = 1; // Okay
reversed = [1, 2]; // Okay
```

En este ejemplo estamos diciendo que la función *reverse* mira te voy a pasar un Array de elementos de un tipo que no importa y me vas a devolver un Array de elementos de un tipo que no importa.

Para esto sirven los genéricos, para hacer nuestro código más reutilizable.

Un ejemplo de genérico que no es un Array:

```
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```

También podemos crear clases genéricas:

```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

Podemos hacer algo mas restrictivas nuestras clases. Podemos crear clases genéricas de forma que solo acepten objetos que extiendan de una determinada clase:

```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

### Mixins

Nos permite crear clases combinando clases sencillas sin necesidad de un mecanismo de herencia.

```javascript
// Disposable Mixin
class Disposable {
    isDisposed: boolean;
    dispose() {
        this.isDisposed = true;
    }

}

// Activatable Mixin
class Activatable {
    isActive: boolean;
    activate() {
        this.isActive = true;
    }
    deactivate() {
        this.isActive = false;
    }
}

//Next, we’ll create the class that will handle the combination of the two mixins. Let’s look at this in more detail to see how it does this:
class SmartObject implements Disposable, Activatable {
    constructor() {
        setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
    }

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;
}

//Finally, we mix our mixins into the class, creating the full implementation.
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);

////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
```

### Decoradores

Un decorador es un objeto que añaden funcionalidad a otro objeto de forma dinámica. Se puede utilizar para mejorar el comportamiento de un objeto sin requerir editar la clase. 

Cuando usarlo:

* Cuando se desea añadir capacidades de forma individual a objetos sin necesidad de utilizar los mecanismos de herencia.
* Cuando sea deseable eliminar una funcionalidad en el futuro. Mediante quitar el decorador.
* Cuando extender clases mediante subclases sea inmanejable o sobrecargue el modelo de clases.

Pros and Contras:

* Bueno: Más flexible que los mecanismos de herencia.
* Bueno: No carga en exceso la jerarquía de clases.
* Malo: Creamos muchos pequeños objetos.

> NOTE  Decorators are an experimental feature that may change in future releases.

> tsc --target ES5 --experimentalDecorators

*tsconfig.json:*

```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

Tenemos varios tipos de decoradores:

* Decoradores de funciones
* Decoradores de clases

#### Decoradores de funciones.

Factorias de decoradores:

```javascript
function color(value: string) { // this is the decorator factory
    return function (target) { // this is the decorator
        // do something with 'target' and 'value'...
    }
}
```

Ejemplo de decorador de clase:

```javascript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
```

#### Decoradores de clase

The class decorator is applied to the constructor of the class and can be used to observe, modify, or replace a class definition. A class decorator cannot be used in a declaration file, or in any other ambient context (such as on a declare class).

```javascript

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

### Modules

Los módulos de TypeScript son un equivalente conceptual de los módulos de ES6. Un módulo se ejecuta dentro de su propio contexto. eso significa que las variables, fuciones, clases, etc ... declaradas dentro de un módulo no son visables fuera del módulo salvo que las expongamos explicitamente mediante *export*. 
Un módulo es herramientas de encapsulación de código.  

Ejemplo de *export*:

```javascript
export interface StringValidator {
    isAcceptable(s: string): boolean;
}

export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
```

Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:

```javascript
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

Ejemplo de import:

```javascript
import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();
```

Podemos renombrar elementos:

```javascript
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```

También podemos importar todos los elementos de un módulo:

```javascript
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();
```

*Default exports*

Each module can optionally export a default export. Default exports are marked with the keyword default; and there can only be one default export per module. default exports are imported using a different import form.

default exports are really handy. For instance, a library like JQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.

* JQuery.d.ts

```javascript
declare let $: JQuery;
export default $;
```

* App.ts

```javascript
import $ from "JQuery";

//Otra forma de verlo sería:
import jq from "JQuery";

$("button.continue").html( "Next Step..." );
```

Esto nos permite ser más flexibles a la hora de referenciar a los elementos importados:

```javascript
export default "123";

import num from "./OneTwoThree";

console.log(num); // "123"
```

_Echar un vistato a la el typings de jQuery_

*Do not use namespaces in modules*

When first moving to a module-based organization, a common tendency is to wrap exports in an additional layer of namespaces. Modules have their own scope, and only exported declarations are visible from outside the module. With this in mind, namespace provide very little, if any, value when working with modules.

On the organization front, namespaces are handy for grouping together logically-related objects and types in the global scope. For example, in C#, you’re going to find all the collection types in System.Collections. By organizing our types into hierarchical namespaces, we provide a good “discovery” experience for users of those types. Modules, on the other hand, are already present in a file system, necessarily. We have to resolve them by path and filename, so there’s a logical organization scheme for us to use. We can have a /collections/generic/ folder with a list module in it.

### Namespaces

Los Namespaces nos permiten agrupar de una forma lógica un grupo de elementos. Permitiendo evitar la colisión de nombres con otros elementos.
Es importante notar que es necesario indicar los elementos que vamos a exponer usando *export*.

```javascript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }

    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (var name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
}
```

Podemos tener elmentos pertenecientes a un mismo *Namespace* usando directivas ///:

* Validation.ts

```javascript
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
}
```

* LettersOnlyValidator.ts

```javascript
/// <reference path="Validation.ts" />
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}
```

* Test.ts

```javascript
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
    for (let name in validators) {
        console.log(""" + s + "" " + (validators[name].isAcceptable(s) ? " matches " : " does not match ") + name);
    }
}
```

Es importante notar que para poder usar un namespace tenemos que tenerlo cargado y para eso usamos los elementos declarativos de HTML:

```html
<script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" /> 
```

## Modules vs Namespaces

* Using Namespaces

Namespaces are simply named JavaScript objects in the global namespace. This makes namespaces a very simple construct to use. They can span multiple files, and can be concatenated using --outFile. Namespaces can be a good way to structure your code in a Web Application, with all dependencies included as *script* tags in your HTML page.

Just like all global namespace pollution, it can be hard to identify component dependencies, especially in a large application.

* Using Modules

Just like namespaces, modules can contain both code and declarations. The main difference is that modules declare their dependencies.

Modules also have a dependency on a module loader (such as CommonJs/Require.js). For a small JS application this might not be optimal, but for larger applications, the cost comes with long term modularity and maintainability benefits. Modules provide for better code reuse, stronger isolation and better tooling support for bundling.

It is also worth noting that, for Node.js applications, modules are the default and the recommended approach to structure your code.

Starting with ECMAScript 2015, modules are native part of the language, and should be supported by all compliant engine implementations. Thus, for new projects modules would be the recommended code organization mechanism.

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