# Jornada 4: 

Empezando con Ecmascript 2015 (ES6).

## Especificación actual

http://www.ecma-international.org/ecma-262/6.0/

## Tabla de compatibilidad

http://kangax.github.io/compat-table/es6/

Un poco de historia de la evolución de JavaScript

En 1995 (hace 20 años!) Brendan Eich crea un lengujea llamado Mocha cuando trabajaba en Netscape. En Septiembre de ese año lo renombra a LiveScript hasta que le cambiaron el nombre a JavaScript debido a una estrategia de marketing, ya que Netscape fue adquirida por Sun Microsystems, propietaria del lenguaje Java, muy popular por aquel entonces.

En 1997 se crea un comité (TC39) para estadarizar JavaScript por la European Computer Manufacturers' Association, ECMA. Se diseña el estándar del DOM (Document Object Model) para evitar incompatibilidades entre navegadores. A partir de entonces los estándares de JavaScript se rigen por ECMAScript.

![alt text](./resources/cronologia-javascript-1.png "Historia de JavaScript 1")

En 1999 aparece la 3a versión del estándar ECMAScript, que se mantendría vigente hasta hace pocos años. Hubo pequeños intentos de escribir la versión 4, pero hasta 2011 no se aprobó y se estandarizó la versíon 5 (ES5) que es la que usamos hoy en día.

![alt text](./resources/cronologia-javascript-1.png "Historia de JavaScript 2")

En junio de 2013 quedó parado el borrador de la versión 6, pero en Diciembre de 2014 se aprobó al fin y ya es estándar.

Como ya sabemos ES6 "puede" dar algunos problemas de compatibilidad según la plataforma por eso vamos a probar un transpilador. 
Un transpilador convierte código fuente en un lenguaje y lo convierte a su equivalente en otro lenguaje. En nuestro caso partimos de ES6 y lo vamos a convertir en ES5.

https://babeljs.io/

1. Instalamos bebeljs con npm en local. Y aquí tenemos que hacer un apunte sobre donde instalarlo:

> npm install --save-dev babel-cli

```While you can install Babel CLI globally on your machine, it’s much better to install it locally project by project.

There are two primary reasons for this.

Different projects on the same machine can depend on different versions of Babel allowing you to update one at a time.
It means you do not have an implicit dependency on the environment you are working in. Making your project far more portable and easier to setup.
```

Según el tutorial de instalación vamos asignar al script build de NPM la compilación.

```json
{
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
    "devDependencies": {
      "babel-cli": "^6.0.0"
    }
  }
```

> npm run build 

Si queremos usar babel por línea de comandos tenemos que instalarlo global.

#### Podemos configurar el fichero configuración *.babelrc*

Use via package.json

You can alternatively choose to specify your .babelrc config from within package.json like so:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "babel": {
    // my babel config here
  }
}
```

Pero para que funcnione tendremos que instalar el preset correspondiente:

> npm install babel-preset-es2015 --save --no-bin-links

## Un apunte sobre 'strict mode'

'strict mode' obliga al navegador a realizar validaciones estáticas del código restringiendo algunos aspectos del lenguaje que si bien son válidos, son un poco cuestionables.

Por ejemplo:

```javascript
variable1 = 12;
```

es válido en JavaScript y significa que estamos creando una variable global. Pero al activa el modo 'strict' obligamos a que eso no se pueda hacer y el interprete de JavaScript nos devolverá un error. Obligando a definir todas las variables de esta forma:

```javascript
var variable1 = 12;
```

> "Strict mode was added so that there would be an easily statically-analyzable subset of EcmaScript which would be a good target for future versions of the language. Strict mode was also designed in the hope that developers who limit themselves to strict mode would make fewer mistakes and that the bugs they do make would manifest in more obvious ways."

En el Apendice C del documento de definición del lenguaje de ECMA-262 podemos ver mas detalles sobre el modo Strict.

_Echar un vistazo al documento_

## Principales novedades de ES6

## Collections: Map + Set + WeakMap + WeakSet

### Set

Pág. 55 (resources/ES6.pdf)

```javascript
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;
```

### WeakSet

Pág. 63 (resources/ES6.pdf)

El término Weak hace referencia a que esta estructura tiene un enlace débil con el objeto.

Para entender esto tenemos que entender la forma como el recolector de basura de JavaScript funciona. Un objeto está listo para ser eliminado de la memoria solo cuando no queda ninguna referencia de ese objeto, es decir, cuando hacemos un =null.
Si tenemos un objeto muy pesado y lo metemos en un objeto Set, este no será eliminado de la memoria, hasta que todas las referencias al objeto, incluida la del set sean eliminadas.

Los objetos Weak son "weakly held" eso significa que la referencia a los objetos que contiene no cuenta como referencia para el colector de basura y significa que pueden ser eliminados en cualquier momento.

La utilidad de esto es que podemos utilizar algoritmos que solo validen la presencia o el calculo según la existencia del objeto, sin el objeto mismo, ya que puede ser eliminado por el colector de basura incluso mientras se ejecuta el algoritmo. ("Taguear" objetos ).

En el caso de WeakMap. Al dejar de estar referenciada la key el recolector de basura puede eliminar el objeto.

Ejemplo: Queremos procesar una lista de objetos, vamos recorriendo y eliminando los objetos, en ese mismo momento, el recolector los eliminaría pese a que aún los tenemos en nuestro listado.

```javascript
// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
// Because the added object has no other references, it will not be held in the set
```

### Map

Pág. 59 (resources/ES6.pdf)

```javascript
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;
```

### WeakMap

Pág. 64 (resources/ES6.pdf)

```javascript
// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined
```

## Arrows

Pág. 27 (resources/ES6.pdf)

```javascript
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
}
```

## Classes

Pág. 35 (resources/ES6.pdf)

```javascript
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }
  update(camera) {
    //...
    super.update();
  }
  get boneCount() {
    return this.bones.length;
  }
  set matrixType(matrixType) {
    this.idMatrix = SkinnedMesh[matrixType]();
  }
  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

