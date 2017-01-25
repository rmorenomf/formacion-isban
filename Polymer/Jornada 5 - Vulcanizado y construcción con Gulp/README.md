# Jornada 5: Vulcanizado y construcción con Gulp.

## Plan de trabajo

* Shady DOM y manipulación del DOM
* Vamos a conocer un poco mas en detalle las herramientas de construcción de la aplicación. También vamos a ver las diferentes herramientas de optimización de cara a su despliegue en productión.
* Trabajaremos sobre nuestro proyecto de tienda para probar las diferentes opciones de construcción.
* Vamos a revisar las herramientas de testing ofrecidas por Polymer 

## Shady DOM y manipulación del DOM

El DOM que crea y maneja un elemento se llama Local DOM. Es distinto de los hijos del elemento a los que podemos referirnos como light DOM.

```html
<dom-module id="x-foo">

  <template>
    <div>I am local dom</div>
    <content></content>
  </template>

  <script>
    Polymer({
      is: 'x-foo'
    });
  </script>

</dom-module>
```

Cuando lo usamos:

```html
<x-foo>
    <div>I am light dom</div>
</x-foo>
```

Lo que se pone en la plantilla del elemento es DOM local. Lo que pones como niños a tu elemento personalizado cuando lo usas es light DOM. Por lo tanto, el DOM local es determinada por el creador del elemento, mientras que la light DOM es establecido por el usuario del elemento.

Polymer admite múltiples implementaciones DOM locales. En los navegadores compatibles con Shadow DOM, se puede utilizar Shadow DOM para crear DOM local. En otros navegadores, Polymer proporciona DOM local a través de una implementación personalizada denominada Sahdy DOM  que está inspirada en Shadow DOM.

Shadow DOM requiere que utilice la API de DOM de Polymer cuando manipule DOM de JavaScript. Esta interfaz cubre la mayoría de los métodos y propiedades DOM comunes y es compatible tanto con el Shady DOM como con el Shadow DOM nativo.

Nota: Actualmente Polymer utiliza Shady DOM de forma predeterminada en todos los navegadores. Para activar el uso de Shadow DOM, si está disponible, consulte Configuración global.

### Localización automática de elementos

Polymer crea automáticamente un mapa de nodos de instancia creados estáticamente en su DOM local, para proporcionar un acceso conveniente a los nodos utilizados con frecuencia, sin necesidad de consultarlos manualmente. Cualquier nodo especificado en la plantilla del elemento con un identificador se almacena en this.$ hash por id.

Nota: Los nodos creados de forma dinámica mediante el enlace de datos (incluidos los de las plantillas dom-repeat y dom-if) no se agregan al this.$ Hash. El hash incluye únicamente nodos DOM locales creados estáticamente (es decir, los nodos definidos en la plantilla más externa del elemento).

```html
<dom-module id="x-custom">

  <template>
    Hello World from <span id="name"></span>!
  </template>

  <script>

    Polymer({

      is: 'x-custom',

      ready: function() {
        this.$.name.textContent = this.tagName;
      }

    });

  </script>

</dom-module>
```

Para localizar nodos creados dinámicamente en el DOM local de su elemento, el método $$ proporciona una abreviatura para Polymer.dom(this.root).querySelector():

this.$$(selector)

$$ Devuelve el primer nodo en el DOM local que coincide con el selector.

### DOM API

Nota: Sobre la difrencia entre Nodo y Elemento:

* The Element Object

    The Element interface represents an object of a Document. This interface describes methods and properties common to all kinds of elements. Specific behaviors are described in interfaces which inherit from Element but add additional functionality. For example, the HTMLElement interface is the base interface for HTML elements, while the SVGElement interface is the basis for all SVG elements.

    In the HTML DOM, the Element object represents an HTML element.

    Element objects can have child nodes of type element nodes, text nodes, or comment nodes.

    A NodeList object represents a list of nodes, like an HTML element's collection of child nodes.

    Elements can also have attributes. Attributes are attribute nodes (See next chapter).

* HTML DOM Nodes

    A Node is an interface from which a number of DOM types inherit, and allows these various types to be treated (or tested) similarly.
    The following interfaces all inherit from Node its methods and properties: Document, Element, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation, Entity, EntityReference

    HTML DOM Nodes
    In the HTML DOM (Document Object Model), everything is a node:

    The document itself is a document node
    All HTML elements are element nodes
    All HTML attributes are attribute nodes
    Text inside HTML elements are text nodes
    Comments are comment nodes

Agregar y eliminar hijos:

    * Polymer.dom(parent).appendChild(node)
    * Polymer.dom(parent).insertBefore(node, beforeNode)
    * Polymer.dom(parent).removeChild(node)
    * Polymer.dom.flush()

Acceso a elementos de la jerarquía:

    * Polymer.dom(parent).childNodes
    * Polymer.dom(parent).children
    * Polymer.dom(node).parentNode
    * Polymer.dom(node).firstChild
    * Polymer.dom(node).lastChild
    * Polymer.dom(node).firstElementChild
    * Polymer.dom(node).lastElementChild
    * Polymer.dom(node).previousSibling
    * Polymer.dom(node).nextSibling
    * Polymer.dom(node).textContent
    * Polymer.dom(node).innerHTML

Query selector:

    * Polymer.dom(parent).querySelector(selector)
    * Polymer.dom(parent).querySelectorAll(selector)

Mutación de elementos:

    * Polymer.dom(node).setAttribute(attribute, value)
    * Polymer.dom(node).removeAttribute(attribute)
    * Polymer.dom(node).classList

