# Jornada 6

## Plan de trabajo

El objetivo de esta jornada es repasar los contenidos teóricos de: 

* Forms. 
* Estrategias de detección de cambios y zonas.

Además de continuar con el proyecto práctico de Blogging iniciado en la jornada anterior. Para ello se utilizarán los conceptos aprendidos hasta ahora.

## Forms

Vamos a ver alguna técnicas y herramientas que incluye Angular 2 para facilitar la creación y la validación de formularios de entrada de datos.

Partiremos del siguiente formulario HTML:

```html
<div>
    <h1>Hero Form</h1>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" required>
      </div>
      <div>
        <label for="alterEgo">Alter Ego</label>
        <input type="text" id="alterEgo">
      </div>
      <button type="submit">Submit</button>
    </form>
</div>
```

Solo un detalle, estamos usando ciertos atributos de validación de datos propios de HTML5. Cuidado porque, por ejemplo, IE9 que está soportado por Angular 2, no soporta ese atributo. Así si queremos dar soporte a ese navegador tendríamos que utilizar otro mecanismo de validación de datos.

Vamos añadir algo de dinamismo con algo de template syntax de angular 2:

 ```html
 <!-- hero-form.component.html -->
<div>
    <h1>Hero Form</h1>
    <form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" required>
      </div>
      <div>
        <label for="alterEgo">Alter Ego</label>
        <input type="text" id="alterEgo">
      </div>

	  <div>
		<label for="power">Hero Power</label>
		<select id="power" required>
			<option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
		</select>
	  </div>

      <button type="submit">Submit</button>
    </form>
</div>
```

También vamos a definir un modelo de datos para nuestro formulario:

```typescript
//hero.ts
export class Hero {
  constructor(
    public id: number,
    public name: string,
    public power: string,
    public alterEgo?: string
  ) {  }
}
```

y también vamos a crear el componente que controle programáticamente ese formulario:

```typescript
import { Component } from '@angular/core';
import { Hero }    from './hero';
@Component({
  moduleId: module.id,
  selector: 'hero-form',
  templateUrl: 'hero-form.component.html'
})
export class HeroFormComponent {
  
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  
  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');
  
  submitted = false;
  
  onSubmit() { 
	this.submitted = true; 
  }
}
```

Vamos a agregar el databinding para permitir sincronizar nuestro modelo:

 ```html
 <!-- hero-form.component.html -->
<div>
    <h1>Hero Form</h1>
    
	{{diagnostic}}

	<form>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" required
			[(ngModel)]="model.name" 
			name="name">

      </div>
      <div>
        <label for="alterEgo">Alter Ego</label>
        <input type="text" id="alterEgo"
			[(ngModel)]="model.alterEgo" 
			name="alterEgo">

      </div>

	  <div>
		<label for="power">Hero Power</label>
		<select id="power" required 
			[(ngModel)]="model.power" 
			name="power">
			
			<option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
		</select>
	  </div>

      <button type="submit">Submit</button>
    </form>
</div>
```

Hemos añadido dos cosas importantes:

1. *[(ngModel)]="model.name"* 
2. *name="name"*. Es unr equisito usar el atributo *name* cuando se usa *[(ngModel)]* en un formulario. 

Una explicación sobre esto:

> Internally Angular creates FormControls and registers them with an NgForm directive that Angular attached to the <form> tag. Each FormControl is registered under the name we assigned to the name attribute.

También hemos incluido por interpolación la variable {{diagnostic}}, solo para ver cómo se comporta el databinding de nuestro formulario.

Angular 2 solo tiene un modelo unidirecial de flujo de cambios, incluso cuando usamos la directiva *ngModel* y eso resulta mas eficiente, pero también los fuerza a reflejar todos los cambios de elementos en nuestro código.

Como hemos visto hasta un formulario no es fundamentalmente binding de datos. En concreto el binding bidireccional de *ngModel*. Pero se le pude sacar mas partido.

Usando *ngModel* podemos saber si el usuario a tocado el control, si el valor ha sido cambiado o si el valor se a cambiado a un valor inválido. La directiva *ngModel* no solo controla el estado, también actualiza a clases CSS especiales para reflejar el estado. Podemo usar esas clases para reflejar visualmente la apriencia y los mensajes de alerta.

State | Class if true | Class if false
--- | --- | ---
Control has been visited | ng-touched | ng-untouched
Control's value has changed | ng-dirty | ng-pristine
Control's value is valid | ng-valid | ng-invalid

Podemos ver una prueba añadiendo las siguientes líneas:

