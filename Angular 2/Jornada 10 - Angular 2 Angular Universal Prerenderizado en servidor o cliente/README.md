# Angular 2 Universal / Isomorfismo / Renderizado en servidor

## Plan de trabajo

El objetivo es definir claramente los conceptos de isomirfismo o renderizado en el servidor. 

## Qué es y para que sirve

> "isomorfismo" del griego iso-morfos: Igual forma. Tal vez no sea el mejor término.

Nuestras aplicaciones JavaScript son isomorficas en tanto dada una línea de código podemos ejecutarla tanto en el navegador (cliente) como en el servidor.

Desde aquí vamos a referirnos al concepto de renderizado en servidor.

Para tener una visión general os recomiendo echar un vistazo a:

https://blog.nodejitsu.com/scaling-isomorphic-javascript-code/

Un poco de historia:

* Primero fue Perl, PHP, Servlets, JSPs, ASP.1, ASP.NET, etc. 
* Luego fue el AJAX y llegarón las SPA (Single Page Application).

_Discutir ventajas e inconvenientes de cada una_

### ¿Qué **** es?

Angular Universal has several other features other than giving a solution for rendering HTML on the server. Based on the term "server side rendering", we could think that what Angular Universal does is similar to for example a server side template language like Jade. But there is a lot more functionality to it.

With Angular Universal you get that initial HTML payload rendered on the server, but you also boot a trimmed down version of Angular on the client and from there Angular takes over the page as a single page app, generating from there all the HTML on the client instead of the server.

So the end result that you get is the same, its a running single page application, but now because you got the initial HTML payload from the server you get a much better startup time and also a fully SEO indexable app.

Resuelve dos problemas de SPA:

1. *Performance*. Los clientes no tienen porqué ser rápidoso disponer de los suficientes recursos como para realizar una carga y ejecución fluida. Teléfonos, Tabletas, etc.

2. *SEO*. Los motores de busqueda no se llevan muy bien con SPA ya que, en el caso de que sean capaces de ejecutar el JavaScript, los mecanimos de navgación complejos de las SPA 
limitan las posibilidades de exploración de los robots.

3. *Mantenibilidad*. En especial con lógica que tiene que estar tanto en cliente como en servidor, que hace lo mismo pero que tenemos que codificarla dos veces; validaciones de formulario, etc.

4. *Social media*. No es trivial hacer una previsualización de contenido para ser integrado en una red social ya que el contendido se genera dentro de un contexto de aplicación que no siempre puede ser instanciado en/desde otro entorno.

Isomorfismo es quedarse con lo mejor de ambos mundos.

Pero también tiene sus cosillas:

En primer lugar hay un "lag" desde el momento que se pinta el HTML plano y se renderiza hasta que la apliación se arranca, se convierte en un SPA y el usuario puede comenzar a interactuar con ella.

En esta franja de tiempo el usuario puede empezar a teclear en una caja de texto, pulsar en botones y enlaces, etc.

Una forma de solucionar este problema es registrar todos los eventos que a disparado el usuario para ejecutarlos una vez que Angular se ha iniciado.

Podemos entener dos niveles de de ejecución en servidor:

1. pre-render - Genera un HTML estático en tiempo de construcción que se puede desplegar en un CDN o en un servidor estático.
2. re-render - Ejecuta la aplicación con cada petición.

## Isomorfismo con Angular 2

### Fuentes de información

La documentación oficial es algo escasa:

https://universal.angular.io/
https://github.com/angular/universal

Excelente tutorial:

http://blog.angular-university.io/angular-2-universal-meet-the-internet-of-the-future-seo-friendly-single-page-web-apps/

Creo que la mejor fuente de información es el github del proyecto:

https://github.com/angular/universal

Y el github del starter kit:

https://github.com/angular/universal-starter

Y de preboot:

https://github.com/angular/preboot

### Por donde empezamos

Tenemos dos opciones la opción dura y la muy dura:

* Empezamos por el tutorial de https://github.com/angular/universal. (La vía muy dura). Empezamos contentos nos perdemos y no entendemos nada,
* Nos bajamos el Starter Kit, lo hacemos funcionar, nos sentimos en la cima del mundo. Agregamos cuatro cosas, todo deja de funcionar y no sentimos insignificantes.

En nuestro caso, vamos a ser razonables por una vez y vamos a tomar como base el Starter Kit.

### Cosas "universalmente" importantes:

1. Si vas a usar *templateUrl* y/o *styleUrls* tienes que usar _angular2-template-loader_.
2. *window*, *document*, *navigator* y otros objetos BOM, no existen en el servidor. Eso aplica a otras librerías y frameworks como jQuery y Polymer. ¿Qué podemo hacer?:
    * Limitar su uso y condicionarlo a _isBrowser / isNode_ ```import { isBrowser, isNode } from 'angular2-universal'```
    * Usar el DOM desde "@angular/platform-browser". https://github.com/angular/angular/blob/e3687706c71beb7c9dbdae1bbb5fbbcea588c476/modules/%40angular/platform-browser/src/dom/dom_adapter.ts#L34
3. No user *setTimeout* es caos, muerte y destrucción en el servidor.
4. No manipules el *nativeElement* directamente. usa *Render*:

