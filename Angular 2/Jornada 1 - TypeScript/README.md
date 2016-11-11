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

* Tipos básicos
    * Inferencia de tipos
    * Compatibilidad de tipos
    * Tipos avanzados
* Clases
* Funciones
* Generics
* Enums
* Symbols
* Iteradores y generadores
* Módulos
* Mixins
* Directivas del "transpilador"

Pero además tenemos elementos propios del TypeScript como:

* Tipos
* Decoradores
* Interfaces
* Namespaces

## Typings

Podemos utilizar código y librerias escritas en JavaScript desde TypeScript, pero es muy recomendable tener los tipos de acceso para poder hacer una clara integración entre los dos lenguajes. Por eso tenemos typings una iniciativa que permite tener wrappers para muchas de las librerias ya existentes, de esa forma podemos usar lodash, jquery, backbone de cuasinativa en TypeScript.

Desde aquí podemos buscar un paquete en concreto que necesitemos integrar:

http://microsoft.github.io/TypeSearch/

_Vamos a realizar un ejemplo de integración TypeScript-jQuery_

https://github.com/Microsoft/TypeScriptSamples/tree/master/jquery