_Recordar que en la carpeta de la Jornada 3 he dejado un libro sobre patrones de diseño._

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

#### Creating a package.json

> npm init [--yes]

> The --save and --save-dev install flags

* "dependencies": these packages are required by your application in production
* "devDependencies": these packages are only needed for development and testing

#### Installing npm packages locally

> npm install <package_name>

#### Uninstalling local packages

> npm uninstall --save <package_name>

*Recordar el problema con los path largos en Windows*

#### Installing npm packages globally

> npm install -g <package_name>

If you get an EACCES error, you should fix your permissions. You could also try using sudo, but this should be avoided:

> sudo npm install -g <package_name>

#### Updating local packages 

> npm update [-g]

Si ejecutamos después 

> npm outdated [-g]

Debería de devolvernos un listado vacío.

#### Uninstalling local packages

> npm uninstall <package_name>

> npm uninstall --save <package_name>

Lo eliminamos también del fichero package.json

### Fichero package.json

Semantic versioning is a standard that a lot of projects use to communicate what kinds of changes are in this release. It's important to communicate what kinds of changes are in a release because sometimes those changes will break the code that depends on the package.

Semver for publishers

If a project is going to be shared with others, it should start at 1.0.0, though some projects on npm don't follow this rule.

After this, changes should be handled as follows:

Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.*1*
New features which don't break existing features: Minor release, increment the middle number, e.g. 1.*1*.0
Changes which break backwards compatibility: Major release, increment the first number, e.g. *2*.0.0

Semver for consumers

As a consumer, you can specify which kinds of updates your app can accept in the package.json file.

If you were starting with a package 1.0.4, this is how you would specify the ranges:

Patch releases: 1.0 or 1.0.x or ~1.0.4
Minor releases: 1 or 1.x or ^1.0.4
Major releases: * or x

Reglas de versionado semántico:

* version Must match version exactly
* '>'version Must be greater than version
* '>'=version etc
* '<'version
* '<'=version
* ~version "Approximately equivalent to version"
* ^version "Compatible with version"
* 1.2.x 1.2.0, 1.2.1, etc., but not 1.3.0
* http://... See 'URLs as Dependencies' below
* '*' Matches any version
* "" (just an empty string) Same as *
* version1 - version2 Same as >=version1 <=version2.
* range1 || range2 Passes if either range1 or range2 are satisfied.
* git... See 'Git URLs as Dependencies' below
* user/repo See 'GitHub URLs' below
* tag A specific version tagged and published as tag See npm-tag
* path/path/path See Local Paths below

#### Tags

Las Tags permiten organizar versiones del paquete de una forma mas entendible por humanos y permiten publicar y distribuir el paquete de forma mas efectiva.

Agregar una nueva etiqueta:

> npm dist-tag add <pkg>@<version> [<tag>]

Publicar con una etiqueta:

> npm publish --tag [tag-name] / Por defecto se publica con la última etiqueta creada

Instalar usando Tags:

npm install <pkg-name>@<tag-name> [-g]

_The best practice is to avoid using tags beginning with a number or the letter "v"._

### ¿Cómo funciona NPM?

_Depende de la versión v2 y v3 se comportan de forma ligeramente diferente_

NPM instala un árbol de dependencias. Eso significa que, cada package instala su propio conjunto de dependecias en vez de forzar que se compartan las dependencias.

Por ejemplo, imaginemos estos dos paquetes:

foo
├── hello ^0.1.2
└── world ^1.0.7

bar
├── hello ^0.2.8
└── goodbye ^3.4.0

Ahora imaginemos que tenemos dos aplicaciones que tienen depencias de *foo* y *bar*. Con *hello* tenemos un problema, tenemos un conflicto de versiones.
A diferencia de otros gestores de paquetes NPM no se limita a informar del error. NPM hará esto:

node_modules/
├── foo/
│   └── node_modules/
│       ├── hello/
│       └── world/
└── bar/
    └── node_modules/
        ├── hello/
        └── goodbye/

En realidad depende un poco de la versión: npm 3 intentará optimizar las dependencias compartidas.

Eso implica que:

