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

![alt text](https://github.com/rmorenomf/formacion-isban/Jornada 1/resources/listaetiquetasHTML5.pdf "HTML5 lista completa de etiquetas")

* Webworkers
* Drag & Drop
* WebSockets WebRTC
* Caché de la aplicación
* IndexDB
* File API / Blob


### Landmark Roles (WAI-ARIA). Navegación más accesible y semántica.

El objetivo es que sea más fácil de "ojear", comprender y navegar para las personas que usan un lector de pantalla.

Cuando una página web está correctamente marcada permitimos que los usuarios que usan un lector de pantalla no tengan que hacer una lectura lineal de toda la página. 
Utilizando determinadas teclas podrán "ojear" el documento y acceder directamente a las partes del mismo que les interesan.

Por ejemplo, si tenemos una correcta estructura de encabezados, marcados como tales, un usuario de lector de pantalla (como JAWS o NVDA) podrá pulsar la tecla “h” para “ojear” los encabezados. Cada vez que pulse dicha tecla el lector le leerá el siguiente encabezado y podrá seguir leyendo a partir del que le interese.
