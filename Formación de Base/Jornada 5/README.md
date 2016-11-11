# Jornada 5: 

Antes de nada, he incluido el libro "JavaScript de Good Parts" en el directorio de recursos.

## Teoría web components (Template, Shadow Dom, Custom Elements e Imports).

El objetivo es formalizar los conceptos y las herramientas en lo que se asiente el concepto de Web Component.
Vamos a partir de la base mas aseptica posible, sin frameworks ni herramientas depuradas.

http://www.benfarrell.com/2015/10/26/es6-web-components-part-1-a-man-without-a-framework/

### Custom elements:

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

### Plantillas:

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
