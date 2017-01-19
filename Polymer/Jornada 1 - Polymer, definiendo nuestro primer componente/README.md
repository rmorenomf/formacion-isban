# Jornada 1: Polymer, definiendo nuestro primer componente.

## Plan de trabajo

El objetivo de esta jornada es dar una visión global de Polymer. Comenzar un proyecto de desarrollo con Polymer de una pequeña tienda.

## Revisión a los objetivos de la formación.

1. Jornada 1: Polymer, definiendo nuestro primer componente.
2. Jornada 2: Directivas estructurales en polymer y comunicación entre componentes.
3. Jornada 3: Catálogo de componentes y uso de los mismos a través de Bower.
4. Jornada 4: Documentación y Testing en Polymer.
5. Jornada 5: Vulcanizado y construcción con Gulp.
6. Jornada 6: Creando una aplicación con el patrón PRPL.

Vamos a empezar una aplicación y vamos a estructurar la formación como un Workshop.

Vamos a montar una tienda online super sencilla. Vamos a partir del Starter Kit y vamos a crear y modificar las secciones que mas nos interesen.

## ¿Qué es Polymer?

Es un conjunto de herramientas que nos permiten crear Webcomponents. Además es un ecosistema en que tenemos las herramientas para crear los webcomponents, las herramientas para construir, probar y testar, además de un conjunto de webcomponents que podemos incorporar a nuestras aplicaciones.

## ¿Qué es un webcomponent?

Es un elemento encapsulado que contiene lo que necesita para pintarse y para ejecutarse y que además no se ve afectado ni afecta al resto de elementos.
Intenta resolver el problema de la fragilidad de la naturaleza global del HTML, CSS y JavaScript. 
Lo que hace Polymer no es magia, se basa en estándares, mas o menos, soportados por los navegadores. 
Para poder crear webcomponents necesitamos cuatro elementos: 

1. Custom elements
2. Shadow DOM
3. Imports
4. Templates

### Custom elements.

http://w3c.github.io/webcomponents/spec/custom/

Nos permiten crear nuestros propios elementos HTML y después usarlos como si de un TAG estándar se tratase.

```html
<super-button></super-button>
```

Realmente son Elements en el sentido del DOM (ver apartado sobre el DOM). 

#### Customs elements manual de uso:

1. Debe contener un guión (-):

```html
<super-button>
  ```

2. Antes de usarlo tenemos que registrarlo:

```
document.registerElement()
```

Ejemplo:

```javascript
var XHelloPrototype = Object.create(HTMLElement.prototype);
XHelloPrototype.createdCallback = function() {
  this.textContent = "Hello world (Component)!";
};

XHelloPrototype.hello = function() {
  console.log('hello() called');
};

var XHello = document.registerElement('x-hello', {
  prototype: XHelloPrototype
});
```

Nota: El prototipo debe estar unido a HTMLElement.prototype ( instanceof HTMLElement.prototype). La herencia es la herencia.

Echar un vistazo a la documentación de *document.registerElement* https://developer.mozilla.org/es/docs/Web/API/Document/registerElement

Podemos extender un elemento existente:

```javascript

var XMyButtonPrototype = Object.create(HTMLButtonElement.prototype);
XMyButtonPrototype.createdCallback = function() {
  this.textContent = "I'm an cool button!";
};

var XMyButton = document.registerElement('x-my-button', {
  prototype: XMyButtonPrototype,
  extends: 'button'
});
```

En este caso tenemos que usar la sintaxis *is*:

```<button is="x-my-button"></button>```

También podemos hacer un uso declarativo de custom element creado:

```javascript
var xHello = new XHello();
document.body.appendChild(xHello);

var xMyButton = document.createElement('button', 'x-my-button');
xMyButton.action(); // "foo() called"
```

#### ¡Nuevo! - Y además podemos usar la API v1 y la sintaxis de ES6.

```javascript
// Use custom elements API v1 to register a new HTML tag and define its JS behavior
// using an ES6 class. Every instance of <fancy-tab> will have this same prototype.
customElements.define('fancy-tabs', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.

    // Attach a shadow root to <fancy-tabs>.
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>#tabs { ... }</style> <!-- styles are scoped to fancy-tabs! -->
      <div id="tabs">...</div>
      <div id="panels">...</div>
    `;
  }
  
});
```

### Plantillas / Templates:

Permiten incluir código HTML sin renderizar por el navegador. Estos templates pueden ser usados como piezas de construcción desde JavaScript.
En este ejemplo vamos a ver cómo se puede clonar y usar un template.

```html
<!doctype html>
<html lang="en">
 <head>
  <title>Homework</title>
 <body>
  <template id="template"><p>Smile!</p></template>
  <script>
   let num = 3;
   const fragment = document.getElementById('template').content.cloneNode(true);
   while (num-- > 1) {
     fragment.firstChild.before(fragment.firstChild.cloneNode(true));
     fragment.firstChild.textContent += fragment.lastChild.textContent;
   }
   document.body.appendChild(fragment);
  </script>
</html>
```

The p element in the template is not a child of the template in the DOM; it is a child of the DocumentFragment returned by the template element's content IDL attribute.

If the script were to call appendChild() on the template element, that would add a child to the template element (as for any other element); however, doing so is a violation of the template element's content model.

Mas información en: https://html.spec.whatwg.org/multipage/scripting.html#the-template-element

#### HTML Imports:

Permiten importar elementos empaquetados. 

> Ver ejemplo en el proyecto *mini-polymer*.

Uso de un elemento importado *index.html*:

```html
<!DOCTYPE html> 
<html lang="es">
        
    <head>
        <title>Ejemplo uso de ES6</title>        
        <link rel="import" href="./components/superlabel.html">
    </head>
    <body>
        <h1>Ejemplo de componente</h1>
        <x-hello></x-hello>       
    </body>
</html>
```

Ejemplo de un elemento a importar *superlabel.html*:

```html
<template id="template">
    <styles>
        :host {
            color: blue;
        }
    </styles>
    <h1>Hola mundo!</h1>
</template>
<script>
    var XHelloPrototype = Object.create(HTMLElement.prototype);    
    debugger;
    XHelloPrototype.attachedCallback = function() {
        var root = this.createShadowRoot();
        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);
    };

    var XHello = document.registerElement('x-hello', {
            prototype: XHelloPrototype
    });

