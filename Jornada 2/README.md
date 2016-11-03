_Recordar que en la carpeta de la Jornada 3 he dejado un libro sobre patrones de diseño._

# Jornada 2: 

Gestión de dependencias externas con Bower, npm.

## node.js

*Node.js* es un proyecto que pretende llevar JavaScript a la línea de comandos. Toma el motor de ejecución de JavaScript de Chrome (V8) lo lleva a un ejecutable que podemos lanzar para interpretar nuestro código javaScript.
Ahora también podemos utilizar *node* para ejecutar tareas como ejecutar un servidor de páginas web creado en JavaScript. Ofuscar nuestro código. Crear preprocesadores de CSS, linting, etc.

_Discutir las ventajas e incovenientes de esto_

_Probar el pequeño ejemplo de ejecutar JavaScript en node_

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

### Packages and Modules

Node.js and npm have very specific definitions of packages and modules, which are easy to mix up.

* A package is a file or directory that is described by a package.json. 
* A module is any file or directory that can be loaded by Node.js' require().

### Fichero package.json

Semantic versioning is a standard that a lot of projects use to communicate what kinds of changes are in this release. It's important to communicate what kinds of changes are in a release because sometimes those changes will break the code that depends on the package.

Semver for publishers

If a project is going to be shared with others, it should start at 1.0.0, though some projects on npm don't follow this rule.

After this, changes should be handled as follows:

* Bug fixes and other minor changes: Patch release, increment the last number, e.g. 1.0.*1*
* New features which don't break existing features: Minor release, increment the middle number, e.g. 1.*1*.0
* Changes which break backwards compatibility: Major release, increment the first number, e.g. *2*.0.0

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

Esto es solo el principio, podemos echar un vistazo a la complejidad que puede llegar a tener la semántica de semver: 

https://docs.npmjs.com/misc/semver

Explicar que podemo indicar también un commit en concreto.

git://github.com/user/project.git#commit-ish
git+ssh://user@hostname:project.git#commit-ish
git+http://user@hostname/project/blah.git#commit-ish
git+https://user@hostname/project/blah.git#commit-ish

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

```
foo
├── hello ^0.1.2
└── world ^1.0.7

bar
├── hello ^0.2.8
└── goodbye ^3.4.0
```

Ahora imaginemos que tenemos dos aplicaciones que tienen depencias de *foo* y *bar*. Con *hello* tenemos un problema, tenemos un conflicto de versiones.
A diferencia de otros gestores de paquetes NPM no se limita a informar del error. NPM hará esto:

```
node_modules/
├── foo/
│   └── node_modules/
│       ├── hello/
│       └── world/
└── bar/
    └── node_modules/
        ├── hello/
        └── goodbye/
```

En realidad depende un poco de la versión: npm 3 intentará optimizar las dependencias compartidas.

Eso implica que:

> your 'node_modules' directory structure and therefore you dependency tree, are dependent on INSTALL ORDER

¿Puede afectar la estructura del árbol de dependencias a nuestras aplicaciones?

No. Mientras que tengamos todas las dependecias que necesitamos.

### Working with scoped packages

All npm packages have a name. Some package names also have a scope. 
A scope follows the usual rules for package names (url-safe characters, no leading dots or underscores). When used in package names, preceded by an @-symbol and followed by a slash, e.g.

@somescope/somepackagename
Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package.

Scoped packages are supported by the public npm registry. The npm client is backwards-compatible with un-scoped registries, so it can be used to work with scoped and un-scoped registries at the same time.

Installing scoped packages

Scoped packages are installed to a sub-folder of the regular installation folder, e.g. if your other packages are installed in node_modules/packagename, scoped modules will be in node_modules/@myorg/packagename. The scope folder (@myorg) is simply the name of the scope preceded by an @-symbol, and can contain any number of scoped packages.

> npm install @myorg/mypackage

### Configuración

npmrc Files

The four relevant files are:

* per-project config file (/path/to/my/project/.npmrc)
* per-user config file (~/.npmrc)
* global config file ($PREFIX/etc/npmrc)
* npm builtin config file (/path/to/npm/npmrc) => Este es un archivo de configuración "incorporado" inalterable que npm mantiene consistente a través de las actualizaciones. Esto es principalmente para que los mantenedores de distribución sobreescriban las configuraciones por defecto de una manera estándar y consistente.

https://docs.npmjs.com/files/npmrc

> npm config list => muestra la configuración que esta siendo utilizada por npm.

### Repositorios privados

Vamos a echar un ojo en la Web de NPM. Pero nos vamos a centrar en la utilización de git.

### Práctica: Instalar jquery y bootstrap con NPM

_Trabajo en grupo_

### Práctica: Usar un paquete alojado en un Git privado.