```javascript
constructor(element: ElementRef, renderer: Renderer) {
  renderer.setElementStyle(element.nativeElement, 'font-size', 'x-large');
}
```
5. Si la aplicación realiza peticiones XHR usa *UniversalCache* (https://github.com/angular/universal-starter/blob/master/src/%2Bapp/shared/model/model.service.ts#L34-L50) en vez del módulo *http*, esto evitará que la llamada se vuelva a lanzar desde el cliente una vez cargada la aplicación.

Ya vimos esto:

1. pre-render - Genera un HTML estático en tiempo de construcción que se puede desplegar en un CDN o en un servidor estático.
2. re-render - Ejecuta la aplicación con cada petición.

Pero, con respecto al Browser, pasan las siguientes cosas:

* El navegador recibe la carga inicial desde el servidor
* El usuario ve la vista del servidor
* Preboot crea DIVs ocultos que se utilizarán para el arranque de cliente y comienza a registrar eventos
* El navegador realiza solicitudes asíncronas de recursos adicionales (imágenes, JS, CSS, etc.)
* Una vez cargados los recursos externos, comienza el arranque del cliente angular
* Vista de cliente renderizada a la div oculta creada por Preboot
* Bootstrap completo, por lo que el cliente angular llama a preboot.done()
* Los eventos registrados por Preboot son reproducidos con el fin de ajustar el estado de la aplicación para reflejar los cambios realizados por el usuario antes de Angular bootstrapped (es decir, escribir en el cuadro de texto, clic en el botón, etc)
* Preboot cambia la div de vista de cliente oculta para la vista de servidor visible div
* Por último, Preboot realiza una limpieza en la vista visible del cliente

### ¿Y si usamos caché?

* En el caso que usemos pre-render. Blanco y en botella.
* En el caso de re-rener, tenemos las siguientes estrategias:

    * Page caching - Utilizar un servicio como CloudFlare o Akamai para almacenar en caché la página generada dinámicamente por períodos cortos de tiempo
    * Object caching - El compilador AoT de Angular para Universal permite generar artefactos a partir del código de la aplicación que pueden reutilizarse entre evitando muchas solicitudes de servidor
    * Data caching - La aplicación Universal en el servidor extraerá datos de su API y es posible compartir esos datos con la aplicación cliente de navegador para que el cliente no tenga que extraer los datos de nuevo.

### 4 conceptos importantes

#### 1 - Polyfills

```javascript
import 'angular2-universal-polyfills';
```

Esto carga los siguientes polyfills:

```javascript
import 'es6-promise';
import 'es6-shim';
import 'reflect-metadata';
```

#### 2 - Bootstrapping

Como deberías tener en cuenta en el desarrollo de Non-Universal Angular 2, primero debes iniciar la aplicación. El proceso de bootstrapping es ligeramente diferente en los lados del navegador y de node. En el nivel más alto, hay algunas funciones de conveniencia que envuelven una gran cantidad de funcionalidad de bajo nivel. Es posible bajar un nivel a una API más compleja, pero en el nivel alto, bootstrapping se parece a esto:

```javascript
// browser side bootstrap:
platformRef.bootstrapModule(MainModule);

// node side bootstrap:
app.engine('.html', createEngine({}));
app.get('/*', (req, res) => {
  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  });
});
```

En resumen, la incialización de la aplicación es ligeramente distinta según el lugar donde la ejecutemos.

#### 3 - Server Context

Una pregunta muy común es cómo tener control sobre el contexto del lado del servidor para hacer cosas como redirecciones del lado del servidor o para acceder a los datos en el encabezado de solicitud del servidor. La clave para hacer algo de esto es obtener acceso a los objetos de solicitud y respuesta Express en nuestro código. Estos objetos pasan al bootstrap del servidor:

```javascript
app.get('/*', (req, res) => {
  res.render('index', {
    req,  // Express request object
    res,  // Express response object
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: 'http://localhost:3000'
  });
});
```

OJO. Según la documentación oficial: "This API will be improved in the near future.".

![alt text](./resources/confused_vincent_vega.gif "¿Pero qué es esto?")

#### 4 - DI Swapping

El concepto de DI Swapping es absolutamente crítico para el desarrollo universal. Básicamente, esto es cuando se utiliza Angular DI para abstraer el código que debe ser específico para el navegador o en el servidor. Así, por ejemplo, si el código necesita acceder a un valor en la cookie del usuario, haría algo como esto:

* Crear una interfaz de clase abstracta Cookie que tiene una función vacía get().
* Crear una versión específica del navegador llamada CookieBrowser en la que la función get() donde hace referencia a window.document.cookie
* Crear una versión específica de node llamada CookieNode en la que la función get() hace referencia a Zone.current.get('req').
* En el NgModule del Browser, segurarnos de configurar CookieBrowser como un provider para Cookie.
* En el NgModule del servidor, asegurarnos de establecer CookieNode como un provider para Cookie.

Esto es a grandes rasgos, lo que implica DI Swapping.

### *preboot*

El propósito de esta biblioteca es ayudar a administrar la transición de estado (es decir, eventos, enfoque, datos) desde una vista web generada por el servidor a una vista web generada por el cliente. Los casos de uso más comunes incluyen:

* Aplicaciones universales re-render (por ejemplo, Angular 2): la aplicación cliente genera una vista nueva que reemplaza la vista del servidor
* Aplicaciones universales que se hidratan (por ejemplo, React): la aplicación cliente se agrega a la vista del servidor existente
* Static server-side - Se usa una plantilla estática para la carga inicial de la página

https://universal.angular.io/quickstart/