</script>
```

Es importante conocer que NO se trata de una importación del estilo de PHP, en el que automáticamente se incorpora el HTML en la página en un punto indicado. Con un ```<import>``` estamos haciendo disponible un recurso encapsulado en otro fichero para ser usado dentro de la página que importa el recurso.

Hay que tener en cuenta además que:

1. Si contiene Scripts de JavaScript estos se ejecutarán cuando se importe el recurso. 
2. No se aplica ningún tipo de capa de aislamiento (ejemplo: Shadow DOM), estos elementos son globales y pueden tener efectos colaterales debídos a la fragilidad de la Web (Salvo que contengan Web components).
3. Tampoco se ejecutan en una hebra de ejecución distinta. Eso significa que no es una herramienta de ejecución concurrente y no es un mecanismo de paralelismo.

Más información en:

http://w3c.github.io/webcomponents/spec/imports/
http://blog.teamtreehouse.com/introduction-html-imports

### Shadow DOM:

Más información: http://w3c.github.io/webcomponents/spec/shadow/

Los navegadores ya lo usan:

1. Activar "Show user agent shadow DOM" de las herramientas de desarrollo de Chrome (Si no lo tenemos ya). 

Buscar una etiqueta de vídeo 

#### ¿Qué es Shadow DOM?

Shadow DOM se refiere a la habilidad del navegador de incluir un subárbol de elementos (DOM) en un documento (DOM), pero a la vez sin incluirlo en el árbol DOM del documento.

En otras palabras: el Shadow DOM es un DOM encapsulado que vive dentro del DOM principal. 

https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom

No olvidar comentar los selectores propios de Shadow DOM (ver0): 

* *:host*. Selecciona un elemento del host del Shadow. Puede contener identificadores adicionales entre paréntesis.

  ```css
  :host(.fancy) {
    display: inline-block;
    background: purple;
  }
  ```

* *:host-context*. Selecciona un elemento del host del Shadow basado en un elemento padre coincidente.

  ```css
  :host-context(.blocky) {
    display: block
    background: red;
  }
  ```

* CSS custom properties. Los nombres de propiedades con prefijo --, como --example-name, representan propiedades personalizadas que contienen un valor que puede ser reutilizado en todo el documento mediante la función (var ()). Las propiedades personalizadas participan en la css: cada una de ellas puede aparecer varias veces y el valor de la variable coincidirá con el valor definido en la custom properties computada por el algoritmo CSS.

  ```css
  h1 {  
    color: var(--header-color, green);
  }
  ```

* *::content* (renamed to *::slotted*). Selecciona los nodos distribuidos dentro de un elemento. *::content* ha sido renombrado a *::slotted*. Es importante tener en cuenta que *::slotted* solo puede seleccionar a los hijos de nivel superior, no puede hacer selectores de descendientes.

  ```css
  /* Current implementation in Chrome */
  ::content h1 {
    color: red;
  }

  /* Upcoming implementation in Chrome and Safari */
  ::slotted(h1) {
    color: red;
  }
  ```

* */deep/* (deprecated)

* ::shadow (deprecated)

#### Un poco de teoría sobre el DOM

El Modelo de Objetos del Documento (DOM) es una interfaz de programación de aplicaciones (API) para documentos HTML y XML. Define la estructura lógica de los documentos y el modo en que se accede y manipula un documento. En la especificación del DOM, el término "documento" se utiliza en un sentido amplio. XML se utiliza cada vez más como un medio para representar muchas clases diferentes de información que puede ser almacenada en sistemas diversos, y mucha de esta información se vería, en términos tradicionales, más como datos que como documentos. Sin embargo, XML presenta estos datos como documentos, y se puede usar el DOM para manipular estos datos.

Con el Modelo de Objetos del Documento los programadores pueden construir documentos, navegar por su estructura, y añadir, modificar o eliminar elementos y contenido. Se puede acceder a cualquier cosa que se encuentre en un documento HTML o XML, y se puede modificar, eliminar o añadir usando el Modelo de Objetos del Documento, salvo algunas excepciones. En particular, aún no se han especificado las interfaces DOM para los subconjuntos internos y externos de XML.

El DOM es un API de programación para documentos. Guarda una gran similitud con la estructura del documento al que modeliza. Por ejemplo, considérese esta tabla, tomada de un documento HTML:

```html
<TABLE>
    <TBODY> 
        <TR> 
            <TD>Shady Grove</TD>
            <TD>Aeolian</TD> 
        </TR> 
        <TR>
            <TD>Over the River, Charlie</TD>        
            <TD>Dorian</TD> 
        </TR> 
    </TBODY>
</TABLE>
```

El DOM representa esta tabla de este modo: 

![alt text](./resources/table.gif "Representación del DOM de la tabla del ejemplo")

En el DOM, los documentos tienen una estructura lógica que es muy parecida a un árbol. Para ser más precisos, es más bien como un "bosque" o una "arboleda", que puede contener más de un árbol. Sin embargo, el DOM no especifica que los documentos deban ser implementados como un árbol o un bosque, ni tampoco especifica cómo deben implementarse las relaciones entre objetos. El DOM es un modelo lógico que puede implementarse de cualquier manera que sea conveniente. En esta especificación, usamos el término modelo de estructura para describir la representación en forma de árbol de un documento, evitando la utilización de términos tales como "árbol" o "bosque" para evitar la implicación de una implementación en particular. Una propiedad importante de los modelos de estructura del DOM es su isomorfismo estructural: si dos implementaciones cualesquiera del Modelo de Objetos del Documento se usan para crear una representación del mismo documento, ambas crearán el mismo modelo de estructura, con exactamente los mismos objetos y relaciones.

Se eligió el nombre "Modelo de Objetos del Documento" porque es un "modelo de objetos" en el sentido tradicional del diseño orientado a objetos: los documentos se modelizan usando objetos, y el modelo comprende no solamente la estructura de un documento, sino también el comportamiento de un documento y de los objetos de los cuales se compone. En otras palabras, los nodos del diagrama anterior no representan una estructura de datos, sino que representan objetos, los cuales pueden tener funciones e identidad. Como modelo de objetos, el DOM identifica:

* las interfaces y objetos usados para representar y manipular un documento
* la semántica de estas interfaces y objetos, incluyendo comportamiento y atributos
* las relaciones y colaboraciones entre estas interfaces y objetos

Vamos a ver unos ejemplos de manipulación del DOM desde JavaScript:

_Para ver la lista completa de métodos y funciones de manipulación del DOM desde JavaScript podemos visitar:_

http://www.w3schools.com/jsref/dom_obj_document.asp

Accedemos al DOM desde el Nodo "document", este es el nodo Root de todo el documento.

Contar que también tenemos el BOM para acceder a los objetos proporcionados por el navegador.

IMPORTANTE - Actualmente hay dos versiones de Shadow DOM, v0 y v1. Mas adelante veremos como afectan las diferentes versiones a los componentes de Polymer.

## ¿Qué es Polymer?

Visto los elementos sobre los que se basan los webcomponents podemos concluir que Polymer es un recubrimiento que "endulza" y hace lo mas sencillo posible la utilización de Webcomponents.

Esto es fácil de ver cuando construimos un webcompont Polymer:

```javascript
<dom-module id="contact-card">
    <style>...</style>
    <template>
      <content></content>
      <iron-icon icon="star" hidden$="{{!starred}}"></iron-icon>
    </template>
    <script>
      Polymer({
        is: 'contact-card',
        properties: {
          starred: Boolean
        }
      });
    </script>
  </dom-module>
  ```

## Documentación

La documentación oficial de Polymer se encuentra en: https://www.polymer-project.org/1.0/docs/devguide/feature-overview

Personalmente no me parece de las mejores. Pero es completa, en especial está bien estructurada en el catálogo de elementos, donde no solo tenemos la documentación, además nos ofrece herramientas para poder explotar mas facilmente esos elementos. 

La guía oficial divide las características:

* Registro y ciclo de vida.
* Declaración de propiedades.
* Gestión del local DOM.
* Eventos.
* Data binding.
* Behaviors. Modulos reutilizables.
* Funciones de utilidad.
* Características y elementos experimentales.
* Tools. Línea de comandos y herramientas para todo el ciclo de vida de un componente o aplicación Polymer. 
* Catálogo de elementos.

NOTA: Desde la semana del 9 de Noviembre de 2017 hay una nueva versión del catálogo de componentes y de la aplicación para acceder a ellos. Personalmente me parece menos intuitiva. Los componentes no son los mismos. 

## Tutorial rápido de Polymer

1. Un componente Polymer básico:

  Fichero *proto-element.html*:

  ```html
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">

  <script>
    // register a new element called proto-element
    Polymer({
      is: "proto-element",

      // add a callback to the element's prototype
      ready: function() {
        this.textContent = "I'm a proto-element. Check out my prototype!"
      }
    });
  </script>
  ```

  En este ejemplo hemos incluido capturado uno de los hooks del ciclo de vida.

  Su uso en el *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="proto-element.html">
    </head>
    <body>
      <proto-element></proto-element>
    </body>
  </html>
  ```

