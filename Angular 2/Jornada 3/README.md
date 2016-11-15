# Jornada 3: Comenzando con Angular 2: Componentes, módulos e inyectables.

## Plan de trabajo:

El objetivo de esta jornada es dar una primera vista de la arquitectura. Centrarnos en Modules, Components e Injectors. Vamos a hacer varias sesiones de trabajo para, *partiendo del proyecto mini-demo*, crear y usar esos elementos.

Angular es Open Source y aquí tenemos el código:

https://github.com/angular/angular

## Arquitectura

https://angular.io/docs/ts/latest/guide/architecture.html

![alt text](./resources/overview2.png "Arquitectura angular 2")

En esencia:

You write Angular applications by composing HTML templates with Angularized markup, writing component classes to manage those templates, adding application logic in services, and boxing components and services in modules.

Then you launch the app by bootstrapping the root module. Angular takes over, presenting your application content in a browser and responding to user interactions according to the instructions you've provided.

Como vemos en la imagen anterior tenemos los siguientes elementos:

* Modules
* Components
* Templates
* Metadata
* Data binding
* Directives
* Services
* Dependency injection

## Modules

Every Angular app has at least one module, the root module, conventionally named AppModule.

An Angular module, whether a root or feature, is a class with an @NgModule decorator.

* NgModule is a decorator function that takes a single metadata object whose properties describe the module. The most important properties are:

    * *declarations* - the view classes that belong to this module. Angular has three kinds of view classes: components, directives, and pipes.
    * *exports* - the subset of declarations that should be visible and usable in the component templates of other modules.
    * *imports* - other modules whose exported classes are needed by component templates declared in this module.
    * *providers* - creators of services that this module contributes to the global collection of services; they become accessible in all parts of the app.
    * *bootstrap* - the main application view, called the root component, that hosts all other app views. Only the root module should set this bootstrap property. (Solo para el mainmodule).


*BrowserModule* registers critical application service providers. It also includes common directives like NgIf and NgFor which become immediately visible and usable in any of this modules component templates.

Components:

https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
https://angular.io/docs/ts/latest/api/core/index/Component-decorator.html
https://angular.io/docs/ts/latest/tutorial/toh-pt3.html
https://angular.io/docs/ts/latest/cookbook/component-communication.html

Modules:

https://angular.io/docs/ts/latest/guide/ngmodule.html

Inyectables:

https://angular.io/docs/ts/latest/guide/dependency-injection.html
https://angular.io/docs/ts/latest/guide/hierarchical-dependency-injection.html

