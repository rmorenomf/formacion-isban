# Jornada 7 - Construyendo Angular 2: Webpack y ~~SystemJS~~. Lazy loading. AoT. Internacionalización.

## Plan de trabajo

Explorar las posibilidades de Angular 2 para:

* Construcción de la aplicación con:
    * Webpack
    * ~~SystemJS~~
* Optimización de los tiempos de carga de aplicación con Lazy Loading.
* Precompilación con AoT.
* Internacionalización.

Dejaremos un tiempo de práctica individual para que los asistentes puedan probar los conceptos aprendidos:

* Lazy loading, tomar el ejemplo del Blog y crear un nuevo módulo de administración, de backoffice que carge un login sencillo, ese módulo nuevo debe tener una carga Lazy. Toamr medidas de tiempos con y sin carga Lazy. Molaría usar el @typing de jQuery, inyectarlo en ese nuevo módulo, para ver la ganancia cuando se tienen subdependencias pesadas.

## ¿Por qué necesitamos SystemJS o Webpack?

Primeramente porque tenemos que crear nuestra aplicación para que funcione. Además quetemos tener una serie de tareas que hagan que nuestra aplicación sea mas sencilla de distribuir y mas eficiente en su ejecución.   

## Webpack

Webpack es empaquedor de módulos, una herramienta para agrupar el código fuente de la aplicación en trozos y para cargar ese código desde un servidor a un navegador.
Esto es muy importante cuando queremos tener un buen rendimiento en la carga de nuestra aplicación. Pero además necesitamos automatizar algunas de las tareas completamente necesarias como la "transpilacion" del TypeScript, la compilación de los ficheros SASS y bueno, algunas cosas no realmente necesarias como el uglify, etc.

Así, Webpack hace dos cosas:

* Crear nuestra aplicación para que se pueda servir.
* Trocear nuestra aplicación para que su carga sea optima.

Vamos a repasar algunos conceptos básicos de Webpack para poder empezar a sacarle el máximo partido:

La principal idea es que Webpack va a inspeccionar nuestro código del proyecto en busca de las sentencias *import* para crear un gráfico de dependecias y con eso generar uno a mas *bundles* o paquetes. 
Por otro lado, con los "plugins" *loaders* podemos procesar y mimificar diferentes ficheros no JavaScript como; TypeScript, SASS, LESS, etc.

La forma mas sencilla de instalar webpack en nuestro proyecto angular 2 es:

> npm install -D webpack ts-loader html-webpack-plugin tslint-loader

Lo ejecutaremos mediante línea de comandos ejecutando el fichero de configuración:

> webpack.config.js

que es el que contiene la configuración del webpack.

### Bundle

Uno de los conceptos pilares de Webpack es el de *Bundle*. Un bundle es simplemente una colección de módulos. Para ejemplificar esto, podemos dividir los elementos de nuestra apliación en dos:

* *app* sería la lógica de nuestra apliación.
* *vendor* serían las librerías de terceros que usamos en nuestra aplicación.

En Webpacks los bundles se definen através de *entry points*. El genera el mapa de dependencias para cada referncias de los módulos. Todas las dependencias que se encuentre las empaquetará dentro del bundle correspondiente.

Referencias tanto JavaScript:

```javascript 
const app = require('./src/index.ts');
```

como TypeScript

```typescript
import { Component } from '@angular/core';
```

En nuestro fichero de configuración de Webpack va a tener esta pinta los entry points:

```javascript
{
  entry: {
    app: './src/app/main.ts',
    vendor: [
        'es6-shim',
        'angular2/bundles/angular2-polyfills',
        'angular2/bootstrap',
        'angular2/platform/browser',
        'angular2/platform/common_dom',
        '@angular/core',
        'angular2/router',
        'angular2/http',
        'redux',
        'redux-thunk',
        'ng2-redux',
        'redux-logger'
      ]
    }
}
```