## Parámetros por defecto

Pág. 35 (resources/ES6.pdf)

```javascript
function f(x, y=12, z=y*10 ) {
  // y is 12 if not passed (or passed as undefined)
  return x + y + z;
}
console.log( f(3) );
```

## Rest

Pág. 21 (resources/ES6.pdf)

```javascript
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
```

## Spread

Pág. 22 (resources/ES6.pdf)

```javascript
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

## Destructuring

Pág. 23 (resources/ES6.pdf)

```javascript
// list matching
var [a, , b] = [1,2,3];

// object matching
var { op: a, lhs: { op: b }, rhs: c }
       = getASTNode()

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}
g({name: 5})

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;
```

### Enhanced Object Literals

Object literals are extended to support setting the prototype at construction, shorthand for foo: foo assignments, defining methods, making super calls, and computing property names with expressions. Together, these also bring object literals and class declarations closer together, and let object-based design benefit from some of the same conveniences.

```javascript
var obj = {
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for ‘handler: handler’
    handler,
    // Methods
    toString() {
     // Super calls
     return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ 'prop_' + (() => 42)() ]: 42
};
```

### Template Strings

Pág. 44, 45 (resources/ES6.pdf)

Las plantillas de cadena de texto se delimitan con el caracter de comillas o tildes invertidas (` `) (grave accent) , en lugar de las comillas simples o dobles. Las plantillas de cadena de texto pueden contener marcadores, indentificados por el signo de pesos, y envueltos en llaves (${expresión}). Las expresiones contenidas en los marcadores, junto con el texto entre ellas, son enviados como argumentos a una función. La función por defecto simplemente concatena las partes para formar una única cadena de texto. Si hay una expresión antes de la plantilla de cadena de texto (i.e. tag),  llamamos a esta plantilla de cadena de texto "plantilla de cadena de texto con etiqueta". En este caso, la expresión de etiqueta  (típicamente una función) es llamada a partir de la cadena resultante de procesar la plantilla de cadena de texto, que luego puede ser manipulada antes de ser devuelta.

// Basic literal string creation
`In JavaScript '\n' is a line-feed.`

// Multiline strings
`In JavaScript this is
 not legal.`

// String interpolation
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`

// Construct an HTTP request prefix is used to interpret the replacements and construction
POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler);

##### Plantillas de cadena de texto con postprocesador

Una forma más avanzada de plantillas de cadenas de texto son aquellas que contienen una función de postprocesado . Con ellas es posible modificar la salida de las plantillas, usando una función. El primer argumento contiene un array con las cadenas de texto de la plantilla ("Hola" y "mundo" en el ejemplo). El segundo y subsiguientes argumentos con los valores procesados ( ya cocinados ) de las expresiones de la plantilla (en este caso "15" y "50"). Finalmente, la función devuelve la cadena de texto manipulada. El nombre "tag" de la función no es nada especial, se puede usar cualquier nombre de función en su lugar.

```javascript
var a = 5;
var b = 10;

function tag(strings, ...values) {
  console.log(strings[0]); // "Hola "
  console.log(strings[1]); // " mundo "
  console.log(values[0]);  // 15
  console.log(values[1]);  // 50

  return "Bazinga!";
}

tag`Hola ${ a + b } mundo ${ a * b}`;
// "Bazinga!"
```

