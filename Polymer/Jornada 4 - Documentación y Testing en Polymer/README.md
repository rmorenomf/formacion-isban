# Jornada 4: Documentación y Testing en Polymer.

## Plan de trabajo

Vamos a revisar lo siguiente:

1. Behaviors
2. Directiva *dom-if*
3. Shady DOM y manipulación del DOM
4. Styling
5. Documentar el código

### Crear piezas de código reutilizables.

Behaviors

Es la forma de reutilizar piezas de código no visuales con Polymer. Son muy similares a un wecomponente Polymer, de hecho podemos definir; lifecycle callbacks, declared properties, default attributes, observers, and event listeners.

Behaviors funcionan bajo el principio de mixin, los métodos y las propiedades del Behavior se funden con el componente que los inyecta.

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

Los Behaviors son globales.

Nota: Polymer doesn't specify any particular method for referencing your behaviors. Behaviors created by the Polymer team are added to the Polymer object. When creating your own behaviors, you should use some other namespace to avoid collisions with future Polymer behaviors. For example:

```javascript 
window.MyBehaviors = window.MyBehaviors || {};
MyBehaviors.HighlightBehavior = { ... }
```

```javascript
<script>
    var MyBehaviors = MyBehaviors || {};
    MyBehaviors.HighlightBehavior = {

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

      //This element is hidden "_"
      _toggleHighlight: function() {
        this.isHighlighted = !this.isHighlighted;
      },

      _highlightChanged: function(value) {
        this.toggleClass('highlighted', value);
      }

    };
</script>
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

También podemos crear behaviors con métodos abstractos:

```javascript
<script>
  dataBehavior = {
    properties: {
      data: {
        type: Array,
        value: null,
        observer: 'superDataChanged'
      }
    },
    superDataChanged: function(newValue, oldValue) {
      console.log('default stuff');
      this.abstractDataChanged(newValue, oldValue);
    },
    abstractDataChanged: function (newValue, oldValue) {
      // abstract
    }
  };
</script>
```

Su uso e implementación:

```html
<dom-module id="my-module">
  <template>
  </template>
  <script>
    Polymer({
      is: "my-module",
      behaviors: [dataBehavior],
      abstractDataChanged: function(newValue, oldValue) {
        console.log('custom stuff');
      }
    });
  </script>
</dom-module>
```

Aquí podemos ver el Polycast de Behaviors:

https://www.youtube.com/watch?v=YrlmieL3Z0k 

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

_Práctica: En nuestra tienda vamos a crear un Behavior que se encarge de reorganizar la lista de productos según se agregen_

## Directiva *dom-if*

Permite ocultar o mostrar un elemento, según el valor del traibuto *if*:

```html
<template is="dom-if" if="{{_actionIsLogin(action)}}">
  <a href="#">Forgot password?</a>
</template>

<script>
Polymer({
  ...
  _actionIsLogin: function(action) {
    return action === 'Login';
  }
  ...
});
</script>
```

Por defecto el elemento no se crea y destruye, solamente se oculta (esto es mas eficiente desde un punto de vista de rendimiento). pero podemos cambiar ese comportamiento, sencillamente incluyendo la propiedad *restamp* a true.

## Styling

Ejemplo de utilización de estilos:

```html
<dom-module id="my-element">

  <template>

    <style>
      :host {
        display: block;
        border: 1px solid red;
      }
      #child-element {
        background: yellow;
      }
      /* styling elements distributed to content (via ::content) requires */
      /* selecting the parent of the <content> element for compatibility with */
      /* shady DOM . This can be :host or a wrapper element. */
      .content-wrapper ::content > .special {
        background: orange;
      }
    </style>

    <div id="child-element">In local DOM!</div>
    <div class="content-wrapper">
        <content></content>
    </div>

  </template>

  <script>

      Polymer({
          is: 'my-element'
      });

  </script>

</dom-module>
```

NOTA: Styling elements distributed to content (via ::content) requires selecting the parent of the ```<content>``` element for compatibility with shady DOM. This can be :host or a wrapper element.

Bajo Shady DOM, la etiqueta ```<content>``` no aparece en el árbol de DOM. Los estilos se reescriben para quitar el pseudo-elemento de ::content y cualquier combinador inmediatamente a la izquierda de ::content.

Eso implica:

    * Debemos poner un selector a la izquierda de ::content

        *:host ::content div*

        se convierte en:

        *x-foo div* /* Donde x-foo es el nombre del custom element.

    * Para limitar los estilos dentro de ::content es muy recomendable usar el selector de hijos ```>```:

    ```html
        <dom-module id="my-element">

    <template>

        <style>
        .content-wrapper ::content > .special {
            background: orange;
        }
        </style>

        <div class="content-wrapper"><content></content></div>

    </template>

    </dom-module>
    ```
    
    *.content-wrapper ::content > .special* => Se convierte en: *.content-wrapper > .special*

### Custom CSS properties

CSS custom properties. Los nombres de propiedades con prefijo --, como --example-name, representan propiedades personalizadas que contienen un valor que puede ser reutilizado en todo el documento mediante la función (var ()). Las propiedades personalizadas participan en la css: cada una de ellas puede aparecer varias veces y el valor de la variable coincidirá con el valor definido en la custom properties computada por el algoritmo CSS.

```css
h1 {  
  color: var(--header-color, green);
}
```

Ejemplo:

```html
<dom-module id="my-toolbar">

  <template>

    <style>
      :host {
        padding: 4px;
        background-color: gray;
      }
      .title {
        color: var(--my-toolbar-title-color);
      }
    </style>

    <span class="title">{{title}}</span>

  </template>

  <script>
    Polymer({
      is: 'my-toolbar',
      properties: {
        title: String
      }
    });
  </script>