```html
<input type="text" class="form-control" id="name"
  required
  [(ngModel)]="model.name" name="name"
  #spy >
<br>TODO: remove this: {{spy.className}}
```

![alt text](./assets/control-state-transitions-anim.gif "Logo Title Text 1")

Esto abre la puerta a mejorar los estilos CSS para que se muestren mejor el estado del formulario:

```css
.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```

Otra de las cosas que podemos hacer es mostrar errores de validación al usuario:

```html
 <!-- hero-form.component.html -->
<div>
    <h1>Hero Form</h1>
    
	{{diagnostic}}

	<form>
      <label for="name">Name</label>
        <input type="text" id="name"
               required
               [(ngModel)]="model.name" name="name"
               #name="ngModel" >
        
		<div [hidden]="name.valid || name.pristine"
             class="alert alert-danger">
          Name is required
      </div>
		
      <div>
        <label for="alterEgo">Alter Ego</label>
        <input type="text" id="alterEgo"
			[(ngModel)]="model.alterEgo" 
			name="alterEgo">

      </div>

	  <div>
		<label for="power">Hero Power</label>
		<select id="power" required 
			[(ngModel)]="model.power" 
			name="power">
			
			<option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
		</select>
	  </div>

      <button type="submit">Submit</button>
    </form>
</div>
``` 

Por ahora la verdad es que nuestro formulario no hace mucha cosa. Es un formulario y seguramente queremos que haga algo como enviar datos.

Vamos a agregar el *submit* al ```<form>```:

```html
<form (ngSubmit)="onSubmit()" #heroForm="ngForm">
```

Fijaos que hemos creado una variable de template *#heroForm* y que la hemos inicializado al "ngForm" que es una directiva que controla el formulario como un todo. La directiva *ngForm* suplementa al elemento HTML *form* añadiendo funcionalidad extra, por ejemplo una propiedad *valid* que solo es *true* cuando todos los controles son válidos.

Podemos usar esa propiedad para activar o desactivar el botón de envío de datos.

```html
<button type="submit" [disabled]="!heroForm.form.valid">Submit</button>
```

O resetear los errores de nuestro formulario:

```
<button type="button" class="btn btn-default" (click)="newHero(); heroForm.reset()">New Hero</button>
```

## Estrategias de detección de cambios y zonas

La detección de cambios es un proceso que permite la sincronización de nuestra vista con los modelos.

La detección de cambios en Angular 2 supone un gran cambio con respecto a Angular 1.X. En la versión anterior se mantenia un gran numero de *watchers*, uno por cada propiedad. Eso requería una gran cantidad de trabajo.  
Puesto que Angular 1.X aplicaba un binding unidireccional esto resultaba un tanto caótico.

### ¿Cómo funciona la detección de cambios en Angular 2?

Veamos el siguiente ejemplo:

_Identifiquemos los elementos de la aplicación en especial aquellos que se ven sincronizados_

```typescript
//app/main.component.ts
import	{Component}	from	'@angular/core';
import	{MovieComponent}	from	'./movie.component';
import	{Actor}	from	'./actor.model';
@Component({
		selector:	'main',
		template:	`
				<h1>MovieApp</h1>
				<p>{{	slogan	}}</p>
				<button	type="button"	(click)="changeActorProperties()">Change	Actor	Properties</button>
				<button	type="button"	(click)="changeActorObject()">Change	Actor	Object</button>
				<movie	[title]="title"	[actor]="actor"></movie>`
})
export	class	MainComponent	{
		slogan:	string	=	'Just	movie	information';
		title:	string	=	'Terminator	1';
		actor:	Actor	=	new	Actor('Arnold',	'Schwarzenegger');
		changeActorProperties()	{
				this.actor.firstName	=	'Nicholas';
				this.actor.lastName	=	'Cage';
		}
		changeActorObject()	{
				this.actor	=	new	Actor('Bruce',	'Willis');
		}
}
```

con el siguiente modelo:

```typescript
//app/actor.model.ts
export	class	Actor	{
		constructor(
				public	firstName:	string,
				public	lastName:	string)	{}
}
```

y el componente *movie*:

```typescript
//app/movie.component.ts
import	{Component,	Input}	from	'@angular/core';
import	{Actor}	from	'./actor.model';
@Component({
		selector:	'movie',
		styles:	['div	{border:	1px	solid	black}'],
		template:	`
				<div>
						<h3>{{	title	}}</h3>
						<p>
								<label>Actor:</label>
								<span>{{actor.firstName}}	{{actor.lastName}}</span>
						</p>
				</div>`
})
export	class	MovieComponent	{
		@Input()	title:	string;
		@Input()	actor:	Actor;
}
```

