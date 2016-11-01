# Jornada 2: 

Gestión de dependencias externas con Bower, npm.

## node.js

*Node.js* es un proyecto que pretende llevar JavaScript a la línea de comandos. Toma el motor de ejecución de JavaScript de Chrome (V8) lo lleva a un ejecutable que podemos lanzar para interpretar nuestro código javaScript.
Ahora también podemos utilizar *node* para ejecutar tareas como ejecutar un servidor de páginas web creado en JavaScript. Ofuscar nuestro código. Crear preprocesadores de CSS, linting, etc.

__Discutir las ventajas e incovenientes de esto__

## ¿Por qué necesitamos gestores de paquetes?

Porque en el mundo real nuestros proyectos tienen muchas dependencias con otros proyectos.
No solo en el código que forma parte de nuestra aplicación sino de otras librerías y herramientas que usamos en el proceso de desarrollo de nuestra aplicación.

Vamos a trabajar con dos gestores de paquetes ya que son los mas extendidos. NPM y Bower.

_Analizar las diferencias entre ellos._

### Práctica: Instalar node.js en nuestros equipos

Desde el sitio https://nodejs.org/ descargar *node*.

> El objetivo es dejar operativo en los equipos de los alumnos node.js

## NPM

### Uso básico

Actualizar la versión que viene por defecto junto con *node*

```npm install npm@latest -g```



### Repositorios privados

### Práctica: Instalar jquery y bootstrap con NPM

### Práctica: Instalar express para servir una apliación mínima.

### Práctica: Usar un paquete alojado en un Git privado.

### Repaso a los comandos de NPM

## Bower

### Práctica: Instalar jquery y bootstrap con Bower

### Repaso a los comandos de Bower


## Breve apunto sobre Grunt y Gulp

Nos permiten crear y ejecutar tareas escritas en JavaScript. 

"Grunt is a JavaScript Task Runner, a tool used to automatically perform frequently used tasks such as minification, compilation, unit testing, linting, etc. It uses a command-line interface to run custom tasks defined in a file (known as a Gruntfile). Grunt was created by Ben Alman and is written in Node.js. It is distributed via npm." - Wikipedia

"gulp.js is an open-source, extensible, powerful and efficient JavaScript toolkit by Fractal Innovations[2] and the open source community at git, used as a streaming build system in front-end web development.
It is a task runner built on Node.js and Node Package Manager (npm), used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, image optimization etc.[3]" - Wikipedia