</dom-module>
```

Y ahora vamos a usar el componente personalizado el color:

```html
<dom-module id="my-element">

  <template>

    <style>

      /* Make all toolbar titles in this host green by default */
      :host {
        --my-toolbar-title-color: green;
      }

      /* Make only toolbars with the .warning class red */
      .warning {
        --my-toolbar-title-color: red;
      }

    </style>

    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>

    <my-toolbar class="warning" title="This one is red."></my-toolbar>

  </template>

  <script>
    Polymer({ is: 'my-element'});
  </script>

</dom-module>
```

también podemos dar un valor por defecto:

```css
color: var(--my-toolbar-title-color, blue);
```

### Custom CSS mixins

Nos permite incluir un bloque entero de estilos CSS en el componente, sin tener que especifcar cada una de las propiedades por adelantado.

```css
selector {
  --mixin-name: {
    /* rules */
  };
}
```

Ejemplo:

```html
<dom-module id="my-toolbar">

  <template>

    <style>
      :host {
        padding: 4px;
        background-color: gray;
        /* apply a mixin */
        @apply(--my-toolbar-theme);
      }
      .title {
        @apply(--my-toolbar-title-theme);
      }
    </style>

    <span class="title">{{title}}</span>

  </template>

  ...

</dom-module>
```

En uso:

```html
<dom-module id="my-element">

  <template>

    <style>
      /* Apply custom theme to toolbars */
      :host {
        --my-toolbar-theme: {
          background-color: green;
          border-radius: 4px;
          border: 1px solid gray;
        };
        --my-toolbar-title-theme: {
          color: green;
        };
      }

      /* Make only toolbars with the .warning class red and bold */
      .warning {
        --my-toolbar-title-theme: {
          color: red;
          font-weight: bold;
        };
      }
    </style>

    <my-toolbar title="This one is green."></my-toolbar>
    <my-toolbar title="This one is green too."></my-toolbar>

    <my-toolbar class="warning" title="This one is red."></my-toolbar>

  </template>

  <script>
    Polymer({ is: 'my-element'});
  </script>

</dom-module>
```

Mediante la API de Polymer podemos modificar los estilos:

```html
<dom-module id="x-custom">

  <template>

    <style>
      :host {
        --my-toolbar-color: red;
      }
    </style>

    <my-toolbar>My awesome app</my-toolbar>
    <button on-tap="changeTheme">Change theme</button>

  </template>

  <script>
    Polymer({
      is: 'x-custom',
      changeTheme: function() {
        this.customStyle['--my-toolbar-color'] = 'blue';
        this.updateStyles();
      }
    });
  </script>

</dom-module>
```

la llamada a *this.updateStyles();* es la que reevalualo los estilos.

### Estilos compartidos

Definiemos un módulo externo solo con estilos:

```html
<!-- shared-styles.html -->
<dom-module id="shared-styles">
  <template>
    <style>
      .red { color: red; }
    </style>
  </template>
</dom-module>
```

lo importamos y lo usamos usando el atributo id:

```html
<!-- import the module  -->
<link rel="import" href="../shared-styles/shared-styles.html">
<dom-module id="x-foo">
  <template>
    <!-- include the style module by name -->
    <style include="shared-styles"></style>
    <style>:host { display: block; }</style>
    Hi
  </template>
  <script>Polymer({is: 'x-foo'});</script>
</dom-module>
```

## Documentación

Hay que documentar bine el código, pero si además lo hacemos siguiendo ciertos estilos podemos usar herramientas de automatización de documentación que nos van a permitir un mejor acceso a la documentación de esos componentes, como es el caso del componente: *iron-component-page*

Para crear una documentación en un proyecto existente podemos hacer lo siguiente:

1. Agregar *iron-component-page* como dependencia:

    > bower install --save-dev PolymerElements/iron-component-page

2. Crear un index.html lo mas alto del proyecto con el siguiente contenido:

```html
<!doctype html>
<!--
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
-->
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="../../bower_components/webcomponentsjs/webcomponents-lite.js"></script>
  <link rel="import" href="../../bower_components/iron-component-page/iron-component-page.html">

</head>
<body>
  <!-- Note: if the main element for this repository doesn't
       match the folder name, add a src="&lt;main-component&gt;.html" attribute,
       where &lt;main-component&gt;.html" is a file that imports all of the
       components you want documented. -->
  <iron-component-page></iron-component-page>

</body>
</html>
```

Lo mejor es especificar lo que vamos a documentar:

1. Creamos un único fichero de imports:

```html
<!-- all-imports.html -->
<link rel="import" href="my-element-one.html">
<link rel="import" href="my-element-two.html">
```

2. Editamos nuestro fichero *index.html*
3. Agregamos el atributo *src* con el path a nuestro fichero de multiples importaciones.

```html
<iron-component-page src="all-imports.html"></iron-component-page> 
```

https://www.polymer-project.org/1.0/docs/tools/documentation

Guía de estilo de documentación:

http://polymerelements.github.io/style-guide/

Lista completa de anotaciones:

https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler