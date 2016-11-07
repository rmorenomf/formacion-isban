// => Creamos un custom element 
/*
var XHelloPrototype = Object.create(HTMLElement.prototype);
XHelloPrototype.createdCallback = function() {
  this.textContent = `Hello, componented world!`;
  //this.textContent = `Hello, componented world! ${this}`;
  //Trastear con el DOM this.innerHTML = 'AAA' / this.append('ZZZ')
};

XHelloPrototype.hello = function() {
  console.log('hello() called');
};

var XHello = document.registerElement('x-hello', {
  prototype: XHelloPrototype
});
*/

// => Y si usamos ES6

/*

// https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements

// Create a class for the element
class XHello extends HTMLElement {
  constructor() {
    // Always call super first in ctor
    super();
    this.textContent = `Hello, componented world!`;
  }
}
// Define the new element
customElements.define('x-hello', XHello);
*/


// => Probamos un código un poco mas compacto
/*
customElements.define('x-hello', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the ctor.
    this.textContent = `Hello, componented world!`;
  }  
});
*/

// **********************************************************************


// => Creamos un custom element desde un elemento ya existente.
/*
var XMyButtonPrototype = Object.create(HTMLButtonElement.prototype);
XMyButtonPrototype.createdCallback = function() {
  this.textContent = "I'm an cool button!";
};

var XMyButton = document.registerElement('x-my-button', {
  prototype: XMyButtonPrototype,
  extends: 'button'
});
*/


// **********************************************************************


// => Vamos a devolver el contenido del import 
/*
var content = document.getElementById('myTemplate').import;
console.log(content);
*/


// **********************************************************************


// => Vamos a meter caña al template:
// => Creamos el modelo:
/*
var blogPosts = [
    {
      "title": "Exploring the JavaScript Device APIs",
      "snippet": "The mobile revolution has completely changed how people access the web. It’s only natural then that the web should evolve to better suit the plethora of devices on which it’s now accessed.",
      "url": "http://blog.teamtreehouse.com/exploring-javascript-device-apis"
    },
    {
      "title": "Gamepad Controls for HTML5 Games",
      "snippet": "HTML5 games still have a lot of promises to fulfil, but the W3C gamepad specification is a great example of something that’s going well.",
      "url": "http://blog.teamtreehouse.com/gamepad-controls-html5-games"
    },
    {
      "title": "‘It Is Never Too Late’: How a Teacher and an Artist Switched to Web Careers in Midstream",
      "snippet": "The “breaking moment” in Jon Liu’s teaching career came at 7 o’clock in the morning.",
      "url": "http://blog.teamtreehouse.com/never-late-teacher-artist-switched-web-careers-midstream"
    }
  ];

// => Obtenemos el template
var templatesImport = document.getElementById('myTemplate');
// => Obtenemos el contenido
var templates = templatesImport.import;
// => Y ahora una referencia al DOM del template
var template = templates.getElementById('blog-post');

// => Parseamos el template
// Repeat for each of the posts.
for (i in blogPosts) {
    // Get the current post.
    var post = blogPosts[i];

    // Clone the template content.
    var clone = document.importNode(template.content, true);
    
    // Apply the blog post data to the template.
    clone.querySelector('.post-title a').innerText = post['title'];
    clone.querySelector('.post-title a').href = post['url'];
    clone.querySelector('.post-snippet').innerText = post['snippet'];
    
    // Add the blog post to the page.
    document.getElementById('blog-posts').appendChild(clone);
}
*/

// **********************************************************************

// => Vamos a probar el Shadow DOM

/*
const header = document.querySelector('#shadow_dom_host');
const shadowRoot = header.attachShadow({mode: 'open'}); //Sí, hay un modo cerrado.
//shadowRoot.innerHTML = '<h1>Hello Shadow DOM</h1>'; // Could also use appendChild().

// Usando Slots
shadowRoot.innerHTML = `<style>
                            :host { border: solid 1px #ccc; border-radius: 0.5rem; padding: 0.5rem; margin: 0.5rem; }                            
                        </style>
                        <ul>
                          <li>
                            <slot name="greeting"></slot>                                                           
                          </li>
                        </ul>`;

*/