git clone https://ruben_moreno_fernandez@bitbucket.org/ruben_moreno_fernandez/sng-random-text-generator.git

### Repaso a los comandos de NPM

#### shirnkwrap

shrinkwrap es una herramienta con más utilidad para aquellos que desarrollan módulos, en pocas palabras shirnkwrap “bloquea” las versiones que utilizas en determinada aplicación, de esta manera te aseguras que las versiones que van a ser posteriormente instaladas en la cadena de distribución sean las mismas que utilizaste en el desarrollo de tu módulo o aplicación. Este comando generara un nuevo archivo donde estara el árbol o esquema con las versiones que deben ser instaladas al momento de instalar tu módulo.

Ver la documentación y el uso del comando.

https://docs.npmjs.com/cli/shrinkwrap

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

#### dedupe

Eliminación de duplicados

> npm dedupe

Searches the local package tree and attempts to simplify the overall structure by moving dependencies further up the tree, where they can be more effectively shared by multiple dependent packages.

The deduplication algorithm walks the tree, moving each dependency as far up in the tree as possible, even if duplicates are not found. This will result in both a flat and deduplicated tree.

#### npm-docs / home / repo / root

Docs for a package in a web browser maybe

> npm docs <pkg-name>
> npm home <pkg-name>
> npm repo <pkg-name> => Open package repository page in the browser
> npm root [-g] => Print the effective node_modules folder to standard out.

#### npm-init

Interactively create a package.json file

If you invoke it with -f, --force, -y, or --yes, it will use only defaults and not prompt you for any options.

#### npm-install

https://docs.npmjs.com/cli/install

Algunos detalles menos conocidos:

* With the --production flag (or when the NODE_ENV environment variable is set to production), npm will not install modules listed in devDependencies.
* -S, --save: Package will appear in your dependencies.
* -D, --save-dev: Package will appear in your devDependencies.
* -O, --save-optional: Package will appear in your optionalDependencies.

When using any of the above options to save dependencies to your package.json, there is an additional, optional flag:

* -E, --save-exact: Saved dependencies will be configured with an exact version rather than using npm's default semver range operator.
Further, if you have an npm-shrinkwrap.json then it will be updated as well.

To install a package, npm uses the following algorithm:

```
load the existing node_modules tree from disk
clone the tree
fetch the package.json and assorted metadata and add it to the clone
walk the clone and add any missing dependencies
  dependencies will be added as close to the top as is possible
  without breaking any other modules
compare the original tree with the cloned tree and make a list of
actions to take to convert one to the other
execute all of the actions, deepest first
  kinds of actions are install, update, remove and move
```

#### npm-uninstall

Remove a package

> npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional]

* -S, --save: Package will be removed from your dependencies.
* -D, --save-dev: Package will be removed from your devDependencies.
* -O, --save-optional: Package will be removed from your optionalDependencies.

#### npm-update

Update a package

> npm update [-g] [<pkg>...]

This command will update all the packages listed to the latest version (specified by the tag config), respecting semver.

#### npm-link

Symlink a package folder

> npm link express 
./node_modules/express -> /usr/local/lib/node_modules/express

Creamos un enlace simbolico a la versión del paquete que tenemos instalado en global y lo referenciamos desde nuestro repo local.

Por ejemplo: express.

Para instalarlo haces: npm install -g express, con esto tienes la utilidad de linea de comandos para poder luego hacer:

> npm install

Necesitas instalar las dependencias, pero ¿qué sucede si no tienes acceso a internet en ese momento o no quieres volver a descargar express?, en este caso puedes hacer npm link express, para crear un link simbólico a la versión global de express:

> npm link express 
./node_modules/express -> /usr/local/lib/node_modules/express
Con esto ya tienes la habilidad de usar la versión global de express sin necesidad de descargarla de nuevo.

Importante: Cuando haces npm install npm instala una copia local, lo cual es lo mejor, ya que te ayuda a mantener un control mejor de dependencias. Por lo tanto aunque sea útil, no es una práctica recomendada.

“En producción, tu VM puede estar limitada a un servicio, o espacio en disco, en este caso, npm link no es tan malo. Pero por el amor a la debugabilidad y alta disponibilidad, no lo hagas en otros escenarios, por que symlinks son dolorosos en producción…"

#### npm-ls

List installed packages

> npm ls [-j] 

-j lo lista en formato json

#### npm-outdated

Check for outdated packages

> npm outdated

#### npm-prune

Remove extraneous packages

> npm prune [[<@scope>/]<pkg>...] [--production]

Extraneous packages are packages that are not listed on the parent package's dependencies list.

If the --production flag is specified or the NODE_ENV environment variable is set to production, this command will remove the packages specified in your devDependencies.

#### npm start / restart / stop / run-script / test