Opcionalmente podemos indicar la forma cómo queremos que se generen nuestros bundles. Por ejemplo:

* Sacar los ficheros a un directorio en particular.
* Transformar el código de alguna forma.
* Las rutas del servidor se pueden configurar de muchas maneras diferentes. Probablemente queremos alguna forma de configurar webpack para tener en cuenta nuestra configuración de enrutamiento de servidor.

Todas estas cosas se configuran en la sección *output* que podría tener una pinta parecida a esto:

```javascript
{
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map'
  }
}
```

Algunas opciones tienen palabras entre corchetes. Webpack tiene la capacidad de analizar parámetros para estas propiedades, con cada propiedad que tiene un conjunto diferente de parámetros disponibles para la sustitución. Aquí, estamos usando el *name* (el nombre del paquete) y *hash* (un valor hash del contenido del paquete).

También hemos incluido la configuración para que genere un SourceMap.

TypeScript no es el núcleo de JavaScript, por lo que el webpack necesita un poco de ayuda adicional para analizar los archivos *.ts*.
Lo hace mediante el uso de *loaders*. Los cargadores son una manera de configurar cómo webpack transforma las salidas de archivos específicos en nuestros paquetes. El paquete *ts-loader* está manejando esta transformación de archivos TypeScript.

Los *loaders* tienen esta pinta en el fichero de configuración *webpack.config.js*:  

```javascript
{
  test: /\.ts$/,
  loader: 'ts-loader',
  exclude: /node_modules/
}
```

o algo mas complejo como:

```javascript
{
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
}
```

Cada tarea tiene algunas opciones de configuración:

* _test_ - La ruta del archivo debe coincidir con esta condición para ser manejada. Esto se utiliza comúnmente para probar extensiones de archivos, por ejemplo. / \ .ts$/.
* _loader_ - Los loaders que se utilizarán para transformar la entrada. Podemos usar varios loaders encadenados con la siguiente sintaxis: ```ts!tslint```.
* _exclude_ - La ruta del archivo no debe coincidir con esta condición para ser manejada. Esto se utiliza comúnmente para excluir carpetas de archivos, p. / node_modules /.
* _include_ - La ruta del archivo debe coincidir con esta condición para ser manejada. Esto se utiliza comúnmente para incluir carpetas de archivos. p.ej. ```path.resolve (__ dirname, 'app / src')```.

*preLoaders* funciona igual que la lista de *loaders* sólo es una lista de tareas independiente que se ejecuta antes de la lista de tareas de los loaders.

#### Objetos no JavaScript

Webpack también nos permite cargar recursos no JavaScript como: CSS, SVG, archivos de fuentes, etc. Para poder adjuntar estos activos a nuestro paquete, debemos importarlos dentro de nuestra aplicación:

```javascript
import './styles/style.css';
// or
const STYLES = require('./styles/style.css');
```

#### Otros loaders interesantes:

* raw-loader - devuelve el contenido del archivo como una cadena de texto.
* url-loader - devuelve una dirección URL de datos codificada en base64 si el tamaño del archivo está bajo un cierto umbral, de lo contrario simplemente devuelve el archivo.
* css-loader - resuelve las referencias @import y url en archivos CSS como módulos.
* style-loader - inyecta una etiqueta de estilo con el paquete de CSS en la etiqueta ```<head>```.

### Plugins

Podemos extender las funciones de Webpack mediante el uso de plugins. 

Los plugins nos permiten inyectar pasos de compilación personalizados durante el proceso de cosntrucción.
Un plugin de uso común es el *html-webpack-plugin*. Esto nos permite generar archivos HTML necesarios para producción. Por ejemplo, puede usarse para generar etiquetas de script para los paquetes de salida.

Por ejemplo, podríamos cargar nuestro plugin de esta forma:

```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body',
  minify: false
});
```

Solo por tener otra referencia, un fichero de configuración completo de Webpack podría tener esta pinta:

