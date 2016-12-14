# Jornada 9 - Trabajando con Webcomponents en Angular 2

## Plan de trabajo

El objetivo es entender los mecanismos de integración y de interacción entre Angular 2 y los Webcomponents generados con Polymer.

Repaso rápido a Webcomponents:

## Teoría web components (Template, Shadow Dom, Custom Elements e Imports).

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
  this.textContent = "I'm a cool button!";
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

## Vamos a darle caña a Polymer:

Vamos a crear un componente de ejemplo para integrarlo en nuestra apliación de ejemplo.

> Creamos una carpeta para nuestro proyecto y entramos en ella
> Inicializamod bower
> bower init
> bower install --save Polymer/polymer
> Creamos una carpeta *elements* donde vamos a meter los elementos que vayamos generando.

Vamos a crear uno muy sencillo:

```javascript
<link rel="import" href="../../bower_components/polymer/polymer.html">

<dom-module id="saludo-polymer">
  <template>
    <style>
    h1{
      color: blue;
    }
    </style>
    <h1>Bienvenido <content></content></h1>
  </template>
  <script>
    Polymer({
      is: "saludo-polymer"
    });
  </script>
</dom-module>
```

Vamos a añadirle algo de comportamiento. Recordad la naturaleza última de los webcomponents, que en realidad están pasando varias cosas:

1. Estamos usando el mecanimos de módulos ... de JavaScript/HTML.
2. Estamos usando los templates ... de JavaScript/HTML.
3. Estamos usando el Shadowdom ... de JavaScript/HTML.
4. Estamos usando custom elements  ... de JavaScript/HTML. Que son objetos del DOM como puede ser un DIV o un BUTTON.
5. Estamos usando Polymer que lo "único" que hace es endulzar muchas de las cosas que haríamos a mano. Bueno, también hace que esto funcione en cualquier navegador no solo en Chrome y en Opera. Pero que todo se traduce en HTML y JavaScript. 

Como podemos ver se trata de puro HTML y puro JavaScript, así que vamos a utilizar las herramientas nativas para interactuar con los web components. 

(Propiedades) Angular 2 => Polymer web component
Polymer web component => Angular 2 (Eventos JavaScript)

Por eso vamos a echar un vistazo a las propiedades y a los eventos del DOM:

#### Eventos con Vanilla JavaScript

> Tip: The event model was standardized by the W3C in DOM Level 2 (Actualmente vamos por la DOM Level 4).

Podemos distinguir entre eventos del DOM o eventos que incorporan los objetos DOM simplemente por ser HTMLElement y los custom events, o eventos que podemos definir, asignar y lanzar a nuestro antojo.

Un repaso rápido a los eventos Nativos del DOM:

```javascript
<h1 id="elementId" onclick="alert('Ooops!');">Click on this text!</h1>
document.getElementById('elementId').onclick = function(evt){ console.log('Clicked'); };
document.getElementById('elementId').click(); //This trigger a click event.
```

Vamos a centrarnos en los segundos, en los eventos que podemos crear "customizados" y que nos van a permitir enriquecer el funcionamiento de nuestros componentes.

Muy recomendable este artículo: http://blog.garstasio.com/you-dont-need-jquery/events/

No tenemos que inventar nada ni usar pollyfills ni implantar ningún patrón, solo usar las herramientas nativas.

Creación de un custom event:

```javascript
var event = document.createEvent('Event');
event.initEvent('my-custom-event', true, true); //can bubble, and is cancellable
someElement.dispatchEvent(event);

// O una forma un poco mas moderna, cuando esta soportado.

var event = new CustomEvent('my-custom-event', {bubbles: true, cancelable: true});
someElement.dispatchEvent(event);
```

Escuchando un determinado evento:

```javascript
someElement.addEventListener('my-custom-event', function(evt) {
    // TODO event handler logic
});
```

Desligado de un evento:

```javascript
someElement.removeEventListener('my-custom-event', myEventHandler);
```

También podemos modificar el comportamiento de los eventos:

```javascript
someEl.addEventListener('my-custom-event', function(event) {
    event.stopPropagation(); //Evita que este evento se dispare en otros ancestros.
});

someEl.addEventListener('my-custom-event', function(event) {
    event.stopImmediatePropagation(); //Evita que otros listeners que están escuchando este evento se disparen.
});

someAnchor.addEventListener('my-custom-event', function(event) {
    event.preventDefault(); //No ejecutes la acción nativa. Ejemplo: click de un link. 
});
```

Pero vamos a hacer las cosas al estilo de Polymer, así que almenos en el lado del componente Polymer vamos a tener que incluir algo del "azucar" de Polymer.

Ejemplo de custom events en Polymer:

https://www.polymer-project.org/1.0/docs/devguide/events

```javascript
<dom-module id="x-custom">
  <template>
    <button on-click="handleClick">Kick Me</button>
  </template>

  <script>
    Polymer({

      is: 'x-custom',

      handleClick: function(e, detail) {
        this.fire('kick', {kicked: true});
      }

    });

  </script>

</dom-module>
<x-custom></x-custom>

<script>
    document.querySelector('x-custom').addEventListener('kick', function (e) {
        console.log(e.detail.kicked); // true
    })
</script>
```

Como vemos podemos crear nuestros custom events y usarlos desde cualquier sitio, porque se tratan de eventos del DOM. 

#### Propiedades con Angular 2 y Polymer.

Vamos a hacer primero un ejemplo en el que vamos a cambiar el saludo desde un componente Angular 2.

### Vaadin y sus complementos para facilitar la integración con Angular 2.

Vamos a echarle un vistazo a lo que ofrecen:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PolymerElement } from '@vaadin/angular2-polymer';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    PolymerElement('paper-input'),
    PolymerElement('vaadin-combo-box')
  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

@Component({
  selector: 'app-component',
  template: `
    <paper-input [(value)]="myValue"></paper-input>
    <vaadin-combo-box [(value)]="myValue" [items]="myItems"></vaadin-combo-box>
  `
})
class AppComponent {
  myValue = 'A';
  myItems = ['A', 'B', 'C'];
}
```

Como vemos, podemos importar el módulo usasndo los mecanimos de importación de módulos de TypeScript. También nos "endulza" la comunicación entre el componente Polymer y el componente Angular 2, ya que podemos utilizar el databinding. 

#### Conclusiones:

No son necesarios los componentes de Vaadin para realizar la integración, nos facilitan la vida, pero no hacen nada que no podamos hacer de otra forma.

## Conclusione sobre el uso de Polymer con Angular 2.

Las noticias no son buenas para la integración de estos dos frameworks. Hay mas razones en contra que a favor de integrar estas dos herramientas.

### Inmadurez de Angular 2

Angular 2 a pesar de estar en una versión “production ready” (2.3.0 al momento de escribir este documento) presenta claros síntomas de inmadurez. Estos síntomas se reflejan en cuanto a una clara falta de consenso en cuanto a las herramientas y los procesos de construcción (Angular Cli - Webpack - Gulp), problemas de compatibilidad y sintaxis entre versiones muy próximas unas de otras, y a su vez entre las propias herramientas del entorno en algunos casos (Módulos LazyLoad con AoT como un buen ejemplo). 

Esta falta de estabilidad de por si conlleva asumir un riesgo bastante en cuanto a la adopción del framework. Si sumamos añadirle la problemática propia de otro framework como Polymer (justo en medio de un cambio a una 2.0) y tener que tratar ambos al mismo tiempo, con este precedente suena inasumible para un entorno productivo.

### Imposibilidad de usar angular universal y server side rendering

Una de las grandes virtudes que ofrece Angular 2 es su cualidad isomórfica (posibilidad de ejecutarse tanto en el server side como en el browser side). Derivada de ello encontramos el server side rendering como una de las funcionalidades que ofrecen sensibles mejoras en el rendimiento. Hasta el momento son funcionalidades que Polymer no ofrece con lo cual si implementamos ambos frameworks de manera conjunta habría que prescindir de ambas cualidades.

### Imposibilidad de usar AoT
	
AoT es otra de las funcionalidades que ofrecen una mejora sensible en el rendimiento de la aplicación. Hasta ahora no existe compatibilidad del Ahead Of Time con los Web Components que son la base sobre la que se posiciona Polymer, con lo cual estaríamos obligados a utilizar exclusivamente el Just In Time en Angular 2 reduciendo notablemente el rendimiento de la aplicación.

### Complejidad añadida de usar dos frameworks

Independientemente del los puntos de rendimiento mencionados anteriormente Angular 2 y Polymer son dos conceptos totalmente diferentes, con lo cual, el tiempo de formación de estas dos tecnologías 
	
### Pruebas unitarias y funcionales más complejas
	
Polymer debe de utilizar WCT para pruebas unitarias. Una mezcla de Mocha, Chai, Sinon y Selenium. Con lo que limita las posibilidades de elección para Angular 2 o la desventaja de utilizar una librería adicional para el test unitario.

### Impacto en el rendimiento
	
La posibilidad de usar web components hoy en día en otros navegadores que no sean Chrome, es con el uso de Polyfills, los cuales reducen el rendimiento de la aplicación.

### Diferenciación de las tareas de construcción

Angular 2 está pensado para trabajar con “Modules Blunder”, como SystemJS, que viene por defecto, o WebPack. Sin embargo Polymer está pensado para trabajar con gestores de tareas como Gulp o Grunt. 
Si bien, muchos de estos procesos de construcción, en Angular 2, podrían desarrollarse con gestores de tareas, en Polymer no existe compatibilidad aun con Modules Blunder.

Limitaciones añadidas de retrocompatibilidad en las versiones de navegador.