2. Manipulación del DOM (local):

  Fichero *proto-element.html*:

  ```html
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">
  <dom-module id="dom-element">

    <template>
      <p>I'm a DOM element. This is my local DOM!</p>
    </template>

    <script>
      Polymer({
        is: "dom-element"
      });
    </script>

  </dom-module>
  ```

  *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="dom-element.html">
    </head>
    <body>
      <dom-element></dom-element>
    </body>
  </html>
  ```

3. Composición:

  DOM local permite controlar la composición. Los hijos del elemento se pueden distribuir de modo que se representen como si estuvieran insertados en el árbol DOM local.
  Este ejemplo crea una etiqueta sencilla que decora una imagen al envolverla con una etiqueta denominada ```<div>```.
  En este ejemplo estamos encapsulando el DOM Local dentro del elemento. Este DOM es propio del componente, es su Shadow DOM.

  Fichero *picture-frame.html*:

  ```html
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">
  <dom-module id="picture-frame">

    <template>
      <!-- scoped CSS for this element -->
      <style>
        div {
          display: inline-block;
          background-color: #ccc;
          border-radius: 8px;
          padding: 4px;
        }
      </style>
      <div>
        <!-- any children are rendered here -->
        <content></content>
      </div>
    </template>

    <script>
      Polymer({
        is: "picture-frame",
      });
    </script>

  </dom-module>
  ```

  Aquí un ejemplo de su uso, *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="picture-frame.html">
    </head>
    <body>
      <picture-frame>
        <img src="https://www.polymer-project.org/images/logos/p-logo-32.png">
      </picture-frame>
    </body>
  </html>
  ```

4. Data binding:

  Esto nos permite modificar el Local DOM de forma dinámica. Así como propagar cambios en nuestros elementos. Este puedes unidireccional o bidireccional.

  Fichero *name-tag.html*:

  ```html 
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">
  <!-- import the iron-input custom element -->
  <link rel="import" href="https://polygit2.appspot.com/components/iron-input/iron-input.html">

  <dom-module id="name-tag">

    <template>
      <!-- bind to the "owner" property -->
      This is <b>{{owner}}</b>'s name-tag element.
    </template>

    <script>
    Polymer({
      is: "name-tag",
      ready: function() {
        // set this element's owner property
        this.owner = "Daniel";
      }
    });
    </script>

  </dom-module>
  ```

  Su uso en el *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="name-tag.html">
    </head>
    <body>
      <name-tag></name-tag>
    </body>
  </html>
  ```

5. Polymer nos ofrece un mecanismo para comunicarnos con nuestros componentes, (en realidad también podemos hacerlo mediante eventos, aquí la dirección es importante), nos referimos a las propiedades:

  Fichero *configurable-name-tag.html*:

  ```html
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">

  <dom-module id="configurable-name-tag">

    <template>
      <!-- bind to the "owner" property -->
      This is <b>{{owner}}</b>'s configurable-name-tag element.
    </template>

    <script>
      Polymer({
        is: "configurable-name-tag",
        properties: {
          // declare the owner property
          owner: {
            type: String,
            value: "Daniel"
          }
        }
      });
    </script>

  </dom-module>
  ```

  Su uso en el *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="configurable-name-tag.html">
    </head>
    <body>
      <!-- configure a property from markup by setting
          the corresponding attribute                 -->
      <configurable-name-tag owner="Scott"></configurable-name-tag>
    </body>
  </html>
  ```

  Si juntamos propiedades y data binding tenemos una importante y potente herramienta de sincronización de datos:

  Fichero *editable-name-tag.html*:  

  ```html
  <link rel="import"  href="https://polygit2.appspot.com/components/polymer/polymer.html">
  <!-- import the iron-input custom element -->
  <link rel="import" href="https://polygit2.appspot.com/components/iron-input/iron-input.html">

  <dom-module id="editable-name-tag">

    <template>
      <p>
      This is a <strong>{{owner}}</strong>'s editable-name-tag.
      </p>
      <!-- iron-input exposes a two-way bindable input value -->
      <input is="iron-input" bind-value="{{owner}}"
        placeholder="Your name here...">
    </template>

    <script>
      Polymer({
        is: "editable-name-tag",
        properties: {
          owner: {
            type: String,
            value: "Daniel"
          }
        }
      });
    </script>

  </dom-module>
  ```

  Su uso en el *index.html*:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script src="https://polygit2.appspot.com/components/webcomponentsjs/webcomponents-lite.js"></script>
      <link rel="import" href="editable-name-tag.html">
    </head>
    <body>
      <editable-name-tag></editable-name-tag>
    </body>
  </html>
  ```

  _Vamos a trastear un poco con el tipo de binding_

6. Toolkit.

  Tenemos que instalar el polymer y polymer-cli de forma global:

  > npm install -g polymer-cli

  Si tenemos un proyecto desde cero, podemos incluir la librería y los polyfills (las dependencias) con bower:

  > bower install polymer

  Lo mejor es crear una carpeta nueva y ejecutar:

  > polymer init 

  este comando arranca el asistente para crear un proyecto nuevo. Nos preguntará cosas como:

  ```
  Which starter template would you like to use? (Use arrow keys)
    
  element - A blank element template
  application - A blank application template
  shop - The "Shop" Progressive Web App demo
  starter-kit - A starter application template, with navigation and "PRPL pattern" loading
  ```

  Vamos a elegir ```application - A blank application template``` después pasará a instalar todas las dependencias necesarias y tendremos un proyecto *en blanco" funcionando. 

Usando un componente Polymer. Necesitamos importar el componente allá donde vayamos a usarlo y incorporarlo mediante marcado o de forma declarativa una vez que lo tengamos importado.
Aquí tenemos que tener en cuenta que no todos los navegadores soportan Webcomponents, por eso será necesario incluir las dependencias a los Polyfills que nos permiten ejecutar los webcomponents incluso sin tener soporte por parte del navegador.

## Tiempo de práctica

_Vamos a crear un proyecto Polymer_

## Estructura de un componente Polymer (v0)


```javascript
// register an element
    MyElement = Polymer({

      is: 'my-element',

      // See below for lifecycle callbacks
      created: function() {
        this.textContent = 'My element!';
      }

    });

    // create an instance with createElement:
    var el1 = document.createElement('my-element');

    // ... or with the constructor:
    var el2 = new MyElement();