##### Cadenas en crudo (raw)

La propiedad especial raw, disponible en el primer argumento de las plantillas de cadenas de texto postprocesadas, nos permite acceder a las cadenas de texto tal como fueron ingresadas.

```javascript
function tag(strings, ...values) {
  console.log(strings.raw[0]); 
  // "linea 1 de cadena de texto \\n línea 2 de cadena de texto"
}

tag`línea 1 de cadena de texto \n línea 2 de cadena de texto`;

String.raw`Hola\n${2+3}!`;
// "Hola\\n5!"
```

### let

La sentencia let declara una variable de alcance local, la cual, opcionalmente, puede ser inicializada con algún valor.

let permite declarar variables limitando su alcance (scope) al bloque, declaración, o expresión donde se está usando. Lo anterior diferencia  la expresión let de la palabra reservada var , la cual define una variable global o local en una *función* sin importar el ámbito del bloque.

```javascript
if (x > y) {
  let gamma = 12.7 + y;
  i = gamma * x;
}

function varTest() {
  var x = 31;
  if (true) {
    var x = 71;  // misma variable!
    console.log(x);  // 71
  }
  console.log(x);  // 71
}

function letTest() {
  let x = 31;
  if (true) {
    let x = 71;  // variable diferente
    console.log(x);  // 71
  }
  console.log(x);  // 31
}

```

### const

Declaración de una constante de solo lectura.

Crea una constante que puede ser global o local a la función en la cual es declarada. Las constantes siguen las mismas reglas de ámbito que las variables.

El valor de una constante no puede ser cambiado por reasignación, y una constante no puede ser re-declarada. El porqué de esto, es que aunque es posible declarar una constante sin inicializarla, sería inútil hacerlo.

Una constante no puede compartir su nombre con una función o variable en el mismo ámbito.

```javascript
const a = 7;
document.writeln("a es " + a + ".");
```

### Iterators + For..Of

Diferencia entre for...of y for...in

El ciclo for...in iterará sobre todas las propiedades de un objeto. Más tecnicamente, iterará sobre cualquier propiedad en el objeto que haya sido internamente definida con su propiedad [[Enumerbale]]configurada como verdadera. 

La sintaxis de  for...of es específica de las colecciones, y no de todos los objetos. Este Iterará  sobre cualquiera de los elementos de una colección que tengan la propiedad [Symbol.iterator].

El siguiente ejemplo muestra las diferencias entre un ciclo for...of y un  ciclo for...in . 

```javascript
let arr = [3, 5, 7];
arr.foo = "hello";

for (let i in arr) {
   console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
   console.log(i); // logs "3", "5", "7"
}
```

Usando iteradores:

```javascript
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}
```

Con generadores:

```javascript
function* fibonacci() { // a generator function
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let n of fibonacci()) {
    console.log(n);
    // truncate the sequence at 1000
    if (n >= 1000) {
        break;
    }
}
```

### Generators

La declaración function* (la palabra clave function seguida de una asterisco) define una función generadora, que devuelve un objeto Generator.

También puedes definir funciones generadoras usando el constructor GeneratorFunction y una function* expression.

Los generadores son funciones de las que se puede salir y volver a entrar. Su contexto (asociación de variables) será conservado entre las reentradas.

La llamada a una función generadora no ejecuta su cuerpo inmediatamente; se devuelve un objeto iterador para la función en su lugar. Cuando el metodo next() del iterador es llamado , the generator function's body is executed until the first yield expression, which specifies the value to be returned from the iterator or, with yield*, delegates to another generator function. The next() method returns an object with a value property containing the yielded value and a done property which indicates whether the generator has yielded its last value.

```javascript
function* idMaker(){
  var index = 0;
  while(index < 3)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
```

### Symbols

Symbol es un tipo de datos cuyos valores son únicos e immutables. Dichos valores pueden ser utilizados como identificadores (claves) de las propiedades de los objetos.  Cada valor del tipo Symbol tiene asociado un valor del tipo String o Undefined que sirve únicamente como descripción del símbolo.

La función Symbol primitive data type es el constructor de valores del tipo Symbol. Cuando Symbol es llamado como función nos devuelve una nuevo valor del tipo Symbol. El constructor Symbol no debe ser usado con el operador new. Tampoco debe ser extendido mediante clases.

La *description* es opcional:
Es un valor opcional de tipo String. Unicamente sirve como descripción del símbolo que puede ser útil para depurar. No permite el acceso al símbolo que describe.

