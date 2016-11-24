# Jornada 6

## Plan de trabajo

El objetivo de esta jornada es repasar los contenidos teóricos de: 

* Forms. 
* Estrategias de detección de cambios y zonas.

Además de continuar con el proyecto práctico de Blogging iniciado en la jornada anterior. Para ello se utilizarán los conceptos aprendidos hasta ahora.

## Forms

TODO

## Estrategias de detección de cambios y zonas

La detección de cambios es un proceso que permite la sincronización de nuestra vista con los modelos.

La detección de cambios en Angular 2 supone un gran cambio con respecto a Angular 1.X. En la versión anterior se mantenia un gran numero de *watchers*, uno por cada propiedad. Eso requería una gran cantidad de trabajo.  
Puesto que Angular 1.X aplicaba un binding unidireccional esto resultaba un tanto caótico.

Angular 2 solo tiene un modelo unidirecial de flujo de cambios, incluso cuando usamos la directiva *ngModel* y eso resulta mas eficiente, pero también los fuerza a reflejar todos los cambios de elementos en nuestro código.

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

