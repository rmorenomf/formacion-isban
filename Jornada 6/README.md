# Jornada 6: SaSS con BEM, Linting y convenciones JS.

## SaSS

http://sass-lang.com/

Revisión de la funcionalidad mas destacada.

_Instalar y hacer pruebas de css_

Las instalación es un poco pesada ya que tiene que instalar Ruby por eso mejor mirar el manual: 

http://sass-lang.com/install

pero muy probablemente tengas que instalar Ruby:

http://rubyinstaller.org/

> gem install sass

Lo mejor es instalar Gulp y atomatizar la ejecución:

https://www.npmjs.com/package/gulp-sass

> npm install gulp-sass --save-dev

_Ver ejemplillo de proyecto con SASS no olvidar mostrar como se activa el Chrome en el apartado Sources el "Enable CSS Sourcemaps"_

## BEM

http://getbem.com/

BEM constituye la metodología que usaremos para nombrar y clasificar selectores CSS de manera estricta, transparente e informativa. Este método se basa en nombrar las clases en un modo muy específico, ayudándonos a distinguir de manera simple de qué objeto hablamos y si tiene o no aplicado algún tipo de modificador en su estilo, ya sea por interacción del usuario, o por tipología del objeto. Cuando utilicemos la metodología BEM, deberemos tener en cuenta que solamente usaremos nombres de clases, nunca IDs, para fomentar así la reutilización de código.

Como su nombre indica, BEM distingue claramente 3 conceptos: el Bloque, el Elemento y el Modificador.

### El Bloque
Representa la entidad independiente, es decir, el objeto al que aplicar el estilo. Un bloque puede componerse de otros bloques. Un buscador simple es un bloque simple, mientras que la cabecera de una web es un bloque compuesto.

Para ejemplificarlo pensaremos en la cabecera de una web: pondremos la clase de nuestro bloque como

```css
.main-header
```

### El Elemento
Figura como una pieza concreta, de un Bloque cualquiera, que cumple una función. Evidentemente, un bloque puede estar compuesto de varios elementos. Las clases con las que identificamos cada elemento las escribiremos después del nombre del bloque, y las separaremos con dos guiones bajos:

```css
bloque__element
```

La idea de la doble barra sirve para ayudarnos a navegar y manipular nuestro código CSS.

Para nuestro ejemplo, tendremos los siguientes elementos:

```css
.main-header__brand
.main-header__primary-nav
.main-header__recursive-nav
.main-header__lang-chooser
```

La nomenclatura de las clases que usemos va completamente a gusto del desarrollador. En el ejemplo, main-header__primary-nav podría ser main-header__primaryNav. Lo más importante es que nos decidamos por una manera y sea esa la que usemos en todo el proyecto.

### El Modificador
Son las entidades que usaremos para definir la apariencia o comportamiento de un Bloque o Elemento concreto. Su uso es opcional, pero nos será muy útil para separar claramente el objeto de su estilo gráfico.

Los Modificadores los representaremos con doble guión, por ejemplo:

```css
bloque—modificador_bloque
bloque__elemento—modificador_elemento
```

Si usamos el selector de idiomas del ejemplo, un modificador claro sería si aparece desplegado o no:

```css
main-header__lang-chooser
main-header__lang-chooser--isOpen
```

Te darás cuenta que si la idea de todo esto es generar código reutilizable, nos encontramos ante una pequeña inconsistencia: tendremos que repetir el código. Para solucionar esto, usaremos SASS y su propiedad @extend. De esta manera tendremos un único código.

```css
main-header__lang-chooser{
position: relative;
//estilo de nuestro elemento...
}

main-header__lang-chooser--isOpen{
@extends main-header__lang-chooser;
position: block;
}
```

Hemos visto cómo funciona BEM y, sobre todo, cómo nos puede ayudar a estructurar nuestro código CSS: a mantenerlo limpio, reusable y mucho más semántico. Habrá quien piense que los nombres de las clases se alargan demasiado, pero en el fondo dotamos a nuestro HTML y CSS de legibilidad, dado que especificamos en cada clase su uso y su porqué.

BEM requiere de una planificación previa, donde el diseñador y el desarrollador trabajen en conjunto, identificando todos los Bloques de diseño, sus Elementos, y si tienen o no Modificadores.