Accediendo al DOM Local:

Cada elemento Polymer tiene una propiedad this.root que es la raíz de su árbol DOM local. Puede manipular el árbol utilizando los métodos Polymer.dom:

```javascript
// Append to local DOM
var toLocal = document.createElement('div');
Polymer.dom(this.root).appendChild(toLocal);

// Insert to the local DOM
var toInsert = document.createElement('div');
var beforeNode = Polymer.dom(this.root).childNodes[0];
Polymer.dom(this.root).insertBefore(toInsert, beforeNode);

//You can use the automatic node finding feature to locate local DOM nodes:

var item = document.createElement('li');
Polymer.dom(this.$.list).appendChild(item);

//You can also locate nodes in the local DOM using querySelector, querySelectorAll, or the $$ utility method:

var cancelButton = Polymer.dom(this.root).querySelector('#cancelButton');

// Shorthand for finding a local DOM child by selector
// (equivalent to the above):
this.$$('#cancelButton');
```
### Acceso al Light DOM

```html
<dom-module id="simple-content">
  <template>
    <content id="myContent"></content>
  </template>
  <script>
    Polymer({
      is: 'simple-content',
      ready: function() {
        var distributed = this.getContentChildren('#myContent');
        console.log(distributed.length);
      }
    });
  </script>
</dom-module>
```

### Observe added and removed children

Podemos utilizar el método observerNodes de la API de DOM para rastrear cuándo los hijos se agregan y eliminan de un elemento:

```javascript
this._observer =
    Polymer.dom(this.$.contentNode).observeNodes(function(info) {
  this.processNewNodes(info.addedNodes);
  this.processRemovedNodes(info.removedNodes);
});
```

### Bonus. Eliminar los nodos de texto vacios:

```html
<dom-module id="has-whitespace">
  <template> <div>A</div> <div>B</div> </template>
  <script>
    Polymer({
      is: 'has-whitespace',
      ready: function() {
        console.log(Polymer.dom(this.root).childNodes.length); // 5
      }
    });
  </script>
</dom-module>
```

Si inclucimos el atributo *strip-whitespace* en el template:

```html
<dom-module id="no-whitespace">
  <template strip-whitespace>
    <div>A</div>
    <div>B</div>
  </template>
  <script>
    Polymer({
      is: 'no-whitespace',
      ready: function() {
        console.log(Polymer.dom(this.root).childNodes.length); // 2
      }
    });
  </script>
</dom-module>
```

## Vulcanizado y construcción con Gulp

Vamos a revisar las herramientas que tiene Polymer para reducir el número de llamadas al servidor en busca de los recursos de aplicación, en especial los web components.

La idea es crear un único fichero donde tengamos los webcomponents creados y los descargemos de una única llamada.

Para ello vamos a hacer uso de la herremienta vulcanize:

> npm install -g vulcanize

Esta herramienta la podemos usar por línea de comandos o mediante un script gulp/grunt. 

Ahora vamos a usarla:

> vulcanize elements.html -o elements.vulcanized.html

Esto toma el elemento elements.html inspecciona todas sus dependencias y genera como salida: *elements.vulcanized.html*

La documentación del comando *vulcanize*:

```
vulcanize: Reduce an HTML file and its dependent HTML Imports into one file

Usage:
  vulcanize <html file>

Options:
  -h|--help: print this message
  -v|--version: print version number
  -p <arg>|--abspath <arg>: use <arg> as the "webserver root", make all adjusted urls absolute
  --inline-scripts: Inline external scripts
  --inline-css: Inline external stylesheets
  --add-import <path>: Add this import to the target HTML before vulcanizing. Can be used multiple times.
  --exclude <path>: exclude a subpath from root. Use multiple times to exclude multiple paths. Tags to excluded paths are kept.
  --strip-exclude: Exclude a subpath and strip the link that includes it.
  --strip-comments: Strips all HTML comments not containing an @license from the document
  --redirect <uri>|<path>: Takes an argument in the form of URI|PATH where url is a URI composed of a protocol, hostname, and path and PATH is a local filesystem path to replace the matched URI part with. Multiple redirects may be specified; the earliest ones have the highest priority.
  --no-implicit-strip: DANGEROUS! Avoid stripping imports of the transitive dependencies of imports specified with `--exclude`. May result in duplicate javascript inlining.
  --out-html <path>: If specified, output will be written to <path> instead of stdout.
```

La estretegía de generar un único gran fichero con todos los componentes de nuestra apliación no siempre es buena, ya que sie l tamaño es muy grande el tiempo de carga puede ser muy grande. Por eso es mejor crear bundles o trozos mas pequeños que se cargen de forma dinámica.

### También podemos usarlo desde gulp y grunt:

Instalamos el módulo:

> npm install --save-dev gulp gulp-vulcanize

Creamos una tarea en el *gulpfile*:

```javascript
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');

gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(vulcanize())
    .pipe(gulp.dest('dist/elements'));
});

gulp.task('default', ['vulcanize']);
```

Afinamos los parémetros de entrada:

```javascript
gulp.task('vulcanize', function() {
  return gulp.src('app/elements/elements.html')
    .pipe(vulcanize({
      stripComments: true,
      inlineScripts: true,
      inlineCss: true
    }))
    .pipe(gulp.dest('dist/elements'));
});
```



## Cómo lo hace el Starter Kit

El Starter Kit hace las cosas de una forma mas completa, automatizando ya las tareas. Veamos lo que monta para generar los proyecto de la forma mas optima.




