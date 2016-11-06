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