Una vez pruebas este tipo de sistema, te preguntas cómo es posible haber maquetado tu CSS sin él.

## Linting

Nos permite revisar nuestro código para encontrar errores potenciales de ejecución. 
Suple la carencia de un compilador.
Tenemos varias opciones a gusto del consumidor. No solo para JavaScript, también podemos hacer linting de CSS.
A parte de los posibles errores podemos configurar reglas de codificación.
Podemos configurar las herramientas de integración para evitar desplieges y commits de cosas que no pasen el control de linting.

En mi experiencia solo he usado jSLint: 

### jSLint

Es uno de los primeros.

#### Pros:

* Viene configurado con muchas reglas.

#### Contras:

* No tiene fichero de configuración. eso limita las posibilidades de configuración.
* Algunas reglas no se pueden quitar.
* No se pueden crear reglas propias.
* Documentación un poco pincho.
* Algunas veces no es claro lo que nos está diciendo que está fallando.

### JSHint

Mas moderno que jSlint y pensado para solucionar algunos de sus problemas

#### Pros:

* Fichero de configuración.
* Soporte para librerias externas.(Ejemplo jQuery)
* Soporte de ES6.

#### Contras:

* Algunas veces no es claro lo que nos está diciendo que está fallando.
* Tiene dos modos de funcionamiento "relaxing" y "stricter" que realiza mas verificaciones. Y complican algo la configuración.
* No se pueden crear reglas propias.

### ESLint

Más moderno que los otros dos.

#### Pros:

* Flexibilidad. Se pueden activar y desactivar reglas y agregar configuración extra para las reglas existentes.
* Extensible mediante plugins.
* Mejora los mensajes de error que los anteriores.
* Buen conjunto de reglas, mas extensos que los anteriores.
* Bueno soporte para ES6.

#### Contras:

* Se requiere algo de configuración.
* Algo lento.  

*Vamos a instalar y a trastear con ESLint*
_¿Qué tal si abrimos un proyecto existente y le damos caña con el Linter?_

1. Instalar siguiendo la web ( http://eslint.org/docs/user-guide/getting-started ), pero mejor lo instalamos global.

> npm init
> npm install eslint --save-dev -g
> eslint --init
> eslint yourfile.js

2. Se puede especificar un tratamiento especial en ficheros particulares mediante comentarios en la cabecera de los ficheros:

> /* eslint-env node, mocha */

Algunos detalles de configuración:

http://eslint.org/docs/user-guide/configuring

3. Instalamos Gulp:

> npm install --global gulp-cli
> npm install gulp-eslint --save-develop
> Creamos el fichero gulpfile.js y creamos el stream de gulp para eslint.
> gulp 

Segumimos las instrucciones:

https://www.npmjs.com/package/gulp-eslint

## Convenciones JS (CSS)

A diferencia del Linting no se trata de encontrar errores, se trata de estandarizar dentro del proyecto la forma como codificamos: Nombres de variables, estructira del código. No solo del JavaScript, también de los CSS's y del HTML (Estilos en línea, etc).

¿Por qué es necesario establecer este tipos de reglas?

Podemos establecer las nuestras o ponernos en manos de gente que se ha tomado su tiempo para establecer sus propias reglas:

1. airbnb 
2. Idiomatic.js
3. jQuery Core Style Guidelines
4. Google JavaScript Style Guide
5. Dojo Style Guide
6. JavaScript "Standard" Style
7. Node.js Style Guide
8. ...

Airbnb está guay y además tiene documentación en Español y Catalán.

https://github.com/airbnb/javascript

Español:
https://github.com/paolocarrasco/javascript-style-guide

No solo ofrece guías de JS también se atreve con el CSS.

_Vamos a echar un ojo a las reglas a ver que aprendemos_

Podemos incorporar las validaciones a ESLint

> npm install --save-dev eslint-config-airbnb

## Enlaces de interés

https://webdesign.tutsplus.com/es/articles/an-introduction-to-the-bem-methodology--cms-19403
https://github.com/airbnb/javascript
https://github.com/airbnb/javascript/tree/es5-deprecated/es5
https://github.com/airbnb/javascript/tree/master/css-in-javascript
https://github.com/airbnb/css