> your 'node_modules' directory structure and therefore you dependency tree, are dependent on INSTALL ORDER

¿Puede afectar la estructura del árbol de dependencias a nuestras aplicaciones?

No. Mientras que tengamos todas las dependecias que necesitamos.

### Working with scoped packages

14 - TODO

### Configuración

npmrc Files

The four relevant files are:

* per-project config file (/path/to/my/project/.npmrc)
* per-user config file (~/.npmrc)
* global config file ($PREFIX/etc/npmrc)
* npm builtin config file (/path/to/npm/npmrc)

### Repositorios privados

Vamos a echar un ojo en la Web de NPM. Pero nos vamos a centrar en la utilización de git.

### Práctica: Instalar jquery y bootstrap con NPM

_Trabajo en grupo_

### Práctica: Usar un paquete alojado en un Git privado.

git clone https://ruben_moreno_fernandez@bitbucket.org/ruben_moreno_fernandez/sng-random-text-generator.git



### Repaso a los comandos de NPM

#### shirnkwrap

shrinkwrap es una herramienta con más utilidad para aquellos que desarrollan módulos, en pocas palabras shirnkwrap “bloquea” las versiones que utilizas en determinada aplicación, de esta manera te aseguras que las versiones que van a ser posteriormente instaladas en la cadena de distribución sean las mismas que utilizaste en el desarrollo de tu módulo o aplicación. Este comando generara un nuevo archivo donde estara el árbol o esquema con las versiones que deben ser instaladas al momento de instalar tu módulo. Más información

#### Print the folder where npm will install executables.
> npm bin [-g] 

#### This command tries to guess at the likely location of a package's bug tracker URL
> npm bug [-g] <pkg-name> => npm bug -g npm

#### Manipulates packages cache

> npm cache add <tarball file> => add: Add the specified package to the local cache. This command is primarily intended to be used internally by npm
> npm cache ls [<path>]
> npm cache clean [<path>]

#### Tab Completion for npm

> source < (npm completion)
Enables tab-completion in all npm commands.

Yo uso windows esto no me vale ;-).

#### Manage the npm configuration files

> npm config set <key> <value> [-g|--global]
> npm config get <key>
> npm config delete <key>
> npm config list
> npm config edit
> npm get <key>
> npm set <key> <value> [-g|--global]

## Bower

### Práctica: Instalar jquery y bootstrap con Bower

### Repaso a los comandos de Bower

## Breve apunto sobre Grunt y Gulp

Nos permiten crear y ejecutar tareas escritas en JavaScript. 

"Grunt is a JavaScript Task Runner, a tool used to automatically perform frequently used tasks such as minification, compilation, unit testing, linting, etc. It uses a command-line interface to run custom tasks defined in a file (known as a Gruntfile). Grunt was created by Ben Alman and is written in Node.js. It is distributed via npm." - Wikipedia

"gulp.js is an open-source, extensible, powerful and efficient JavaScript toolkit by Fractal Innovations[2] and the open source community at git, used as a streaming build system in front-end web development.
It is a task runner built on Node.js and Node Package Manager (npm), used for automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, image optimization etc.[3]" - Wikipedia

## Apuntes varios

### Cuándo usar NPM y cuándo Bower

* Cuando tenemos que instalar paquetes que va a usar node.js (Karma, lint, uglify, etc... ) usaremos NPM. 
* Cuando tenemos que instalar dependencias del front (jQuery, AngularJS, underscore, etc... ), usaremos Bower.

### Cómo eliminar la carpeta node_modules en Windows.

En algunas ocasiones se produce un error cuando queremos eliminar la carpeta node_modules ya que es demasiado profundas. En ese caso podemos eliminar las dependencias del fichero package.json y ejecutar ```npm prune``` o podemos instalar ```npm install rimraf -g``` (si no está instalado ya en node) y ejecutar el comando ```rimraf node_modules``` y dejar que sea el propio node quien elimine los fichero que ha creado.
No olvidar limpiar la caché de NPM.

### Actualizar la version de node para poder tener acceso a las últimas mejoras

Ir a http://nodejs.org/ e instalar la última versión disponible.