Vemos que tenemos dos componentes: 

* MainComponent
* MovieComponent

Por detrás, Angular 2 va a crear unas clases especiales llamadas *change detectors*, una por cada componente; MainComponent_ChangeDetector y MovieComponent_ChangeDetector.

El objetivo de los detectores de cambio es conocer las propiedades del modelo utilizadas en la plantilla de un componente que han cambiado desde la última vez que se ejecutó el proceso de detección de cambios.

Para saberlo, Angular 2 crea una instancia de la clase de detector de cambio apropiada Y un enlace al componente que se supone que debe comprobar. 

*Conceptualmente pasa esto:*

```typescript
class MainComponent_ChangeDetector {
	constructor(
		public previousSlogan: string,
		public previousTitle: string,
		public previousActor: Actor,
		public movieComponent: MovieComponent
	) {}

	detectChanges(slogan: string, title: string, actor: Actor) {
		if (slogan !== this.previousSlogan) {
			this.previousSlogan = slogan;
			this.movieComponent.slogan = slogan;
		}
		if (title !== this.previousTitle) {
			this.previousTitle = title;
			this.movieComponent.title = title;
		}
		if (actor !== this.previousActor) {
			this.previousActor = actor;
		this.movieComponent.actor = actor;
		}
	}
}
```

Solo un detalle: Basicamente tres cosas pueden cambiar el estado de nuestra aplicación:

* Events - click, submit, …
* XHR - Fetching data from a remote server
* Timers - setTimeout(), setInterval()

Para controlar la propagación de los cambios Angular 2, pude hacer las cosas de dos formas:

### Estrategia de cambio *Default*.

De forma predeterminada, Angular define una estrategia de detección de cambios para cada componente de nuestro aplicación.

```typescript
// ...
import {ChangeDetectionStrategy} from '@angular/core';
@Component({
	// ...
	changeDetection: ChangeDetectionStrategy.Default
})
export class MovieComponent {
	// ...
}
```

Veamos qué sucede cuando un usuario hace clic en el botón "Cambiar propiedades de actor" al usar la estrategia predeterminada.
Como se señaló anteriormente, los cambios son provocados por eventos y la propagación de cambios es hecho en dos fases: la fase de aplicación y la fase de detección de cambio.

En este caso Angular 2, inspecciona todos los elementos, esto es costoso, aún que, tenemos que recordar que el modelo unidoreccional de Angular 2, ofrece un rendimiento muy muy bueno, especialmente comparado con Angular 1.X.

Vamos a ver que tenemos otra estrategía que permite ser más optimos a la hora de detectar los cambios. 

### Estrategia de cambio *OnPush*.

Observemos el siguiente ejemplo:

```typescript
//app/movie.component.ts
// ...
@Component({
	// ...
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
	// ...
}
```

Cuando indicamos que queremos usar la estrategia de detección de cambios _OnPush_ lo que estamos haciendo es decirle que solo los objetos que queremos que se inspeccionen son los @Inputs y estos son inmutables. Eso significa que no basta con cambiar sus atributos, para que Angular 2 detecte que se ha producido un cambio es necesario que se cambie la "instancia" completa del objeto @Input.

Examinemos este ejemplo:

```typescript
class DataCard {
	public name: string;
}
var vData = new DataCard(name: 'Ruben Moreno');
var vData2 = vData.name = 'Pepe';

vData === vData2 // true
```

Hemos creado una instancia, vData, cambiamos alguno de sus atributos. Pero el objeto es el mismo, la instancia es la misma. No estamos inspeccionando todos los elementos, solo lo que es susceptible de cambio. 

En el caso anterior, en *MovieComponent* no se va a realizar ningún cambio internamente, no tiene sentido inspeccionar mas elementos.

En cierta forma, la estrategía onPush espera a que los cambios nos llegen, o nos los empujen desde fuera de nuestros componentes.

_Comentar en clase el ejemplo del otro día con Arturo_

Nota: En el caso que vimos con Arturo, se trataba de un servicio que realizaba un http.get y queriamos pintar el resultado con una directiva *ngFor.

```typescript
// Este código no funciona es solo para ejemplificar un tipo de solución
@Component({
  template: '<div *ng-for="let product of products">{{product.name}} - {{product.price}}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
class CartBadgeCmp {

  @Input() addItemStream:Observable<Array<number>>;
  products : Array<any>;

  ngOnInit() {
    this.addItemStream.subscribe(() => {
      products => this.products.push(products),
    })
  }
}
```