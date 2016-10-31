# Jornada 1 

HTML5: Semántica y accesibilidad. Repasaremos y aprenderemos las etiquetas más adecuadas en cada momento y veremos atributos y herramientas necesarias para cumplir con los estándares de accesibilidad: role, wai-aria.

## Plan de trabajo

1. Dar un repaso a una página index.html bien creada prestando atención a todos los elementos.
2. Repasar las necesidad del marcado semántico. Repasar qué es y porqué es necesario.

3. Introducción a WAI-ARIA. Repasar los conceptos de rol, estado y propiedad. Herramientas asistivas. Ver ejemplos:
    
    * Imágenes
    * Bloques de navegación
    * Slider
    * TabIndex
    * Forms
    * Tablas

4. Taller: Instalar NVDA.

## Paseo por index.html

### Buen uso del atributo "rel"

Fuente: http://www.w3schools.com/tags/att_link_rel.asp

Name | Description
--- | ---
alternate: | Provides a link to an alternate version of the document (i.e. print page, translated or mirror). Example: ```<link rel="alternate" type="application/atom+xml" title="W3Schools News" href="/blog/news/atom">```
author | Provides a link to the author of the document
dns-prefetch | Specifies that the browser should preemptively perform DNS resolution for the target resource's origin
help | Provides a link to a help document. Example: ```<link rel="help" href="/help/">```
icon | Imports an icon to represent the document. Example: ```<link rel="icon" href="/favicon.ico" type="image/x-icon">```
license	| Provides a link to copyright information for the document
next | Provides a link to the next document in the series
pingback | Provides the address of the pingback server that handles pingbacks to the current document (Pingback es un método para que los autores de la web soliciten una notificación cuando alguien enlaza uno de sus documentos)
preconnect | Specifies that the browser should preemptively connect to the target resource's origin.
prefetch | Specifies that the browser should preemptively fetch and cache the target resource as it is likely to be required for a follow-up navigation
preload | Specifies that the browser agent must preemptively fetch and cache the target resource for current navigation according to the destination given by the "as" attribute (and the priority associated with that destination).
prev | Indicates that the document is a part of a series, and that the previous document in the series is the referenced document
search | Provides a link to a resource that can be used to search through the current document and its related pages.
stylesheet | Imports a style sheet

### Estrategias de carga de la página para obtener un mejor rendimiento o mejora la percepción de velocidad:

1. Cargar lo esencial primero.
2. Aplaza la carga del contenido no esencial para después. Carga condicional.
3. Renderizado progresivo de imágenes.
    
    * Crear el JPG como progressive.
    * Crear el PNG como interlaced.
    * Mostrar un place holder con el bloque y el color mayoritario de la imagen (esta estrategia la usa google en el buscador de imágenes). 
    * Usa SVG (cuando se pueda).
    * Utiliza Tipografias (cuando se pueda).         
    * Tailored image sizes: Utilizar tamaños de imágenes diferentes según el dispositivo. 

4. Auto-precarga o Cache predictivo de navegador.
5. Usar eventos touch.
    - Esto aplica solo a las aplicaciones móviles. Cuando se toca la pantalla en necesario un tiempo que puede ser entre 300-500 milisegundos 
    para traducir el elevento de tipo touch a un evento de tipo click.

6. Para tareas pesadas usar Webworkers.

Mejorar la apreciación de velocidad 

1. Si algo va a tardar mucho tiempo indica la razón.
2. Muestra indicadores de progreso.

#### The PRPL Pattern (Progressive Web Apps)

Three cutting-edge new features of the web platform—Web Components, HTTP/2 + Server Push, and Service Worker—all work seamlessly together to provide a totally new and amazingly efficient way to deliver applications to users.

We call this the "PRPL Pattern", and the Polymer App Toolbox and Polymer CLI make it easy to build an application to use this strategy for delivery. The PRPL pattern stands for:

1. Push components critical for initial route
2. Render the initial route ASAP
3. Pre-cache components for remaining routes
4. Lazy-load and create next routes on-demand

### Etiquetas semánticas HTML5

Tag | Description
--- | ---
```<article>``` | Defines an article
```<aside>``` | Defines content aside from the page content
```<details>``` | Defines additional details that the user can view or hide
```<figcaption>``` | Defines a caption for a ```<figure>``` element
```<figure>``` | Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc.
```<footer>``` | Defines a footer for a document or section
```<header>``` | Specifies a header for a document or section
```<main>``` | Specifies the main content of a document
```<mark>``` | Defines marked/highlighted text
```<nav>``` | Defines navigation links
```<section>``` | Defines a section in a document
```<summary>``` | Defines a visible heading for a ```<details>``` element
```<time>``` | Defines a date/time

