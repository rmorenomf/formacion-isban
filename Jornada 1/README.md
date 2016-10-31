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