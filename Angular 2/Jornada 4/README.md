# Jornada 4

Angular 2: Templates, Databinding, Directivas, Pipes (solo introducción).

## Plan de trabajo

Vamos a revisar los conceptos de inyección de dependencias en especial vamos a ver ejemplos de su comportamiento entre módulos.
También vamos a profundizar en los siguientes conceptos:

* Templates
* Directivas
* Observables
* Pipes

## Templates

El lenguaje de templating de Angular 2 es HTML, todas las etiquetas HTML son válidas excepto ```<script>``` esta estiqueta está prohibida por motivos de seguridad para evitar ataques de inyección de Script.  

Además de los elementos propios de HTML podemos enriquecer el vocabulario de nuestros templayes con otros lementos como componentes, directivas y pipes. Además podemos cambiar valores del DOM dinámicamente mediante databinding.

La primera forma de databinding es la interpolación:
```HTML 
<p>My current hero is {{currentHero.firstName}}</p>
```
 Usamos la interpolación para incluir strings calculados dentro de nuestro template.

 En realidad lo que metemos entre {{ }} es una *template expression* que primeramente evalua Angular y después es convertida a un String.

 ```HTML
 <!-- "The sum of 1 + 1 is 2" -->
<p>The sum of 1 + 1 is {{1 + 1}}</p>
 ```

La expresión puede invocar a métodos del componente anfitrión. 

```HTML
<!-- "The sum of 1 + 1 is not 4" -->
<p>The sum of 1 + 1 is not {{1 + 1 + getVal()}}</p>
```

### Template expressions

A template expression produces a value. Angular executes the expression and assigns it to a property of a binding target; the target might be an HTML element, a component, or a directive.

Las expresiones pueden parecer instrucciones de JavaScript pero no lo todas. Alguas expresiones están prohibidas:

* assignments (=, +=, -=, ...)
* new 
* chaining expressions with ; or ,
* increment and decrement operators (++ and --)
* no support for the bitwise operators | and &
* new template expression operators, such as | and ?.

### Contexto de un expression

Las expresiones no pueden hacer referencia a nada global, como *window* o *document*. No pueden llamar a *console.log* o *Math.max*. Está limitadas a los miembros del contexto de la expresión y eso suele ser la *instancia del componente*.

"When we see title wrapped in double-curly braces, {{title}}, we know that title is a property of the data-bound component. When we see isUnchanged in [disabled]="isUnchanged", we know we are referring to that component's isUnchanged property."

### Buenas prácticas con Template Expressions

1. NO VISIBLE SIDE EFFECTS: Nunca una expresión debe cambiar un estado o valor de la aplicación.
2. QUICK EXECUTION: Las expresiones no deben consumir demasiado tiempo.
3. SIMPLICITY: No deben de ser complejas. Deberían de portar la lógica al componente cuando esta no sea trivial.

## Databinding

Uno de los principales valores de Angular es que nos abstrae de la lógica pull/push asociada a insertar y actualizar valores en el HTML y convertir las respuestas de usuario (inputs, clicks, etc) en acciones concretas

Angular 2 dispone de 4 formas de data binding:

```HTML
<div>{{todo.subject}}</div>
<todo-detail [todo]="selectedTodo"></todo-detail>
<div (click)="selectTodo(todo)"></div>
```

* Interpolación: (Hacia el DOM) Al hacer {{todo.subject}}, Angular se encarga de insertar el valor de esa propiedad del componente entre las etiquetas ```<div>``` donde lo hemos definido. Es decir, evalúa todo.subject e introduce su resultado en el DOM.

* Property binding: (Hacia el DOM) Al hacer [todo]="selectedTodo", Angular está pasando el objeto *selectedTodo* del Componente padre a la propiedad *todo* del Componente hijo.

* Event binding: (Desde el DOM) Al hacer (click)="selectTodo(todo)", le indicamos a Angular que cuando se produzca un evento click sobre esa etiqueta ```<div>```, llame al método selectTodo del Componente, pasando como atributo el objeto todo presente en ese contexto.

* Two-way binding: (Desde/Hacia el DOM) Un caso importante que no hemos visto con los ejemplos anteriores es el binding bi-direccional, que combina event binding y property binding, como podemos ver en el siguiente ejemplo:

```html
<input [(ngModel)]="todo.subject">
```

Eso es equivalente a:

```html
<input [value]="todo.subject" (input)="todo.subject = $event.target.value">
```

En este caso, el valor de la propiedad fluye a la caja de input como en el caso property binding, pero los cambios del usuario también fluyen de vuelta al componente, actualizando el valor de dicha propiedad.

Angular mapea los eventos típicos de cualquier elemento del DOM para que los podamos utilizar como event binding.

Otro de los elementos que podemos utilzar dentro de los templates son las Directivas.

## Directivas

