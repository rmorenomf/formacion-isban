# Typescript ~~orientado a Angular 2~~.

Un buen lugar por donde empezar es la web del lenguaje:

https://www.typescriptlang.org/docs/tutorial.html

Un buen lugar donde ver diferentes ejemplos de uso del lenguaje:

https://www.typescriptlang.org/samples/

En el apartado de resources he dejado el Pdf de especificación del lenguaje. Pero me parece mas sencillo y accesible el "Handbook" de la web.

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

Usando:

```
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;

// O usando "as"

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

### Recordar un poco el uso de *let* y *const*

-

### Clases

TODO

### Funciones

TODO

### Enums

TODO

### Symbols

TODO

### Iteradores y generadores

TODO

### Módulos

TODO

### Mixins

TODO

### Directivas del "transpilador"

TODO

## Pero además tenemos elementos propios del TypeScript como:

* Tipos
* Decoradores
* Interfaces
* Namespaces
* Generics


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




## Typings

Podemos utilizar código y librerias escritas en JavaScript desde TypeScript, pero es muy recomendable tener los tipos de acceso para poder hacer una clara integración entre los dos lenguajes. Por eso tenemos typings una iniciativa que permite tener wrappers para muchas de las librerias ya existentes, de esa forma podemos usar lodash, jquery, backbone de cuasinativa en TypeScript.

Desde aquí podemos buscar un paquete en concreto que necesitemos integrar:

http://microsoft.github.io/TypeSearch/

_Vamos a realizar un ejemplo de integración TypeScript-jQuery_

https://github.com/Microsoft/TypeScriptSamples/tree/master/jquery