```

NOTA: Esto va a cambiar con la versión v2 de Polymer.

Si comparamos este ejemplo con la forma de crear y registrar un web component con los ejemplos "a pelo" o "vanilla" que hemos visto antes podemos ver cosas similares y otras diferentes. 

En primer lugar vemos que la llamada a ```Polymer({...})``` se en carga de la tarea mecánica de crear el ElementHTML, sobreescribir los métodos y registrar el componente entre otras cosas. Además hace que todo esto sea independiente del navegador en el que estemos mediante el uso de Pollyfills.

Otra de las cosas que nos "endulza" Polymer es extender de un elemento HTML nativo. 

### Extendiendo elementos nativos HTML

De hecho, en la versión de Polymer 1.x, solo podemos extender componentes nativos; *input*, *button*, etc. Pero no de otros Custom elements.

```javascript
MyInput = Polymer({
  is: 'my-input',
  extends: 'input',
  created: function() {
    this.style.border = '1px solid red';
  }
});

var el1 = new MyInput();
console.log(el1 instanceof HTMLInputElement); // true

var el2 = document.createElement('input', 'my-input');
console.log(el2 instanceof HTMLInputElement); // true
```

¡IMPORTANTE! - Para poder usarlo tendremos que incluir la formula *is* en el custom element:

```html
<input is="my-input">
```

NOTA: En la preview de la versióin 2 se prescinde de este formula:

Polymer 2.0 doesn't support type-extension elements (for example, ```<input is="iron-input">```). Type-extension support is still included in the custom elements v1 spec (as "customized build-in elements"), and scheduled for implementation in Chrome. However, since Apple has said it will not implement is, we will not be encouraging its use to avoid indefinite reliance on the custom elements polyfill. Instead, a wrapper custom element can surround a native element. For example:

```html
<a is="my-anchor">...</a>
```

Could become:

```html
<my-anchor>
  <a>...</a>
</my-anchor>
```
Users will need to change existing type-extension elements where necessary.

All template type extensions provided by Polymer have now been changed to standard custom elements that take a <template> in their light DOM. For example:

```html
<template is="dom-repeat" items="{{items}}">...</template>
```

Becomes:

```html
<dom-repeat items="{{items}}">
  <template>...</template>
</dom-repeat>
```

Esto sirve de poco por eso vamos a agregar mas cosas a nuestro componente:

1. Un constructor a medida.
2. Personalizar las acciones del ciclo de vida.
3. Definir atributos o propiedades de un componente.
4. Crear piezas de código reutilizables (Behaviors).

### Constructor a medida

Si queremos crear un constructor al que pasar parámetros adicionales tenemos que especificar una nueva funcion *factoryImpl* en el prototipo:

```javascript
MyElement = Polymer({

  is: 'my-element',

  factoryImpl: function(foo, bar) {
    this.foo = foo;
    this.configureWithBar(bar);
  },

  configureWithBar: function(bar) {
    ...
  }

});

var el = new MyElement(42, 'octopus');
```

Dos cosas sobre los constructores personalizados:

* El método factoryImpl solo se invoca cuando se crea un elemento utilizando el constructor. El método factoryImpl no se llama si el elemento se crea a partir del marcado por el parser de HTML o si se crea el elemento usando document.createElement.

* El método factoryImpl se llama después de inicializar el elemento (DOM local creado, valores predeterminados establecidos, etc.).

Por último vamos a crear esto dentro del documento principal, index.html

```html
<!DOCTYPE html>
    <html>
      <head>
        <!-- Primero importamos las dependencias -->
        
        <!-- Importamos los pollyfills para el soporte de navegadores antiguos (o no Chrome)-->
        <script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>
        
        <!-- Importamos la librería Polymer -->
        <link rel="import" href="bower_components/polymer/polymer.html">
        
        <title>Defining a Polymer Element from the Main Document</title>
      </head>
      <body>

        <!-- Creamos nuestro webcomponent. --> 
        <dom-module id="main-document-element">
          <template>
            <p>
              Hi! I'm a Polymer element that was defined in the
              main document!
            </p>
          </template>
          <script>
            HTMLImports.whenReady(function () {
              Polymer({
                is: 'main-document-element'
              });
            });
          </script>
        </dom-module>

        <!-- Usamos el componente creado -->
        <main-document-element></main-document-element>
      </body>
    </html>
  ```

### Personalizar las acciones del ciclo de vida.

El prototipo de Base de Polymer implementa callbacks de ciclo de vida del custom element para realizar tareas necesarias para las funciones integradas de Polymer. Polymer, a su vez, llama a métodos de ciclo de vida en su prototipo.

Polymer agrega una callbacks adicional, que se invoca cuando Polymer ha terminado de crear e inicializar el DOM local del elemento.

Callback | Descripción
--- | ---
created | Se llama cuando se ha creado el elemento, pero antes de que se establezcan los valores de propiedad y se inicialice DOM local. Se utiliza para una configuración única antes de que se establezcan los valores de propiedad. Utilizar en lugar de createCallback.
ready | Se llama después de que se establecen valores de propiedad y se inicializa DOM local. Utilizar para la configuración única de su componente después de que el DOM local se inicialice. (Para la configuración basada en valores de propiedad, puede ser preferible usar un observador.)
attached | Se llama después de que el elemento se adjunta al documento. Puede ser llamado varias veces durante la vida de un elemento. La primera devolución de llamada *attached* está garantizada para no disparar hasta después de *ready*. Los usos incluyen el acceso a la información de estilo computado y la adición de oyentes de evento a nivel de documento. (Si utiliza el manejo de eventos declarativos, como los oyentes de eventos anotados o el objeto de los oyentes, Polymer agrega automáticamente los oyentes al adjuntar y los elimina al separarlos). Utilizar en lugar de attachedCallback.
detached | Se llama después de retirar el elemento del documento. Puede ser llamado varias veces durante la vida de un elemento. Los usos incluyen la eliminación de los listeners de eventos agregados en adjunto. Usar en lugar de singleCallback.
attributeChanged | Se llama cuando se cambia uno de los atributos del elemento. Se utiliza para manejar cambios de atributos que no corresponden a las propiedades declaradas. (Para las propiedades declaradas, Polymer manipula los cambios de atributo automáticamente como se describe en la deserialización de atributo.). Utilizar en lugar de attributeChangedCallback.

Aquí tenemos un ejemplo de intercepción de los hooks de los eventos del ciclo de vida de un componente:

```javascript
MyElement = Polymer({

  is: 'my-element',

  created: function() {
    console.log(this.localName + '#' + this.id + ' was created');
  },

  ready: function() {
    console.log(this.localName + '#' + this.id + ' has local DOM initialized');
  },

  attached: function() {
    console.log(this.localName + '#' + this.id + ' was attached');
  },

  detached: function() {
    console.log(this.localName + '#' + this.id + ' was detached');
  },

  attributeChanged: function(name, type) {
    console.log(this.localName + '#' + this.id + ' attribute ' + name +
      ' was changed to ' + this.getAttribute(name));
  }

});
``` 

### Orden de inicialización

El orden básico de inicialización del elemento para un elemento dado es:

  1. *created* callback.
  2. El DOM local se inicializa (Esto significa que se crean los hijos DOM locales, sus valores de propiedad se establecen como se especifica en la plantilla, y se les ha llamado a ellos, suponiendo que estén registrados).
  3. *ready* callback.
  4. *factoryImpl* callback.
  5. *attached* callback.


NOTA: No hay garantías sobre el tiempo de inicialización de los hijos del light DOM. En general los elementos se inicializan en orden de creación, por lo que los elementos child suelen ser inicializados después de sus padres.

Polymer también proporciona dos devoluciones de llamada de en tiempo de registro, *beforeRegister* y *registered*.

Podemos utilizar el callback *beforeRegister* para transformar el prototipo de un elemento antes del registro. Esto es útil cuando se registra un elemento usando el estilo de clase de ES6.

### Crear de un componente, pero no registrarlo hasta mas adelante:

```javascript
// Creamos pero no registramos
var MyElement = Polymer.Class({

  is: 'my-element',

  // See below for lifecycle callbacks
  created: function() {
    this.textContent = 'My element!';
  }

});