```javascript
'use strict';

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].bundle.js'),

  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false
  })
];

const envPlugins = {
    production: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    development: []
};

const plugins = basePlugins.concat(envPlugins[process.env.NODE_ENV] || []);

module.exports = {
  entry: {
    app: './src/index.ts',
    vendor: [
      '@angular/core',
      '@angular/compiler',
      '@angular/common',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'es6-shim',
      'redux',
      'redux-thunk',
      'redux-logger',
      'reflect-metadata',
      'ng2-redux',
      'zone.js',
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: plugins,

  module: {
    rules: [
      { test: /\.ts$/, loader: 'tslint' },
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
}
```

Y cómo lanzamos el Webpacl para que se ejecute, pues podemos usar NPM: 

```json
scripts: {
  "clean": "rimraf dist",
  "prebuild": "npm run clean",
  "build": "NODE_ENV=production webpack",
}
```

Tenemos mas ejemplos en el Starter Kit. En este caso la orgnización es algo diferente:

Tenemos lo siguiente:

```
webpack.config.js
./config/webpack.common.js
./config/webpack.dev.js
./config/webpack.deprov.js
./config/webpack.test.js
```

En este caso se a partido la configuración en varios entornos, es sin duda una forma mas sencilla de mantener y crear nuestra configuración con Webpack.

_Vamos a prácticar esto_

## Lazy loading

Lazy loading es la técnica con la cual, cargamos solo los módulos cuando los necesitamos. Esto lo hacemos para reducir los tiempos de carga de nuestra aplicación. 
Veamos las diferentes herramientas que tenemos en Angular 2 para poder realizar el Lazy Loading.

Vamos a partir del siguiente root module:

```typescript
//app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EagerComponent } from './eager.component';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    routing
  ],
  declarations: [
    AppComponent,
    EagerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Todo normal.

ya sabemos que necesitamos un root component, pues aquí lo tenemos:

```typescript
//app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>My App</h1>
    <nav>
      <a routerLink="eager">Eager</a>
      <a routerLink="lazy">Lazy</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
```
y que necesitamos un módulo de Routing:

```typescript
//app/app.routing.ts

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EagerComponent } from './eager.component';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: 'lazy/lazy.module#LazyModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
```

ya podemos ver que en el caso del root component, pues tenemos dos rutas, una a *eager* que se resuelve con *EagerComponent* una de ellas con el nombre de lazy que se resuelve con un String 'lazy/lazy.module#LazyModule'.

Notad que si bien hemos importado, tanto el módulo JavaScript, como el módulo Angular 2 de *EagerComponent* en el root module, no hemos hecho nada con *LazyModule*.

En resumen, tenemos los siguiente que es un poco diferencia de los routing que hemos visto hasta ahora:

1. hemos usado la propiedad *loadChildren* en vez de *component*.
2. Pasamos un string en vez de una clase.

Por cierto, vamos a presentar a EagerModule:

```typescript
//app/eager.component.ts
import { Component } from '@angular/core';

@Component({
  template: '<p>Eager Component</p>'
})
export class EagerComponent {}
```

y a LazyModule:

```typescript
//app/lazy/lazy.module.ts
import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { routing } from './lazy.routing';

@NgModule({
  imports: [routing],
  declarations: [LazyComponent]
})
export class LazyModule {}
```

Si nos fijamos bien, un detalle importante es que hemos importado un módulo de Routing propio del módulo *LazyModule*:

```typescript
import { routing } from './lazy.routing';
```

ya que estamos, vamos a echar un vistazo a ese módulo de routing:

```typescript
//app/lazy/lazy.routing.ts
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

