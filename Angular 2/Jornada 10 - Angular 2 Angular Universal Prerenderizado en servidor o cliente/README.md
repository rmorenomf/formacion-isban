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

Resuelve dos problemas de SPA:

1. *Performance*. Los clientes no tienen porqué ser rápidoso disponer de los suficientes recursos como para realizar una carga y ejecución fluida. Teléfonos, Tabletas, etc.

2. *SEO*. Los motores de busqueda no se llevan muy bien con SPA ya que, en el caso de que sean capaces de ejecutar el JavaScript, los mecanimos de navgación complejos de las SPA 
limitan las posibilidades de exploración de los robots.

3. *Mantenibilidad*. En especial con lógica que tiene que estar tanto en cliente como en servidor, que hace lo mismo pero que tenemos que codificarla dos veces; validaciones de formulario, etc.

4. *Social media*. No es trivial hacer una previsualización de contenido para ser integrado en una red social ya que el contendido se genera dentro de un contexto de aplicación que no siempre puede ser instanciado en/desde otro entorno.

Isomorfismo es quedarse con lo mejor de ambos mundos.

## Isomorfismo con Angular 2.

### Fuentes de información

La documentación oficial es algo escasa:

https://universal.angular.io/
https://github.com/angular/universal

Excelente tutorial:

http://blog.angular-university.io/angular-2-universal-meet-the-internet-of-the-future-seo-friendly-single-page-web-apps/

### Starter Kit

https://github.com/angular/universal-starter