document.registerElement('my-element', MyElement);

// Equivalent:
var el1 = new MyElement();
var el2 = document.createElement('my-element');
```

*Según la documentación:* "Polymer.Class takes the same prototype argument as the Polymer function, and sets up the prototype chain, but does not register the element. Instead it returns a constructor that can be passed to document.registerElement to register your element with the browser, and after which can be used to instantiate new instances of your element via code."

## Propiedades

### Definir atributos o propiedades de un componente.

Podemos crear propiedades a los componentes de forma que podamos especificar diferentes comportamientos y visualizaciones para un mismo componente. Además dichas propiedades nos permiten comunicarnos con el componente desde elementos ajenos al mismo.

Veamos un ejemplo:

```javascript
Polymer({

  is: 'x-custom',

  properties: {
    user: String,
    isHappy: Boolean,
    count: {
      type: Number,
      readOnly: true,
      notify: true
    }
  },

  ready: function() {
    this.textContent = 'Hello World, I am a Custom Element!';
  }

});
```

Como vemos podemos sobre escribir el atributo *properties*, con las propiedades que deseemos:

1. Tipo de propiedad.
2. Valor por defecto.
3. Observer de cambio de propiedad. Llama a un método cuando cambia el valor de la propiedad.
4. Estado de solo lectura. Evita cambios accidentales en el valor de la propiedad.
5. Binding bidireccional. Inicia un evento cada vez que cambia el valor de la propiedad.
6. Propiedad calculada. Calcula dinámicamente un valor basado en otras propiedades.
7. Propiedad de reflexión para atribuir. Actualiza el valor del atributo correspondiente cuando cambia el valor de la propiedad.

Esas características se integran con el *data system*. (Que veremos en la Jornada 2).

Propiedades:

* *type*: Tipo: constructor (uno de Boolean, Date, Number, String, Array u Object)
Tipo de atributo, utilizado para deserializar desde un atributo. El tipo de la propiedad es explícito, especificado utilizando el constructor del tipo. 

* *value*: Tipo: boolean, number, string o function.
Valor predeterminado de la propiedad. Si valor es una función, se invoca la función y se utiliza el valor de retorno como valor predeterminado de la propiedad. Si el valor predeterminado debe ser una matriz o un objeto exclusivo de la instancia, cree la matriz o el objeto dentro de una función. 

* *readOnly*: Tipo: boolean
Si es true, la propiedad no se puede establecer directamente mediante asignación o vinculación de datos.

* *notify*: Tipo: boolean
Si es true, la propiedad está disponible para binding de datos bidireccional. Además, un evento, nombre-propiedad-cambiado se dispara cada vez que la propiedad cambia.

* *computed*: Tipo: string
El valor se interpreta como un nombre de método y una lista de argumentos. El método se invoca para calcular el valor cuando cambia cualquiera de los valores de los argumentos. Las propiedades calculadas son siempre de solo lectura.

* *observer*: Tipo: string
El valor se interpreta como un nombre de método que se invocará cuando cambie el valor de la propiedad. El método *propertyNameChanged* no se invocará automáticamente.

* *reflectToAttribute*: Tipo: boolean
Establezca en true para que el atributo correspondiente se establezca en el nodo host cuando cambie el valor de la propiedad. Si el valor de la propiedad es booleano, el atributo se crea como un atributo booleano HTML estándar (si es true, no se establece si es falso). Para otros tipos de propiedad, el valor del atributo es una representación de cadena del valor de la propiedad.

#### Attribute deserialization

Si una propiedad está configurada en el objeto _properties_, un atributo en la instancia que coincide con el nombre de la propiedad será deserializado de acuerdo con el tipo especificado y asignado a una propiedad del mismo nombre en la instancia del elemento.

El sistema de tipos incluye soporte para valores Boolean y de Number, valores de Object y Array expresados como JSON o objetos Date expresados como cualquier representación de cadena de fecha parseable.

Las propiedades Boolean se establecen en función de la presencia del atributo: si el atributo existe, la propiedad se establece en true, independientemente del valor del atributo. Si el atributo está ausente, la propiedad obtiene su valor predeterminado.

```html
<script>

  Polymer({

    is: 'x-custom',

    properties: {
      user: String,
      manager: {
        type: Boolean,
        notify: true
      }
    },

    attached: function() {
      // render
      this.textContent = 'Hello World, my user is ' + (this.user || 'nobody') + '.\n' +
        'This user is ' + (this.manager ? '' : 'not') + ' a manager.';
    }

  });

</script>