![alt text](https://github.com/rmorenomf/formacion-isban/blob/master/Jornada%201/resources/html-html5.gif?raw=true "HTML5 semántica")

### Elementos de formulario

Tag | Description
--- | ---
```<datalist>``` | Defines pre-defined options for input controls
```<keygen>``` | Defines a key-pair generator field (for forms)
```<output>``` | Defines the result of a calculation

### Nuevos tipos de entrada (input)

* color
* date
* datetime
* datetime-local
* email
* month
* number
* range
* search
* tel
* time
* url
* week

#### Y los nuevos atributos para los inputs

* autocomplete
* autofocus
* form
* formaction
* formenctype
* formmethod
* formnovalidate
* formtarget
* height and width
* list
* min and max
* multiple
* pattern (regexp)
* placeholder
* required
* step

### Elementos gráficos

Tag | Description
--- | ---
```<canvas>``` | Draw graphics, on the fly, via scripting (usually JavaScript)
```<svg>``` | Draw scalable vector graphics

### Elementos Multimedia

Tag | Description
--- | ---
```<audio>``` | Defines sound content
```<embed>``` | Defines containers for external applications (like plug-ins)
```<source>``` | Defines sources for <video> and <audio>
```<track>``` | Defines tracks for <video> and <audio>
```<video>``` | Defines video or movie content

## Otros elementos

HTML5 lista completa de etiquetas:

https://github.com/rmorenomf/formacion-isban/blob/master/Jornada%201/resources/listaetiquetasHTML5.pdf

* Webworkers
* Drag & Drop
* WebSockets WebRTC
* Caché de la aplicación
* IndexDB
* File API / Blob

## Accesibilidad

El propósito de ARIA es: dotar de significado explícito a un contenido que no lo tiene. En detalle:

* Establecer el rol de un elemento
* Establecer la relación entre elementos
* Informar del estado de un elemento
* Hacer accesibles los controles a través del teclado

Para ello se vale de una serie de elementos estándar:

### Roles y estados 



### Landmark Roles (WAI-ARIA). Navegación más accesible y semántica.

El objetivo es que sea más fácil de "ojear", comprender y navegar para las personas que usan un lector de pantalla.

Cuando una página web está correctamente marcada permitimos que los usuarios que usan un lector de pantalla no tengan que hacer una lectura lineal de toda la página. 
Utilizando determinadas teclas podrán "ojear" el documento y acceder directamente a las partes del mismo que les interesan.

Por ejemplo, si tenemos una correcta estructura de encabezados, marcados como tales, un usuario de lector de pantalla (como JAWS o NVDA) podrá pulsar la tecla “h” para “ojear” los encabezados. Cada vez que pulse dicha tecla el lector le leerá el siguiente encabezado y podrá seguir leyendo a partir del que le interese.

### Pasos y buenas prácticas para aplicar WAI-ARIA

En el documento del W3C, WAI-ARIA 1.0 Primer, se nos indican los pasos y buenas prácticas para aplicar WAI-ARIA.

* Usa marcado nativo cuando sea posible. Si puedes usar <input type=”checkbox”> o <button> úsalos en vez de <div role=”checkbox”> o <div role=”button>. Ten en cuenta que el rol ARIA anula el rol nativo. 
* Usa los roles adecuados. Según la especificación y recuerda que el rol no se debe cambiar dinámicamente.
* Conserva la estructura semántica. Forma grupos lógicos (por ejemplo con role=”group”, role=”toolbar”); incluye landmark roles para facilitar la navegación por teclado; 
define las live regions (zonas que cambian dinámicamente sin intervención del usuario)
* Construye relaciones. Busca relaciones entre los elementos y márcalas con el atributo más apropiado (por ejemplo aria-controls para las pestañas. 
Puedes consultar más en la especificación: Relationship Attributes) Ten en cuenta que algunas relaciones son automáticas 
como la de un label con su input.
* Cambia los estados y propiedades en respuesta a los eventos. Usa solo atributos soportados por el rol o el elemento elegido. Cambia dinámicamente por javascript los estados y propiedades 
que se introduzcan durante el ciclo de vida del elemento, por lo general en respuesta a los eventos de entrada de usuario; 
de esta manera los agentes de usuario notificarán a los productos de apoyo los cambios de estado.

#### Accesible mediante el teclado

El usuario debe poder interactuar con los controles mediante el teclado. Utilizará el tabulador para acceder a ellos (no solo debe ser accesible mediante el tabulador sino también seguir un orden de tabulación lógico) y a menudo las teclas  de flechas para moverse en el interior de controles complejos.

Se debe implementar el comportamiento de las teclas de flechas, de espacio, etc. seguiendo los patrones definidos en WAI-ARIA 
Authoring Practices Guide (Keyboard and Structural Navigation) y WAI-ARIA Authoring Practices Guide (Design Patterns), donde 
se incluyen ejemplos como el comportamiento esperado de la tecla de espacio, tabulación y las flechas arriba y abajo en los grupos de radiobuttons.

Sincroniza la interfaz visual con la interfaz accesible
Y para ello te es muy útil los CSS attribute selectors, teniendo en cuenta el soporte para los navegadores más antiguos. 
Podéis consultar un ejemplo de cómo aplicarlo en General Steps for Building an Accessible Widget with WAI-ARIA 
(punto 7: "Synchronize the visual UI with accessibility states and properties for supporting user agents")

#### WCAG:

Las pautas de accesibilidad al contenido web (Web Content Accessibility Guidelines - WCAG) son unos documentos que explican cómo hacer el contenido Web accesible para personas con discapacidad. Cuando se habla de contenido se refiere a la información en una página web o aplicación, incluyendo texto imágenes, formas, sonidos, etc. En la actualidad existen dos conjuntos de pautas de accesibilidad de contenidos Web: WCAG1.0 y WCAG2.0. Estos dos conjuntos están organizados y estructurados de diferente forma:
WCAG1.0. Son 14 pautas que engloban los principios generales del diseño accesible. En total poseen 65 puntos de verificación y cada uno de ellos está asociado a una prioridad: Simple A, Doble A y Triple A.
WCAG2.0. Se organiza en cuatro principios fundamentales para la accesibilidad del contenido:

* Perceptible
* Operable
* Comprensible
* Robusto

Cada uno de estos principios tiene asociadas una o más pautas y en total forman 61 criterios de conformidad, organizados según su nivel de cumplimiento asociado: Simple A, Doble A y Triple A.
Existe cierta equivalencia entre los puntos de verificación de WCAG1.0 y WCAG2.0 y con la Norma UNE 139803, que actualmente regula el acceso de las personas con discapacidad a las tecnologías, productos y servicios relacionados con la Sociedad de la Información y medios de comunicación social. A pesar de que esta norma es compatible las pautas WCAG1.0, existe una petición por parte de AENOR de que se actualice la regulación existente con las pautas WCAG2.0, por lo que será en las que se base el presente texto.
En las WCAG2.0 existen tres niveles de conformidad:
Existen tres niveles de conformidad:

1. WCAG 2.0 Nivel A: para lograr conformidad con el Nivel A (el mínimo), la página web debe satisfacer todos los Criterios de Conformidad del Nivel A, o proporcionar una versión alternativa conforme.
2. WCAG 2.0 Nivel AA: para lograr conformidad con el Nivel AA, la página web debe satisfacer todos los Criterios de Conformidad de los Niveles A y AA, o proporcionar una versión alternativa conforme al Nivel AA.
3. WCAG 2.0 Nivel AAA: Para lograr conformidad con el Nivel AAA, la página web debe satisfacer todos los Criterios de Conformidad de los Niveles A, AA y AAA, o proporcionar una versión alternativa conforme al Nivel AAA.

##### Además, existen las siguientes especificaciones:

* El nivel de conformidad es para páginas completas, no para fragmentos de ella.
* Cuando varias páginas forman parte de un proceso, todas las páginas implicadas deben ser conformes con el nivel especificado o un nivel superior.
* Si una aplicación está implementada en una tecnología que no es compatible con las pautas de accesibilidad, debe proporcionarse una versión que sí lo sea.
* Si una página posee una tecnología que no es compatible con la accesibilidad o no es conforme con cierto nivel, no debe impedir el acceso al contenido del resto de la página.
 
##### La declaración de conformidad es opcional, pero si se añade debe incluir la siguiente información:

* Fecha de la declaración de conformidad
* Título, versión y URI de las Pautas: "Web Content Accessibility Guidelines 2.0 en http://www.w3.org/TR/WCAG20/"
* Nivel de conformidad: A, AA o AAA
* Listado de las páginas que están incluidas en la declaración de conformidad
* Listado de tecnologías de contenido web de las que se depende (se recomienda un enlace al software concreto)
* Si se emplea un logo de conformidad, éste constituye una declaración y debe ir acompañado de todos los componentes requeridos para la conformidad.

#### PUNTOS DE VERIFICACIÓN PRIORIDAD 1

En general (Prioridad 1)
* 1.1 Proporcione un texto equivalente para todo elemento no textual (Por ejemplo, a través de "alt", "longdesc" o en el contenido del elemento). Esto incluye: imágenes, representaciones gráficas del texto, mapas de imagen, animaciones (Por ejemplo, GIFs animados), "applets" y objetos programados, "ascii art", marcos, scripts, imágenes usadas como viñetas en las listas, espaciadores, botones gráficos, sonidos (ejecutados con o sin interacción del usuario), archivos exclusivamente auditivos, banda sonora del vídeo y vídeos.
* 2.1 Asegúrese de que toda la información transmitida a través de los colores también esté disponible sin color, por ejemplo mediante el contexto o por marcadores.
* 4.1 Identifique claramente los cambios en el idioma del texto del documento y en cualquier texto equivalente (por ejemplo, leyendas).
* 6.1 Organice el documento de forma que pueda ser leído sin hoja de estilo. Por ejemplo, cuando un documento HTML es interpretado sin asociarlo a una hoja de estilo, tiene que ser posible leerlo.
* 6.2 Asegúrese de que los equivalentes de un contenido dinámico son actualizados cuando cambia el contenido dinámico.
* 7.1 Hasta que las aplicaciones de usuario permitan controlarlo, evite provocar destellos en la pantalla.
* 14.1 Utilice el lenguaje apropiado más claro y simple para el contenido de un sitio.

Y si utiliza imágenes y mapas de imagen (Prioridad 1)
* 1.2 Proporcione vínculos redundantes en formato texto para cada zona activa de un mapa de imagen del servidor.
* 9.1 Proporcione mapas de imagen controlados por el cliente en lugar de por el servidor, excepto donde las zonas sensibles no puedan ser definidas con una forma geométrica.

Y si utiliza tablas (Prioridad 1)
* 5.1 En las tablas de datos, identifique los encabezamientos de fila y columna.
* 5.2 Para las tablas de datos que tienen dos o más niveles lógicos de encabezamientos de fila o columna, utilice marcadores para asociar las celdas de encabezamiento y las celdas de datos.

Y si utiliza marcos ("frames") (Prioridad 1)
* 12.1 Titule cada marco para facilitar su identificación y navegación.

Y si utiliza "applets" y "scripts" (Prioridad 1)
* 6.3 Asegure que las páginas sigan siendo utilizables cuando se desconecten o no se soporten los scripts, applets u otros objetos programados. Si esto no es posible, proporcione información equivalente en una página alternativa accesible.

Y si utiliza multimedia (Prioridad 1)
* 1.3 Hasta que las aplicaciones de usuario puedan leer en voz alta automáticamente el texto equivalente de la banda visual, proporcione una descripción auditiva de la información importante de la banda visual de una presentación multimedia.
* 1.4 Para toda presentación multimedia tempodependiente (por ejemplo, una película o animación) sincronice alternativas equivalentes (por ejemplo, subtítulos o descripciones de la banda visual) con la presentación.

Y si todo lo demás falla (Prioridad 1)
* 11.4 Si, después de los mayores esfuerzos, no puede crear una página accesible, proporcione un vínculo a una página alternativa que use tecnologías W3C, sea accesible, tenga información (o funcionalidad) equivalente y sea actualizada tan a menudo como la página (original) inaccesible.

PUNTOS DE VERIFICACIÓN PRIORIDAD 2

En general (Prioridad 2)

* 2.2 Asegúrese de que las combinaciones de los colores de fondo y primer plano tengan el suficiente contraste para que sean percibidas por personas con deficiencias de percepción de color o en pantallas en blanco y negro [Prioridad 2 para las imágenes. Prioridad 3 para los textos].
* 3.1 Cuando exista un marcador apropiado, use marcadores en vez de imágenes para transmitir la información.
* 3.2 Cree documentos que estén validados por las gramáticas formales publicadas.
* 3.3 Utilice hojas de estilo para controlar la maquetación y la presentación.
* 3.4 Utilice unidades relativas en lugar de absolutas al especificar los valores en los atributos de los marcadores de lenguaje y en los valores de las propiedades de las hojas de estilo.
* 3.5 Utilice elementos de encabezado para transmitir la estructura lógica y utilícelos de acuerdo con la especificación.
* 3.6 Marque correctamente las listas y los ítems de las listas.
* 3.7 Marque las citas. No utilice el marcador de citas para efectos de formato tales como sangrías.
* 6.5 Asegúrese de que los contenidos dinámicos son accesibles o proporcione una página o presentación alternativa.
* 7.2 Hasta que las aplicaciones de usuario permitan controlarlo, evite el parpadeo del contenido (por ejemplo, cambio de presentación en periodos regulares, así como el encendido y apagado).
* 7.4 Hasta que las aplicaciones de usuario proporcionen la posibilidad de detener las actualizaciones, no cree páginas que se actualicen automáticamente de forma periódica.
* 7.5 Hasta que las aplicaciones de usuario proporcionen la posibilidad de detener el redireccionamiento automático, no utilice marcadores para redirigir las páginas automáticamente. En su lugar, configure el servidor para que ejecute esta posibilidad.
* 10.1 Hasta que las aplicaciones de usuario permitan desconectar la apertura de nuevas ventanas, no provoque apariciones repentinas de nuevas ventanas y no cambie la ventana actual sin informar al usuario.
* 11.1 Utilice tecnologías W3C cuando estén disponibles y sean apropiadas para la tarea y use las últimas versiones que sean soportadas.
* 11.2 Evite características desaconsejadas por las tecnologías W3C.
* 12.3 Divida los bloques largos de información en grupos más manejables cuando sea natural y apropiado.
* 13.1 Identifique claramente el objetivo de cada vínculo.
* 13.2 Proporcione metadatos para añadir información semántica a las páginas y sitios.
* 13.3 Proporcione información sobre la maquetación general de un sitio (por ejemplo, mapa del sitio o tabla de contenidos).
* 13.4 Utilice los mecanismos de navegación de forma coherente.

Y si utiliza tablas (Prioridad 2)
* 5.3 No utilice tablas para maquetar, a menos que la tabla tenga sentido cuando se alinee. Por otro lado, si la tabla no tiene sentido, proporcione una alternativa equivalente (la cual debe ser una versión alineada).
* 5.4 Si se utiliza una tabla para maquetar, no utilice marcadores estructurales para realizar un efecto visual de formato.

Y si utiliza marcos ("frames") (Prioridad 2)
* 12.2 Describa el propósito de los marcos y cómo éstos se relacionan entre sí, si no resulta obvio solamente con el título del marco.

Y si utiliza formularios (Prioridad 2)
* 10.2 Hasta que las aplicaciones de usuario soporten explícitamente la asociación entre control de formulario y etiqueta, para todos los controles de formularios con etiquetas asociadas implícitamente, asegúrese de que la etiqueta está colocada adecuadamente.
* 12.4 Asocie explícitamente las etiquetas con sus controles.

Y si utiliza "applets" y "scripts" (Prioridad 2)
* 6.4 Para los scripts y applets, asegúrese de que los manejadores de eventos sean independientes del dispositivo de entrada.
* 7.3 Hasta que las aplicaciones de usuario permitan congelar el movimiento de los contenidos, evite los movimientos en las páginas.
* 8.1 Haga los elementos de programación, tales como scripts y applets, directamente accesibles o compatibles con las ayudas técnicas [Prioridad 1 si la funcionalidad es importante y no se presenta en otro lugar; de otra manera, Prioridad 2].
* 9.2 Asegúrese de que cualquier elemento que tiene su propia interfaz pueda manejarse de forma independiente del dispositivo.
* 9.3 Para los "scripts", especifique manejadores de evento lógicos mejor que manejadores de evento dependientes de dispositivos.

PUNTOS DE VERIFICACIÓN PRIORIDAD 3

En general (Prioridad 3)
* 4.2 Especifique la expansión de cada abreviatura o acrónimo cuando aparezcan por primera vez en el documento.
* 4.3 Identifique el idioma principal de un documento.
* 9.4 Cree un orden lógico para navegar con el tabulador a través de vínculos, controles de formulario y objetos.
* 9.5 Proporcione atajos de teclado para los vínculos más importantes (incluidos los de los mapas de imagen de cliente), los controles de formulario y los grupos de controles de formulario.
* 10.5 Hasta que las aplicaciones de usuario (incluidas las ayudas técnicas) interpreten claramente los vínculos contiguos, incluya caracteres imprimibles (rodeados de espacios), que no sirvan como vínculo, entre los vínculos contiguos.
* 11.3 Proporcione la información de modo que los usuarios puedan recibir los documentos según sus preferencias (por ejemplo, idioma, tipo de contenido, etc.).
* 13.5 Proporcione barras de navegación para destacar y dar acceso al mecanismo de navegación.
* 13.6 Agrupe los vínculos relacionados, identifique el grupo (para las aplicaciones de usuario) y, hasta que las aplicaciones de usuario lo hagan, proporcione una manera de evitar el grupo.
* 13.7 Si proporciona funciones de búsqueda, permita diferentes tipos de búsquedas para diversos niveles de habilidad y preferencias.
* 13.8 Localice la información destacada al principio de los encabezamientos, párrafos, listas, etc.
* 13.9 Proporcione información sobre las colecciones de documentos (por ejemplo, los documentos que comprendan múltiples páginas).
* 13.10 Proporcione un medio para saltar sobre un ASCII art de varias líneas.
* 14.2 Complemente el texto con presentaciones gráficas o auditivas cuando ello facilite la comprensión de la página.
* 14.3 Cree un estilo de presentación que sea coherente para todas las páginas.

Y si utiliza imágenes o mapas de imagen (Prioridad 3)
* 1.5 Hasta que las aplicaciones de usuario interpreten el texto equivalente para los vínculos de los mapas de imagen de cliente, proporcione vínculos de texto redundantes para cada zona activa del mapa de imagen de cliente.

Y si utiliza tablas (Prioridad 3)
* 5.5 Proporcione resúmenes de las tablas.
* 5.6 Proporcione abreviaturas para las etiquetas de encabezamiento.
* 10.3 Hasta que las aplicaciones de usuario (incluidas las ayudas técnicas) interpreten correctamente los textos contiguos, proporcione un texto lineal alternativo (en la página actual o en alguna otra) para todas las tablas que maquetan texto en paralelo, en columnas de palabras.

Y si utiliza formularios (Prioridad 3)
* 10.4 Hasta que las aplicaciones de usuario manejen correctamente los controles vacíos, incluya caracteres por defecto en los cuadros de edición y áreas de texto.


### Herramientas de verificación WEI-ARIA

La más importante, cerrar los ojos e intentar usar un lector de pantalla.

1. *HERA*: Herramienta online, disponible en español, que valida automáticamente la accesibilidad de la página, señalando qué puntos revisar manualmente. http://www.sidar.org/hera/
2. *Cynthia Says*: Detecta automáticamente problemas de accesibilidad tanto de WCAG 1.0 como de Section 508. http://www.cynthiasays.com
3. *Google Accessibility Developer Tool* es una extensión de Google para Chrome que permite realizar una validación automática de la página que se está visualizando en el navegador https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb
4. *OCAWA Web Accessibility Expert*: Herramienta de validación automática de páginas web compatible con WCAG 1.0 de Prioridad 1. http://www.ocawa.com/en/
5. *PISTA*: Permite analizar automáticamente varios sitios y todas sus páginas de vez (la gramática, las CSS y los diferentes Niveles de accesibilidad), y además programar revisiones periódicas cuyos informes te son enviados por correo. Permite revisar con varias normativas (por defecto WCAG 1.0, también permite WCAG 2.0). http://www.mityc.es/DGDSI/PISTA/ACCESIBILIDADFREEWARE/Paginas/pistaacces...
6. *TAW*: Valida automáticamente la accesibilidad de la página, señalando qué puntos revisar manualmente. Se puede seleccionar Nivel A, AA y AAA, así como revisión WCAG 1.0 y 2.0. Está disponible en español, en versión online, local o extensión para Firefox. Incorpora asimismo validación de HTML y CSS y permite analizar también el código JavaScript. http://www.tawdis.net
7. *W3C Validator for MAC OSX with Experimental WAI-ARIA Support*: Validador del W3C para instalación en sistemas operativos Mac OS X. Valida tanto webs locales como a través de internet y permite también configurarse como servicio web. Presenta un soporte limitado a WAI-ARIA. http://habilis.net/validator-sac/
8. *WAVE*: Permite analizar sitios web para ayudar a la evaluación de la accesibilidad mostrando la página original con indicadores insertados dentro de sí misma donde se muestran los problemas de accesibilidad. Dispone también de una barra de herramientas para Firefox http://wave.webaim.org/?lang=es
