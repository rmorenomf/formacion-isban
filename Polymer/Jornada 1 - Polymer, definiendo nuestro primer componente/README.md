# Jornada 1: Polymer, definiendo nuestro primer componente.

El objetivo de esta jornada es dar una visión global de Polymer.

## Revisión a los objetivos de la formación.

1. Jornada 1: Polymer, definiendo nuestro primer componente.
2. Jornada 2: Directivas estructurales en polymer y comunicación entre componentes.
3. Jornada 3: Catálogo de componentes y uso de los mismos a través de Bower.
4. Jornada 4: Creando una aplicación con el patrón PRPL.
5. Jornada 5: Documentación y Testing en Polymer.
6. Jornada 6: Vulcanizado y construcción con Gulp.

Tenemos mucho tiempo y el contenido no creo que dé para tanto así que lo vamos a tomar como un workshop. En el que vamos a empezar una aplicación y vamos a estructurar la formación como un Workshop.

Vamos a montar una tienda online super sencilla. Pero vamos a partir del Starter Kit y vamos a crear y modificar las secciones que mas nos interesen.

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

2. Antes de usarlo tenemos que reguistarlo:

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

Permiten 

https://html.spec.whatwg.org/multipage/scripting.html#the-template-element

#### HTML Imports:

http://w3c.github.io/webcomponents/spec/imports/

http://blog.teamtreehouse.com/introduction-html-imports

### Shadow DOM:

http://w3c.github.io/webcomponents/spec/shadow/

Los navegadores ya lo usan:

1. Activar "Show user agent shadow DOM" de las herramientas de desarrollo de Chrome (Si no lo tenemos ya). 

Buscar una etiqueta de vídeo 

#### ¿Qué es Shadow DOM?

Shadow DOM se refiere a la habilidad del navegador de incluir un subárbol de elementos (DOM) en un documento (DOM), pero a la vez sin incluirlo en el árbol DOM del documento.

En otras palabras: el Shadow DOM es un DOM encapsulado que vive dentro del DOM principal. 

https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom

_Tiempo de práctica_

No olvidar comentar los selectores propios de Shadow DOM: 

* :host
* :host-context
* CSS custom properties. 

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

## Estructura de un componente Polymer (v0)

Esto va a cambiar con la versión v1 de Shadow Dom y Custom elements y ES6.

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

Si comparamos este ejemplo con la forma de crear y registrar un web component con los ejemplos "a pelo" o "vanilla" que hemos visto antes podemos ver cosas similares y otras diferentes. 

En primer lugar vemos que la llamada a ```Polymer({...})``` se en carga de la tarea mecánica de crear el ElementHTML, sobreescribir los métodos y registrar el componente entre otras cosas. Además hace que todo esto sea independiente del navegador en el que estemos mediante el uso de Pollyfills.

Otra de las cosas que nos "endulza" Polymer es extender de un elemento HTML nativo. 

### Extendiendo elementos nativos HTML

De hecho, en la versión de Polymer 1.x, sólo podemos extender componentes nativos; *input*, *button*, etc. Pero no de otros Custom elements.

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

Esto sirve de poco por eso vamos a agregar mas cosas a nuestro componente:

1. Un constructor a medida.
2. Personalizar las acciones del ciclo de vida.
3. Definir atributos o propiedades de un componente.
4. Crear piezas de código reutilizables.

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

Two notes about the custom constructor:

* The factoryImpl method is only invoked when you create an element using the constructor. The factoryImpl method is not called if the element is created from markup by the HTML parser, or if the element is created using document.createElement.

* The factoryImpl method is called after the element is initialized (local DOM created, default values set, and so on). See Ready callback and element initialization for more information.

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

El prototipo de Base de Polymer implementa callbacks del ciclo de vida del custom element para realizar tareas necesarias para las funciones integradas de Polymer. Polymer, a su vez, llama a métodos de ciclo de vida en su prototipo.

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

### Definir atributos o propiedades de un componente.

TODO

### Crear piezas de código reutilizables.

TODO

## Dendencias

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

Las tecnologias que soportan los webcomponents no está disponibles en todos los nevegadores ni en todas las versiones. Por eso, para que nuestros webcomponts se ejecuten en cualquier nevegador y versión. necesitemos unos polyfills que permitan la ejecución de Polymer en navegadores donde forma nativa no esté soportado Polymer.

Por eso tenemos que incluir alguno de estos dos ficheros:

*webcomponents.js*:

  * Custom Elements: allows authors to define their own custom tags (spec).
  * HTML Imports: a way to include and reuse HTML documents via other HTML documents (spec).
  * Shadow DOM: provides encapsulation by hiding DOM subtrees under shadow roots (spec).
  *This also folds in polyfills for MutationObserver and WeakMap.

*webcomponents-lite.js*:

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

## Re-distribution: Directly (v0) vs Indirectly by flattening (v1)

TODO

## Fallback contents 

TODO

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

## Una nueva utilidad para el nodo

TODO

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

The second change is that components are defined by classes, skipping completely the previously proposed, verbose, and convoluted, ES5 style prototype definition.

The third most relevant change is that methods are named differently so that attachedCallback is now called connectedCallback, detachedCallback is now disconnectedCallback, the createdCallback is now the constructor, and finally the attributeChangedCallback triggers only if an attribute has been defined through a public static observedAttributes array of attributes to watch, as opposite of any attribute, like it was previously for v0.

## La MEGA pregunta.

En que estado de soporte está esto:

http://caniuse.com/#feat=custom-elementsv1

# Creación de un componente complejo.

Vamos a crear un componente que 