<x-custom user="Scott" manager></x-custom>
<!--
<x-custom>'s text content becomes:
Hello World, my user is Scott.
This user is a manager.
-->
```

Con el fin de configurar las propiedades de camel-case de los elementos mediante atributos, dash-case debería utilizarse en el nombre del atributo.

```html
<script>

  Polymer({

    is: 'x-custom',

    properties: {
      userName: String
    }

  });

</script>

<x-custom user-name="Scott"></x-custom>
<!-- Sets <x-custom>.userName = 'Scott';  -->
```

*Nota*: La deserialización ocurre tanto en el tiempo de creación como en el tiempo de ejecución (por ejemplo, cuando se cambia el atributo mediante setAttribute). Sin embargo, se recomienda que los atributos sólo se utilicen para configurar propiedades en el marcado estático y, en cambio, las propiedades se establezcan directamente para los cambios en tiempo de ejecución.

#### Problemas con las propiedades Booleanas:

Para que una propiedad Booleana sea configurable desde el marcado, debe predeterminarse a false. Si el valor por defecto es true, no puede establecerlo en false desde el marcado, ya que la presencia del atributo, con o sin valor, equivale a true. Este es el comportamiento estándar de los atributos en la plataforma web.

Si este comportamiento no se ajusta a su caso de uso, puede utilizar un atributo de valor de cadena o valor de número en su lugar.

#### ¿Cómo pasamos un objeto o un array mediante marcado?

```html
<my-element book='{ "title": "Persuasion", "author": "Austen" }'></my-element>
```

Lo indicamos con formato JSON. 

## Métodos

### Definir métodos de un componente.

Para agregar un método de instancia a su elemento, simplemente agregue un método en el prototipo del elemento.

```javascript
Polymer({
    is: 'cat-element',
    _says: 'meow',
    speak: function() {
      console.log(this._says);
    }
});
```

Y ahora ya se puede invocar tranquilamente:

```javascript
var cat1 = document.querySelector('cat-element');
cat1.speak();
var cat2 = document.createElement('cat-element');
cat2.speak();
```

Puesto que los componentes heredan de *Polymer.Base* podemos acceder a algunas fuciones que están diponibles para el uso. Podemos ver el listado completo en la documentación (https://www.polymer-project.org/1.0/docs/api/Polymer.Base): 

Algunos destacados en la documentación:

* ```$$(selector)``` - Devuelve el primer nodo en el DOM local de este elemento que coincide con el selector.
* ```fire(type, [detail], [options])``` - Dispara un evento personalizado. El objeto _options_ puede contener las siguientes propiedades:

  1. *node*. Nodo para activar el evento (por defecto _this_).
  2. *bubbles*. Si el evento debería propagarse. Por defecto es true.
  3. *cancelable*. Si el evento se puede cancelar con preventDefault. El valor predeterminado es false.

#### Async/debounce

* *async(method, [wait])*. Llama el método asincrónicamente. Si no se especifica ningún tiempo de espera, se ejecutan tareas con temporización de microtask (después de finalizar el método actual, pero antes de procesar el siguiente evento de la cola de sucesos). Devuelve un identificador que se puede utilizar para cancelar la tarea..

* *cancelAsync(handle)*. Cancela la tarea asíncrona indicada.

* *debounce(jobName, callback, [wait])*. Llamar a *debounce* para colapsar varias solicitudes de una tarea con nombre en una invocación, que se realiza después de que ha transcurrido el tiempo de espera sin ninguna nueva solicitud. Si no se da tiempo de espera, la devolución de llamada se llama en el momento de la microtask (garantizado antes del pintado).

* *cancelDebouncer(jobName)*. Cancels an active debouncer without calling the callback.

* *flushDebouncer(jobName)*. Calls the debounced callback immediately and cancels the debouncer.

* *isDebouncerActive(jobName)*. Returns true if the named debounce task is waiting to run.

#### Manipulación de Clases y atributos

* *toggleClass(name, bool, [node])*. Alterna la clase booleana indicada en el elemento host, agregando la clase si bool es true y la elimina si bool es false. Si se especifica nodo, establece la clase en el nodo en lugar del elemento host.

* *toggleAttribute(name, bool, [node])*. Like toggleClass, but toggles the named boolean attribute.

* *attributeFollows(name, newNode, oldNode)*. Moves a boolean attribute from oldNode to newNode, unsetting the attribute (if set) on oldNode and setting it on newNode.

* *classFollows(name, newNode, oldNode)*. Moves a class from oldNode to newNode, removing the class (if present) on oldNode and adding it to newNode

#### CSS transforms

* *transform(transform, [node])*. Applies a CSS transform to the specified node, or host element if no node is specified. transform is specified as a string. For example:

  * ```this.transform('rotateX(90deg)', this.$.myDiv);```

* *translate3d(x, y, z, [node])*. Transforms the specified node, or host element if no node is specified. For example:

  * ```this.translate3d('100px', '100px', '100px');```

#### Imports and URLs

* *importHref(href, onload, onerror, optAsync)*. Dynamically imports an HTML document.
```
this.importHref('path/to/page.html', function(e) {
    // e.target.import is the import document.
}, function(e) {
    // loading error
});
```

> Note: To call importHref from outside a Polymer element, use Polymer.Base.importHref.

* *resolveUrl(url)*. Takes a URL relative to the ```<dom-module>``` of an imported Polymer element, and returns a path relative to the current document. This method can be used, for example, to refer to an asset delivered alongside an HTML import.

### Crear piezas de código reutilizables.

Behaviors

Es la forma de reutilzar piezas de código no visuales con Polymer. Son muy similares a un wecomponente Polymer, de hecho podemos definir; lifecycle callbacks, declared properties, default attributes, observers, and event listeners.

Veamos un ejemplo de un behavior:

```javascript
<script>
    HighlightBehavior = {

      properties: {
        isHighlighted: {
          type: Boolean,
          value: false,
          notify: true,
          observer: '_highlightChanged'
        }
      },

      listeners: {
        click: '_toggleHighlight'
      },

      created: function() {
        console.log('Highlighting for ', this, 'enabled!');
      },

      _toggleHighlight: function() {
        this.isHighlighted = !this.isHighlighted;
      },

      _highlightChanged: function(value) {
        this.toggleClass('highlighted', value);
      }

    };
</script>
```

#### Uso de Behaviors

Se utiliza mediante inyección de dependencias. Incluyendo el nombre de Clase en la propiedad _behaviors_ del componente.

```javascript
<link rel="import" href="highlight-behavior.html">

<script>
  Polymer({
    is: 'my-element',
    behaviors: [HighlightBehavior]
  });