This runs an arbitrary command specified in the package's "start" property of its "scripts" object. If no "start" property is specified on the "scripts" object, it will run node server.js.

Ejemplo de packet.json con Scripts:

```json
{
  "name": "angular-seed",
  "private": true,
  "version": "0.0.0",
  "description": "A starter project for AngularJS",
  "repository": "https://github.com/angular/angular-seed",
  "license": "MIT",
  "devDependencies": {
    "bower": "^1.7.7",
    "http-server": "^0.9.0",
    "jasmine-core": "^2.4.1",
    "karma": "^0.13.22",
    "karma-chrome-launcher": "^0.2.3",
    "karma-firefox-launcher": "^0.1.7",
    "karma-jasmine": "^0.3.8",
    "karma-junit-reporter": "^0.4.1",
    "protractor": "^3.2.2"
  },
  "scripts": {
    "postinstall": "bower install",

    "prestart": "npm install",
    "start": "http-server -a localhost -p 8000 -c-1 ./app",

    "pretest": "npm install",
    "test": "karma start karma.conf.js",
    "test-single-run": "karma start karma.conf.js --single-run",

    "preupdate-webdriver": "npm install",
    "update-webdriver": "webdriver-manager update",

    "preprotractor": "npm run update-webdriver",
    "protractor": "protractor e2e-tests/protractor.conf.js",

    "update-index-async": "node -e \"var fs=require('fs'),indexFile='app/index-async.html',loaderFile='app/bower_components/angular-loader/angular-loader.min.js',loaderText=fs.readFileSync(loaderFile,'utf-8').split(/sourceMappingURL=angular-loader.min.js.map/).join('sourceMappingURL=bower_components/angular-loader/angular-loader.min.js.map'),indexText=fs.readFileSync(indexFile,'utf-8').split(/\\/\\/@@NG_LOADER_START@@[\\s\\S]*\\/\\/@@NG_LOADER_END@@/).join('//@@NG_LOADER_START@@\\n'+loaderText+'    //@@NG_LOADER_END@@');fs.writeFileSync(indexFile,indexText);\""
  }
}
```

En este ejemplo vemos las posibilidades de automatizar tareas sin necesidad de grunt, gulp, etc.

#### npm-search

Search for packages

> npm search [-l|--long] [search terms ...]

### Algún detalle final:

#### peerDependencies

In some cases, you want to express the compatibility of your package with a host tool or library, while not necessarily doing a require of this host. This is usually referred to as a plugin. Notably, your module may be exposing a specific interface, expected and specified by the host documentation.

## Bower

Al igual que NPM es un gestor de paquetes pero no de node sino de front. La principal diferencia es que bower no crea un arbol de dependencias solo descarga el paquete y lo deja disponible para ser usado en Front.

### Instalación

Se instala de forma global mediante npm

> npm install -g bower

```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
```

### Práctica: Instalar jquery y bootstrap con Bower

Prácticar un rato con la instalación de paquetes

### Configuración

Bower can be configured using JSON in a .bowerrc file. For example:

```json
{
  "cwd": "~/.my-project",
  "directory": "bower_components",
  "registry": "https://bower.herokuapp.com",
  "shorthand-resolver": "git://github.com//.git",
  "proxy": "http://proxy.local",
  "https-proxy": "http://proxy.local",
  "ca": "/var/certificate.pem",
  "color": true,
  "timeout": 60000,
  "save": true,
  "save-exact": true,
  "strict-ssl": true,
  "storage": {
    "packages" : "~/.bower/packages",
    "registry" : "~/.bower/registry",
    "links" : "~/.bower/links"
  },
  "interactive": true,
  "resolvers": [
    "mercurial-bower-resolver"
  ],
  "shallowCloneHosts": [
    "myGitHost.example.com"
  ],
  "scripts": {
    "preinstall": "",
    "postinstall": "",
    "preuninstall": ""
  },
  "ignoredDependencies": [
    "jquery"
  ]
}
```

*Placement & Order*

The config is obtained by merging multiple configurations by this order of importance:

1. CLI arguments via --config
2. Environment variables
3. Local .bowerrc located in the current working directory
4. All .bowerrc files upwards the directory tree
5. .bowerrc file located in user’s home folder (~)
6. .bowerrc file located in the global folder (/)


### Repaso a los comandos de Bower

_Revisar directamente en la ayuda de bower_

https://bower.io/docs/api/

Parar en install options:

* -F, --force-latest: Force latest version on conflict
* -p, --production: Do not install project devDependencies
* -S, --save: Save installed packages into the project’s bower.json dependencies
* -D, --save-dev: Save installed packages into the project’s bower.json devDependencies
* -E, --save-exact: Configure installed packages with an exact version rather than semver


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