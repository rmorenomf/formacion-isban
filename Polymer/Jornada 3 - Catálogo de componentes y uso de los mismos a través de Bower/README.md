# Jornada 3: Catálogo de componentes y uso de los mismos a través de Bower.

## Plan de trabajo

En esta jornada vamos a volver a algunos conceptos importantes de Polymer, como es el Data Binding con son los objetos complejos.
En esta jornada vamos a revisar la libreria de componentes de Polymer. 

https://elements.polymer-project.org/

y una versión de componentes en Beta:

https://beta.webcomponents.org/

También vamos a hablar de los settings globales. 

## Propiedades a fondo

*Ver el apartado sobre propiedades de la Jornada 1.*

## Observers y computed properties

TODO

## Binding de Arrays y Objects

Por motivos de rendimiento el sistema de propiedades y de data binding de Polymer tiene algunas limitaciones para detectar los cambios que se producen en los objetos complejos y los de tipo Array.

### Para el caso de objetos:

Si queremos que los cambios que realizamos sean observables, tenemos que modificar esos datos de la siguiente forma:

```javascript
// clear an array
this.set('group.members', []);
// set a subproperty
this.set('profile.name', 'Alex');
```

Esto solo notifica si el valor es cambiado:

```javascript
// DOES NOT WORK—use notifyPath instead
this.profile.name = Alex;
this.set('profile', this.profile);

// DOES NOT WORK—use notifySplices instead
this.users.push({name: 'Grace'});
this.set('users', this.users);
```

Si lo que queremos es notificar un cambio, independientemente de si el valor efectivamente ha cambiado, tendremos que llamar a *this.notifyPath*:

```javascript
this.profile.name = Alex;
this.notifyPath('profile.name');
```

### Para el caso de los Arrays

Si queremos que los cambios sean observables tenemos que tener en cuenta que necesitaremos usar las primitivas de Polymer para poder hacer cambios que sean observables:

* push(path, item1, [..., itemN])
* pop(path)
* unshift(path, item1, [..., itemN])
* shift(path)
* splice(path, index, removeCount, [item1, ..., itemN])

```html
<dom-module id="custom-element">
  <template>
    <template is="dom-repeat" items="[[users]]">{{item}}</template>
  </template>

  <script>
    Polymer({

      is: 'custom-element',

      addUser: function(user) {
        this.push('users', user);
      },

      removeUser: function(user) {
        var index = this.users.indexOf(user);
        this.splice('users', index, 1);
      }

    });
  </script>
</dom-module>
```

Tenemos que tener en cuenta que los Arrays de datos primitivos no son compatibles. Esto se debe a que las primitivas (como el número, la cadena y los valores booleanos) con el mismo valor están representadas por el mismo objeto. Considere una serie de números:

```javascript
this.numbers = [1, 1, 2];
```

El sistema de datos no puede controlar cambios en esta propiedad del Array, ya que los dos primeros elementos no son únicos.

Puede trabajar en torno a estas restricciones mediante la envoltura de primitivas en objetos para garantizar la singularidad:

```javascript
this.numbers = [{value: 1}, {value: 1}, {value: 3}];
```

## La ayuda

El catálogo está organizado por funcionalidad en 8 elementos:

1. *App*: Elementos de aplicación.
2. *Iron*: Elementos Core de Polymer.
3. *Paper*: Elementos y componentes Material Design.
4. *Google Web Components*: Componentes de las APIs de Google y de sus servicios.
5. *Gold*: Elementos para eCommerce.
6. *Neon*: Animaciones y efectos.
7. *Platinium*: Soporte para navegación offline.
8. *Molecules*: Wrappers para librerias de terceros.

_Echamos un vistazo por la documentación_

Vamos a revisar en funcionamiento algunas importantes:

* app-drawer-layout
* iron-pages
* app-route
* paper-button
* iron-ajax

¿Cuál es la mejor forma de mostrar el uso del catálogo?. No tiene sentido repasar entrada por entrada. Creo que lo mejor es echar un vistazo detallado a las diferentes partes del catálogo y luego usar poner en práctica los aprendido metiendo caña a nuestra aplicación de ejemplo.

> Recordad que Github es tu amigo, que muchos de los componentes no son complejos y que la mejor guía de uso es el código fuente.

## Settings globales

https://www.polymer-project.org/1.0/docs/devguide/settings
