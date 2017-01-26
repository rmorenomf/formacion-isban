#Jornada 6: Creando una aplicación con el patrón PRPL.

## Plan de trabajo

* Vamos a identificar el patrón PRPL para la construcción de nuestra aplicación. Este patrón mejora la percepción de velocidad de la * aplicación.
* Vamos a hacer un repaso general a todo lo aprendido en el curso.
*Vamos a cerrar la funcionalidad de la tienda que hemos comenzado.

## Patrón PRPL

https://www.polymer-project.org/1.0/toolbox/server

Puedemos publicar una aplicación App Toolbox utilizando la tecnología de servidor que quereamos. El proceso de generación con el  CLI de Polymer admite aplicaciones de carga rápida que pueden aprovechar las últimas tecnologías web al producir dos construcciones.

* Una construcción desagregada (unbundled) diseñada para combinaciones de servidor/browser compatibles con HTTP/2 y HTTP/2 server Push para entregar los recursos que el navegador necesita para un primer rendereizado rápida y optimizar el almacenamiento en caché.
* Una construcción agrupada diseñada para minimizar el número de peticiones requeridos para que la aplicación se ejecute en combinaciones de servidor/browser que no admiten el PUSH del servidor.

La lógica de servidor proporcionar la cosntrucción adecuada para cada navegador.

Para optimizar la entrega, ToolBox de Polymer utiliza el patrón PRPL, que significa:

* Push critical resources for the initial route.
* Render initial route.
* Pre-cache remaining routes.
* Lazy-load and create remaining routes on demand.

### Estructura de nuestra aplicación:

Actualmente, Polymer CLI y el servidor de referencia soportan una aplicación de una sola página (SPA) con la siguiente estructura:

* El punto de entrada principal de la aplicación que se sirve desde cada ruta válida. Este archivo debe ser muy pequeño, ya que será servido desde diferentes URL, por lo tanto, se almacenan en caché varias veces. Todas las URL de recursos en el punto de entrada deben ser absolutas, ya que pueden publicarse desde URLs que no son de nivel superior.
* El shell o app-shell, que incluye la lógica de la aplicación de nivel superior, el enrutador, etc.
* Fragmentos de carga Lazy de la aplicación. Un fragmento puede representar el código de una vista en particular, u otro código que se puede cargar de forma Lazy (por ejemplo, partes de la aplicación principal no son necesarias para la primera pintura, como menús que no se muestran hasta que un usuario interactúa con la aplicación). El shell es responsable de importar dinámicamente los fragmentos según sea necesario.

El siguiente diagrama muestra los componentes de una aplicación sencilla:

![alt text](./resources/app-build-components.png "Estructura de aplicación")

#### App entrypoint

El punto de entrada debe importar e instanciar el shell, así como condicionalmente cargar cualquier polyfill requerido.

Las principales consideraciones para el punto de entrada son:

* Tiene un mínimo de dependencias estáticas, no mucho más allá de la app-shell en sí.
* Cargas condicionales requeridas polyfills.
* Utiliza rutas absolutas para todas las dependencias.

#### App shell

El shell es responsable del enrutamiento y normalmente incluye la interfaz de usuario principal de navegación de la aplicación.

La aplicación debe llamar a *importHref* a fragmentos de carga Lazy, ya que son necesarios. Por ejemplo, cuando el usuario cambia a una nueva ruta, importa los fragmentos asociados con esa ruta. Esto puede iniciar una nueva solicitud al servidor, o simplemente cargar el recurso desde la caché.

```javascript
ImportHref ('list-view.html');
```

El shell (incluyendo sus dependencias estáticas) debe contener todo lo necesario para el primer renderizado.

### Bundled build

Para los navegadores que no manejan HTTP2 Push, el proceso de compilación produce un conjunto de paquetes vulcanizados: un paquete para el shell y un paquete para cada fragmento. El siguiente diagrama muestra cómo se empaquetaría una aplicación sencilla:

![alt text](./resources/app-build-bundles.png "Estructura de aplicación")

Cualquier dependencia compartida por dos o más fragmentos se incluye con el shell y sus dependencias estáticas.

Cada fragmento y sus dependencias estáticas no compartidas se agrupan en un solo paquete. El servidor debe devolver la versión apropiada del fragmento (agrupado o desagregado), dependiendo del navegador. Esto significa que el código de la shell puede perezosamente cargar detail-view.html sin tener que saber si está incluido o desagregado. Se basa en el servidor y el navegador para cargar las dependencias de la manera más eficiente.

HTTP / 2 permite descargas multiplexadas a través de una única conexión, de manera que se pueden descargar más pequeños archivos de forma más eficiente.

El empuje de servidor HTTP / 2 permite al servidor enviar recursos de forma preventiva al navegador.

Para ver un ejemplo de cómo el servidor HTTP / 2 acelera las descargas, considere cómo el navegador recupera un archivo HTML con una hoja de estilo vinculada.

En HTTP / 1:

* El navegador solicita el archivo HTML.
* El servidor devuelve el archivo HTML y el explorador comienza a analizarlo.
* El navegador encuentra la etiqueta <link rel = "stylesheet"> e inicia una nueva solicitud para la hoja de estilo.
* El navegador recibe la hoja de estilo.

Con HTTP / 2 push:

*El navegador solicita el archivo HTML.
*El servidor devuelve el archivo HTML y empuja la hoja de estilos al mismo tiempo.
*El explorador comienza a analizar el HTML. En el momento en que se encuentra con la <link rel = "stylesheet">, la hoja de estilo ya está en la caché.
*En este caso más simple, el empuje de servidor HTTP / 2 elimina una única petición-respuesta HTTP.

Con HTTP / 1, los desarrolladores unen recursos juntos para reducir el número de solicitudes HTTP requeridas para procesar una página. Sin embargo, el agrupamiento puede reducir la eficacia de la caché del navegador. Si los recursos de cada página se combinan en un solo paquete, cada página obtiene su propio paquete y el navegador no puede identificar recursos compartidos.

# Lo nuevo en Polymer 2

La gran pregunta, ¿En qué estado se encuentra?.

Actualmente tenemos una preview. Según el equipo de desarrollo está "bajo activo desarrollo", algunas características pueden no estar completamente desarrolladas y las APIs pueden cambiar hasta la versión 2.0 final.

## Lo nuevo:

1. Toma las mejoras de la verión "v1" de Webcomponents. En lo relativo a lo nuevo de Custom Elements y Shadow DOM. Además de utilizar la nueva sintaxis de  ES6 aka JavaScript 2015.
2. Proveer una migración *suave* desde Polymer 1.x. Permitiendo, entre otras cosas, tener aplicaciones híbridas que contengan componentes creados con las dos versiones de Polymer. No obstante, según el equipo de desarrollo, habrá cosas que no sean compatibles y la adaptación necesitará cambios en el código.

### Extendiendo elementos nativos HTML cambios en la versión 2 de Polymer

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

NOTA: En la preview de la versión 2 se prescinde de este formula:

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
