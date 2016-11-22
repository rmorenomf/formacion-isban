# Jornada 5

Angular 2: Observables, Routing, http. Jornada de práctica:

## Plan de trabajo

Vamos a hacer un pequeño parón para consolidar los conceptos aprendidos. Para ello vamos a hacer un perfilado de los elementos propios de la arquitectura que nos quedan; Observables, Routing y http y el resto del tiempo lo vamos a dedicar a crear un proyecto que funcione.

## Observables

Imagínate que estas desarrollando una nueva página web y debes registrar el movimiento del ratón del usuario por alguna razón. Algo así:

```javascript
 document.onmousemove = function (t) {};
 ```

 Esta función va a registrar ingentes cantidades de datos puesto que el ratón es algo que se mueve mucho. Pues bien, esto es un flujo de datos o stream.

Los Observables se basan en dos patrones de programación bien conocidos que es el patrón “Observer” y el patrón “Iterator”. Un Observable es un mecanismo creado para representar los flujos que ya hemos visto. De esta manera no debemos pensar en arrays, eventos de ratón, llamadas http al servidor… separados, sino en algo que los agrupa a todos, el Observable. De alguna manera, cuando quieras hacer programación reactiva con un array, habrá un método para poder transformar el array en Observable y poder trabajar con él de esta manera.


## trabajo

https://github.com/codingforentrepreneurs/Blog-API-with-Django-Rest-Framework

https://github.com/7WebPages/drf-demo/