</script>
```

Desde el componente podemos invocar a la funcionalidad resuelta por el Behaviors:

Nota: Polymer doesn't specify any particular method for referencing your behaviors. Behaviors created by the Polymer team are added to the Polymer object. When creating your own behaviors, you should use some other namespace to avoid collisions with future Polymer behaviors. For example:

```javascript 
window.MyBehaviors = window.MyBehaviors || {};
MyBehaviors.HighlightBehavior = { ... }
```

En el ejemplo anterior se ha añadido explicitamente al objeto global *window* de forma que desde cualquier parte con ```MyBehaviors.HighlightBehavior```.

#### Extensión de Behaviors

Para ampliar un Behavior o crear un Behavior que incluya un Behavior existente, puede definir un Behavior como una matriz de Behaviors:

```javascript
<!-- import an existing behavior -->
<link rel="import" href="oldbehavior.html">

<script>
  // Implement the extended behavior
  NewBehaviorImpl = {
    // new stuff here
  }

  // Define the behavior
  NewBehavior = [ OldBehavior, NewBehaviorImpl ]
</script>
```

Al igual que con la matriz de behaviors del elemento, el behavior más a la derecha tiene prioridad sobre los behaviors anteriores en la matriz. En este caso, cualquier cosa definida en NewBehaviorImpl tiene prioridad sobre cualquier cosa definida en OldBehavior.

#### Acciones en tiempo de Registro

En algunos casos, un behavior puede necesitar realizar alguna acción una sola vez cuando un elemento se registra. Por ejemplo, para asignar un objeto compartido accedido por todas las instancias de elemento, o para modificar el prototipo del elemento.

Por ejemplo, *iron-a11y-keys-behavior* permite que los elementos y otros comportamientos agreguen enlaces especificando un objeto *keyBindings* en el prototipo. Un solo elemento podría potencialmente tener varios objetos *keyBindings*, uno de su propio prototipo y varios heredados del behavior. El comportamiento *iron-a11y-keys* utiliza la devolución de llamada registrada para agrupar estos objetos *keyBindings* en un solo objeto en el prototipo del elemento.

El ejemplo simplificado siguiente demuestra cómo el behavior *iron-a11y-keys-behavior* agrupa objetos de comportamientos múltiples.

```javascript
registered: function() {
  // collate keyBindings objects from behaviors & element prototype
  var keyBindings = this.behaviors.map(function(behavior) {
    return behavior.keyBindings;
  });
  if (keyBindings.indexOf(this.keyBindings) === -1) {
    keyBindings.push(this.keyBindings);
  }
  // process key bindings in order
  keyBindings.forEach(function() {
    ...
  });
}
```

## Dependencias de Polymer

### Creación de un componente

Para poder crear y utilizar un componente en Polymer es necesario importar la librería de Polymer. No obstante tenemos 3 sabores de dicha librería según el grado de complejidad que vayamos a tener:

1. *polymer-micro.html*: Polymer micro features (bare-minimum Custom Element sugaring)
2. *polymer-mini.html*: Polymer mini features (template stamped into "local DOM" and tree lifecycle)
3. *polymer.html*: Polymer standard features (all other features: declarative data binding and event handlers, property nofication, computed properties, and experimental features)

La más conservadora (y la más recomendable) es *polymer.html* que incluye la librería completa.

1. Polymer micro features

  The Polymer micro layer provides bare-minimum Custom Element sugaring.

  * Custom element constructor =>	Polymer.Class({ … });
  * Custom element registration => Polymer({ is: ‘...’, … }};
  * Custom constructor support => constructor: function()
  * Basic lifecycle callbacks	=> created, attached, detached, attributeChanged
  * Native HTML element extension	=> extends: ‘…’
  * Declared properties	=> properties:
  * Attribute deserialization to property	=> properties:
  * Static attributes on host	=> hostAttributes:
  * Behaviors	behaviors: => [ … ]

2. Polymer mini features

  The Polymer mini layer provides features related to local DOM: Template contents cloned into the custom element's local DOM, DOM APIs and tree lifecycle.

  * Template stamping into local DOM => ```<dom-module><template>...</template></dom-module>```
  * DOM distribution => ```<content>```
  * DOM API	=> Polymer.dom
  * Configuring default values => properties: ```<prop>```:
  * Bottom-up callback after configuration	=> ready: function()

3. Polymer standard features

  The Polymer standard layer adds declarative data binding, events, property notifications and utility methods.

  * Automatic node finding => ```this.$.<id>```
  * Event listener setup => listeners:
  * Annotated event listener setup => ```<element on-[event]=”function”>```
  * Property change callbacks	=> properties: ```<prop>```:
  * Annotated property binding => ```<element prop=”{{property|path}}”>```
  * Property change notification => ```properties: { <prop>:```
  * Binding to structured data => ```<element prop=”{{obj.sub.path}}”>```
  * Path change notification => ```set(<path>, <value>)```
  * Declarative attribute binding => ```<element attr$=”{{property|path}}”>```
  * Reflecting properties to attributes	properties: => ```{ <prop>:```
  * Computed properties => computed:
  * Computed bindings => ```<span>{{computeFn(dep1, dep2)}}</span>```
  * Read-only properties => ```properties: { <prop>:```
  * Utility functions => toggleClass, toggleAttribute, fire, async, …
  * Scoped styling => ```<style> in <dom-module>, Shadow-DOM styling rules (:host, ...)```
  * General polymer settings => ```<script> Polymer = { ... }; </script>```

### Ejecución de los componentes

Las tecnologias que soportan los webcomponents no está disponibles en todos los navegadores ni en todas las versiones. Por eso, para que nuestros webcomponents se ejecuten en cualquier nevegador y versión necesitemos unos polyfills que permitan la ejecución de Polymer en navegadores donde forma nativa no esté soportado Polymer.

Por eso tenemos que incluir alguno de estos dos ficheros:

*webcomponents.js*:

  * Custom Elements: allows authors to define their own custom tags (spec).
  * HTML Imports: a way to include and reuse HTML documents via other HTML documents (spec).
  * Shadow DOM: provides encapsulation by hiding DOM subtrees under shadow roots (spec).
  *This also folds in polyfills for MutationObserver and WeakMap.

*webcomponents-lite.js* (Mejor rendimiento):

Note: A lighter webcomponents-lite.js build is included with the default download package including support for just *Custom Elements* and *HTML Imports*. This is useful if you don't require Shadow DOM in your application. You can generate custom builds supporting any combination of Web Component features too.

# Lo nuevo en Polymer 2

La gran pregunta, ¿En qué estado se encuentra?.

Actualmente tenemos una preview. Según el equipo de desarrollo está "bajo activo desarrollo", algunas características pueden no estar completamente desarrolladas y las APIs pueden cambiar hasta la versión 2.0 final.

## Lo nuevo:

1. Toma las mejoras de la verión "v1" de Webcomponents. En lo relativo a lo nuevo de Custom Elements y Shadow DOM. Además de utilizar la nueva sintaxis de  ES6 aka JavaScript 2015.
2. Proveer una migración *suave* desde Polymer 1.x. Permitiendo, entre otras cosas, tener aplicaciones híbridas que contengan componentes creados con las dos versiones de Polymer. No obstante, según el equipo de desarrollo, abrá cosas que no sean compatibles y la adaptación necesitará cambios en el código.

# Lo nuevo de Shadow DOM v1.

Fuente: https://hayato.io/2016/shadowdomv1/

## Creación del Shadow root

Se crea con *attachShadow()* en vez de *createShadowRoot* y es obligatorio especificar el *modo*. *Closed* no está recomendado. 

### Antes (v0)

```javascript
let e = document.createElement('div');
let shadowRoot = e.createShadowRoot();
```

### Ahora (v1)

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
```

## Posibilidad de multiples Shadow Roots ya no es posible.

Ya no se permite tener varios shadow roots dentro de un mismo webcomponent.

### Antes (v0)

```javascript
let e = document.createElement('div');
let olderShadowRoot = e.createShadowRoot();
let youngerShadowRoot = e.createShadowRoot();
```

### Ahora (v1)

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
// let another = e.attachShadow({ mode: 'open' });  // Error.
```

## Shadow root cerrado

### Antes (v0)

El Shadow Root es abierto.

### Ahora (v1)

Podemos elegir el modo de accesibilidad del Shadow Root:

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
console.assert(e.shadowRoot == shadowRoot);  // It's okay. shadowHost.shadowRoot returns a shadow root if it is open.let e = document.createElement('div');
let shadowRoot = e.attachShadow({ mode: 'open' });
console.assert(e.shadowRoot == shadowRoot);  // It's okay. shadowHost.shadowRoot returns a shadow root if it is open. 
```

```javascript
let e = document.createElement('div');
let shadowRoot = e.attachShadow({mode: 'closed'});
console.assert(e.shadowRoot == null);  // shadowHost.shadowRoot does not return the shadow root if it is closed.
```

Shadow DOM no es un mecanismo de seguridad. No utilices Shadow DOM si quieres seguridad. Nada impide que Element.prototype.attachShadow sea manipulado.

## Elementos que pueden ser un Shadow Host

### Antes (v0)

Teoricamente cualquier elemento puede ser un Shadow Host:

```javascript
let shadowRoot1 = document.createElement('div').createShadowRoot();
let shadowRoot2 = document.createElement('input').createShadowRoot();  // Should be okay.
```

### Ahora (v1)

Solo un número limitado de elementos pueden ser Shadow Host. https://dom.spec.whatwg.org/#dom-element-attachshadow

* article
* aside 
* blockquote
* body 
* div
* footer
* h1
* h2
* h3
* h4
* h5
* h6
* header
* main
* nav
* p
* section
* span

```javascript
let shadowRoot = document.createElement('div').attachShadow({ mode: 'open' });
// document.createElement('input').attachShadow({ mode: 'open' });  // Error. `<input>` can not be a shadow host.
```

## Puntos de inserción

### Antes (v0)

Se usaba ```<content>``` 

```html
<!-- Top level HTML -->
<my-host>
  <my-child id=c1 class=foo></my-child>
  <my-child id=c2></my-child>
  <my-child id=c3></my-child>
</my-host>

<!-- <my-host>'s shadow tree -->
<div>
  <content id=i1 select=".foo"></content>
  <content id=i2 select="my-child"></content>
  <content id=i3></content>
</div>
```

### Ahora (v1)

Se ha deprecado la etiqueta ```<content>``` en favor de la etiqueta ```<slot>```.

```html
<!-- Top level HTML -->
<my-host>
  <my-child id=c1 slot=slot1></my-child>
  <my-child id=c2 slot=slot2></my-child>
  <my-child id=c3></my-child>
</my-host>

<!-- <my-host>'s shadow tree: -->
<div>
  <slot id=s1 name=slot1></slot>
  <slot id=s2 name=slot2></slot>
  <slot id=s3></slot>
</div>
```

## Eventos en reacción a cambios en el contenido

### Antes (v0)

No existian

### Ahora (v1)

Ahora se dispara el evento *slotchange* cuando se producen cambios en el DOM.

```html
<!-- Top level HTML -->
<my-host>
  <my-child id=c1 slot=s1></my-child>
</my-host>
<!-- <my-host>'s shadow tree -->
<slot id=i1 name=s1></slot>
```

```javascript
slot_i1.addEventListener('slotchange', (e) => {
    console.log('fired');
});
let c2 = document.createElement('div');
my_host.appendChild(c2);
c2.setAttribute('slot', 's1');
// slotchange event will be fired on slot, '<slot id=i1 name=s1>', at the end of a micro task.
```

## Aplicación de estilos para nodos distribuidos

### Antes (v0)
-

Era necesario el selector: *::content selector*

```html
<!-- Top level HTML -->
<my-host>
  <my-child id=c1 class=foo></my-child>
  <my-child id=c2></my-child>
  <my-child id=c3></my-child>
</my-host>
<!-- <my-host>'s shadow tree -->
<div>
  <content id=i1 select="my-child"></content>
</div>
<style>
  #i1::content .foo {
     color: red;
  }
</style>
```

*c1* se aplica el color rojo. 

### Ahora (v1)

Tenemos un nuevo selector ```::slotted (compound-selector)```.

```html
<!-- Top level HTML -->
<my-host>
  <my-child id=c1 slot=s1 class=foo></my-child>
  <my-child id=c2 slot=s1></my-child>
</my-host>
<!-- <my-host>'s shadow tree: -->
<div>
  <slot id=i1 name=s1></slot>
</div>
<style>
  #i1::slotted(.foo) {
     color: red;
  }
</style>
```

*c1* se aplica el color rojo. 

Al tratarse de un selector compuesto obligar a indicar un seudoselector o selector secundario y eso debería de ofrecer mejor rendimiento.

## Funciones renombradas

v0 | v1 |
--- | --- |
insertionPoint.getDistributedNodes() | slot.assignedNodes({flatten: true}) |
No equivalence | slot.assignedNodes() |
Element.getDestinationInsertionPoints() | Element.assignedSlot (The meaning is slightly different. It returns only the directly assigned slot.) |

## La MEGA pregunta.

En que estado de soporte está esto:

http://caniuse.com/#feat=shadowdomv1

# Lo nuevo de Custom Elements en v1

https://www.webreflection.co.uk/blog/2016/08/21/custom-elements-v1

Nueva llamada API para crear custom elements *customElements*.
Ya no tenemos como punto de entrada *document*. Se han creado 3 métodos para este objeto:

* customElements.define(name, Class[, options])
* customElements.whenDefined(name)
* customElements.get(name)

El segundo cambio es que los componentes se definen por clases, omitiendo completamente la definición del prototipo de estilo ES5 propuesto previamente, detallado y enrevesado.

El tercer cambio más relevante es que los métodos se nombran de manera diferente *attachedCallback* es ahora *connectedCallback*, detachedCallback es ahora disconnectedCallback,el *createCallback* es ahora el constructor.

## La MEGA pregunta.

En que estado de soporte está esto:

http://caniuse.com/#feat=custom-elementsv1