const routes: Routes = [
  { path: '', component: LazyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

que también tiene algunas cosas diferentes:

```typescript
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
```

No lo estamos construyendo con forRoot como los otros módulos de Routing, estamos usando *forChild*. 
Importante:
---

Siempre debemos hacerlo, usar *forChild* cuando se crea un objeto de enrutamiento para un módulo *feature*, no importa si el módulo se supone que se carga Lazy o no.

Y por último ya solo nos queda ver el componente Lazy:

```typescript
app/lazy/lazy.component.ts
import { Component } from '@angular/core';

@Component({
  template: '<p>Lazy Component</p>'
})
export class LazyComponent {}
```

## AoT

### El problema

Cuando el Browser renderiza la aplicación el template de cada componente debe ser convertido a un ejecutable (transpilación) por el compilador a un Script JavaScript. Esto lo realiza el compilador del navegador Just-in-Time (JiT) compiler.

Esto lo explica muy bien Tobias Bosch en esta charla tan densa: https://www.youtube.com/watch?v=kW9cJsvcsGo

Esto es pesado y el proceso es determinista, significa que invariablemente, siempre y cuando no cambiemos el template, el resultado de la trasnpilación es exacatamente el mismo. Eso cada vez que en cualquier parte del mundo a cualquier hora, alguien carga en su navegador nuestra aplicación.

¿Por qué no hacer ese proceso una sola vez? 

Y ya de paso realizamos una inspección de los errores de la generación del template en tiempo de desarrollo y no en tiempo de ejecución. Todo son ventajas.

A ver, con AoT ganamos en:

* Velocidad de renderizado.
* Eliminar llamadas a recursos externos al poder incluirlos en el template compilado.
* Optimización de los tamaños de los ficheros y menor tiempo de descarga de aplicación.
* Detección temprana de errores en tiempo de creación.
* Mejor seguridad ya que hacemos más díficil los ataques por inyección de código.

Bueno, AoT no es gratis, hay algunas cosas que tenemos que hacer para poder beneficiarnos de esta "maravilla de la técnica".

Pasos que tenemos que realizar:

1. Asegurarnos que los templates de los componentes que vayamos a precompilar estén separados y no incluidos en el componente.

```html
<!-- app.component.html -->
<button (click)="toggleHeading()">Toggle Heading</button>
<h1 *ngIf="showHeading">Hello Angular</h1>

<h3>List of Heroes</h3>
<div *ngFor="let hero of heroes">{{hero}}</div>
```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showHeading = true;
  heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

  toggleHeading() {
    this.showHeading = !this.showHeading;
  }
}
```

2. Instalar nuevas dependecias:

> npm install @angular/compiler-cli @angular/platform-server --save


3. Una configuración especial para aot. Creando un nuevo fichero 'tsconfig-aot.json':

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true
  },

  "files": [
    "app/app.module.ts",
    "app/main.ts"
  ],

  "angularCompilerOptions": {
   "genDir": "aot",
   "skipMetadataEmit" : true
 }
}
```

importantes las secciones:

```
"lib": ["es2015", "dom"],

"files": [
    "app/app.module.ts",
    "app/main.ts"
  ],

"angularCompilerOptions": {
   "genDir": "aot",
   "skipMetadataEmit" : true
 }
```

Lo que es realmente nuevo es la sección llamada *angularCompilerOptions*. Su propiedad "genDir" le dice al compilador que almacene los archivos de salida compilados en una nueva carpeta aot.

La propiedad "skipMetadataEmit": true impide que el compilador genere archivos de metadatos con la aplicación compilada. Los archivos de metadatos no son necesarios cuando se direccionan archivos TypeScript, por lo que no hay razón para incluirlos.

4. Compilar la aplicación tomando la nueva configuración

> ngc -p tsconfig-aot.json

5. Realizar el bootstrapping de la aplicación para AoT.

Para AoT:

```typescript
//main.ts (AoT)
import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from '../aot/app/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
```

para JIT:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

Es incompatible AoT con JIT. Para nada, de hecho lo mejor es usar Jit para desarrollo y AoT para producción.

## Internacionalización

TODO