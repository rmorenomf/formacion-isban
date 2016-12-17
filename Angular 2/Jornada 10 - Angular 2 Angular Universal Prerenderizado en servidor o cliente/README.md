# Angular 2 Universal / Isomorfismo / Renderizado en servidor

## Plan de trabajo

El objetivo es definir claramente los conceptos de isomirfismo o renderizado en el servidor. 

## Qué es y para que sirve

> "isomorfismo" del griego iso-morfos: Igual forma. Tal vez no sea el mejor término.

Nuestras aplicaciones JavaScript son isomorficas en tanto dada una línea de código podemos ejecutarla tanto en el navegador (cliente) como en el servidor.

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

Una forma de solucionar este problema es registrar todos los eventos que a disparado el usuario para ejecutarlos una vez que Angular se ha inciado.

## Isomorfismo con Angular 2

### Fuentes de información

La documentación oficial es algo escasa:

https://universal.angular.io/
https://github.com/angular/universal

Excelente tutorial:

http://blog.angular-university.io/angular-2-universal-meet-the-internet-of-the-future-seo-friendly-single-page-web-apps/

Cosas importantes:

1. Nunca toques el DOM
2. 

### Starter Kit

https://github.com/angular/universal-starter

### Por donde empezar