No se pueden instanciar con *new*.
> var sym = new Symbol(); // TypeError

```javascript
var sym = Symbol("foo");
typeof sym;     // "symbol" 
var symObj = Object(sym);
typeof symObj;  // "object"
```

Encontrando las claves de tipo símbolo de un objeto:

El método Object.getOwnPropertySymbols() devuelve un array con los símbolos que sirven como claves de las propiedades propias de un ojeto. Hay que destacar que cada objeto es inicializado sin propiedades propias con claves de tipo Symbol, así que este array estará vacio a menos que se hayan creado explicitamente propiedades con clave de tipo símbolo en el objeto.

Además:

Symbols enable access control for object state. Symbols allow properties to be keyed by either string (as in ES5) or symbol. Symbols are a new primitive type. Optional description parameter used in debugging - but is not part of identity. Symbols are unique (like gensym), but not private since they are exposed via reflection features like Object.getOwnPropertySymbols.

```javascript
var MyClass = (function() {

  // module scoped symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    console.log(key);
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      
    }
  };

  return MyClass;
})();

var c = new MyClass("hello")
c["key"] === undefined
```

### Reflect Functions

Pág. 51 (resources/ES6.pdf)

### Promises

El objeto Promise se usa para computaciones diferidas o asíncronas. Una Promesa puede estar en uno de estos estados:

* pending ( pendiente ): estado inicial, no cumplida o rechazada.
* fulfilled ( cumplida ): operación satisfactoria.
* rejected ( rechazada ): operación fallida.

```javascript
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    })
}

var p = timeout(1000).then(() => {
    return timeout(2000);
}).then(() => {
    throw new Error("hmm");
}).catch(err => {
    return Promise.all([timeout(100), timeout(200)]);
})
```

### Proxy

Se utiliza un objeto Proxy para interceptar las operaciones de bajo nivel internas en otro objeto. Los objetos proxy pueden utilizarse, entre otros fines, para la intercepción, virtualización de objetos y los registros/la generación de perfiles.
Si no se ha definido una captura para una operación determinada en el controlador para el proxy, la operación se reenvía al destino.
El objeto de controlador define los siguientes métodos (capturas) para implementar un comportamiento personalizado.Los ejemplos que se muestran aquí no son exhaustivos.Para admitir el comportamiento predeterminado condicional en el método de controlador, utilice métodos de Objeto Reflect (JavaScript).

```javascript
var target = {};
var handler = {
  get: function (receiver, name) {
    // This example includes a template string.
    return `Hello, ${name}!`;
  }
};

var p = new Proxy(target, handler);
console.log(p.world);
```

### Modules

Language-level support for modules for component definition. Codifies patterns from popular JavaScript module loaders (AMD, CommonJS). Runtime behaviour defined by a host-defined default loader. Implicitly async model – no code executes until requested modules are available and processed.

```javascript
// lib/math.js
export function sum(x, y) {
  return x + y;
}

export var pi = 3.141593;

// app.js
import * as math from "lib/math";
alert("2π = " + math.sum(math.pi, math.pi));

// otherApp.js
import {sum, pi} from "lib/math";
alert("2π = " + sum(pi, pi));
```

Some additional features include export default and export *:

```javascript
// lib/mathplusplus.js
export * from "lib/math";
export var e = 2.71828182846;
export default function(x) {
    return Math.log(x);
}

// app.js
import ln, {pi, e} from "lib/mathplusplus";
alert("2π = " + ln(e)*pi*2);
```

Cuando tenemos que transpilar el código a ES5 tenemos que añadir algunas cosas más, ya que esto no tiene un soporte nativo y tenemos que usar un module loader.

Babel por defecto genera una llamada del tipo CommondJS.

Por eso tenemos que especificar el loader que queremos usar, en nuestro caso Webpack:

> npm install --save-dev babel-loader babel-core

pero eso es otra historia que veremos en otro momento.

#### Module Loaders

Module loaders support:

* Dynamic loading
* State isolation
* Global namespace isolation
* Compilation hooks
* Nested virtualization

The default module loader can be configured, and new loaders can be constructed to evaluate and load code in isolated or constrained contexts.

```javascript
// Dynamic loading – ‘System’ is default loader
System.import('lib/math').then(function(m) {
  alert("2π = " + m.sum(m.pi, m.pi));
});

// Create execution sandboxes – new Loaders
var loader = new Loader({
  global: fixup(window) // replace ‘console.log’
});
loader.eval("console.log('hello world!');");

// Directly manipulate module cache
System.get('jquery');
System.set('jquery', Module({$: $})); // WARNING: not yet finalized
```
