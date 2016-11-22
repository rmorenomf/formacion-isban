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

Podríamos decir que un Observable es un objeto que guarda un valor y que emite un evento a todos sus suscriptores cada vez que ese valor se actualiza. En palabras de la RxJS, un Observable es un conjunto de valores a lo largo de cualquier intervalo de tiempo.
Veamos un ejemplo en Angular 2:

```typescript
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'app',
    template: `
        <b>Angular 2 Component Using Observables!</b>
        
        <h6 style="margin-bottom: 0">VALUES:</h6>
        <div *ngFor="let value of values">- {{ value }}</div>
        
        <h6 style="margin-bottom: 0">ERRORs:</h6>
        <div>Errors: {{anyErrors}}</div>
        
        <h6 style="margin-bottom: 0">FINISHED:</h6>
        <div>Finished: {{ finished }}</div>
        
        <button style="margin-top: 2rem;" (click)="init()">Init</button>
        `
})
export class MyApp {
    
    private data: Observable<Array<number>>;
    private values: Array<number> = [];
    private anyErrors: boolean;
    private finished: boolean;
    
    constructor() {
    }

    init() {
        this.data = new Observable(observer => {
                setTimeout(() => {
                    observer.next(42);
                }, 1000);

                setTimeout(() => {
                    observer.next(43);
                }, 2000);
                
                setTimeout(() => {
                    observer.complete();
                }, 3000);
        });

        let subscription = this.data.subscribe(
                value => this.values.push(value),
                error => this.anyErrors = true,
                () => this.finished = true
        );
    }
}
```

Esto lo vamos a probar en aplicación.

Pero vamos a identificar varias cosas:

1. Hemos importado _rxjs/Observable_ 
2. El Observable tiene tipo, en este caso en un Array de números.
3. Hemos llamado a _subscribe_ en la instancia de nuestro Observable. Eso va a permitirnos escuchar los datos que vaya devolviendo.
3. Hemos especificado 3 _callbacks_ en el _subscribe_; la acción cuando se devuelve un valor, cuando se produce un error y cuando se termina el Stream.

Podemos hacerlo de esta otra forma usando un forEach:

```typescript
export class MyApp {
    
    private data: Observable<Array<number>>;
    private values: Array<number> = [];
    private anyErrors: boolean;
    private finished: boolean;
    
    constructor() {
    }

    init() {
        this.data = new Observable(observer => {
                setTimeout(() => {
                    observer.next(42);
                }, 1000);

                setTimeout(() => {
                    observer.next(43);
                }, 2000);
                
                setTimeout(() => {
                    observer.complete();
                }, 3000);
        });

    let subscription = this.data.forEach(v => this.values.push(v))
        .then(() => this.status = "Ended");
    }
}
```

En este caso nos cambia como los callbacks de error y finalizacion son manejados.

Manejo de errores:

```typescript
export class App {
    values: number[] = [];
    anyErrors: Error;
    private data: Observable<number[]>;
    
    constructor() {
        this.data = new Observable(observer => {
            setTimeout(() => {
                observer.next(10);
            }, 1500);
            setTimeout(() => {
                observer.error(new Error('Something bad happened!'));
            }, 2000);
            setTimeout(() => {
                observer.next(50);
            }, 2500);
        });

        let subscription = this.data.subscribe(
            value => this.values.push(value),
            error => this.anyErrors = error
        );
    }
}
```

Llegados a este punto y si estamos acostumbrados a usar *Promises* no veamos grandes diferencias, en realidad los dos elementos solucionan un mismo problema, gestionar un flujo de datos o de eventos asíncronos. Pero hay algunas diferencias:

1. Podemos cancelar un Observable.
2. Pueden ser "retried" (ninguna de las palabras para traducirlo me gusta) utilizando algunas de las operaciones que provee la API; retry y retryWhen. Las Promesas requieren que el llamador tenga acceso a la función original que devolvio la promesa para poder implementar la capacidad de "retry".


Veamos un ejemplo en el que vamos a cancelar un Observable, es decir, vamos a des-inscribirnos:

```typescript
export class MyApp {
    
    private data: Observable<Array<string>>;
    private value: string;
    private subscribed: boolean;
    private status: string;

    init() {
        this.data = new Observable(observer => {
            
            let timeoutId = setTimeout(() => {
                observer.next('You will never see this message');
            }, 2000);

            this.status = 'Started';

            return onUnsubscribe = () => {
                this.subscribed = false;
                this.status = 'Finished';
                clearTimeout(timeoutId);
            }

        });

        let subscription = this.data.subscribe(
            value => this.value = value,
            error => console.log(error),
            () => this.status = 'Finished';
        );

        this.subscribed = true;
    
        setTimeout(() => {
        subscription.unsubscribe();
        }, 1000);
    }
}
```

Como podeis ver, hemos limpiado el setTimeOut para que no se dispare, sino hicieramos eso, el evento se produciría, pero no habría nadie escuchando.

Por defecto, se produce un *unsubscribe* automático cuando se produce un *complete* o un *error*.

### Cold y Hot Observables

Podemos clasificar a los Observables en dos tipos:

```typescript
const obsv = new Observable(observer => {
    setTimeout(() => {
        observer.next(1);
    }, 1000);
    setTimeout(() => {
        observer.next(2);
    }, 2000);
    setTimeout(() => {
        observer.next(3);
    }, 3000);
    setTimeout(() => {
        observer.next(4);
    }, 4000);
});

// Subscription A
setTimeout(() => {
    obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
    obsv.subscribe(value => console.log(`>>>> ${value}`));
}, 2500);
```

1. Cold, nos subscribimos porque queremos tener todos el Stream completo. Estamos allí desde el principio.
2. Hot, nos queremos subscribir en cualquier momento y solo nos interesa el Stream generado de ese momento.

¿Cómo podemos crear Hot observables?

Pues usando el método *publish*. es emétodo toma un Observable Cold y su fuente y devuelve una instacia de *ConnectableObservable*. En este caso tendremos que llamar explicitamente a *connect* para comenzar la emisión a todos los *subscribers.*.

```typescript
const obsv = new Observable(observer => {
    setTimeout(() => {
        observer.next(1);
    }, 1000);
    setTimeout(() => {
        observer.next(2);
    }, 2000);
    setTimeout(() => {
        observer.next(3);
    }, 3000);
    setTimeout(() => {
        observer.next(4);
    }, 4000);
}).publish();

obsv.connect();

// Subscription A
setTimeout(() => {
    obsv.subscribe(value => console.log(value));
}, 0);

// Subscription B
setTimeout(() => {
    obsv.subscribe(value => console.log(` ${value}`));
}, 2500);
```

Otro método muy chulo es *refCount*, si lo usamos en vez de *connect* eso hace que no comienze la emisión hasta que almenos tengamos un subscriber y detiene la emisión cuando el último subscriber se marcha.

RxJS ("Reactive Extensions") is a 3rd party library, endorsed by Angular, that implements the asynchronous observable pattern.

La librería RxJS te aporta además varias operadores para transformar los resultados de tus Observables, como el operador map (equivalente al método map de los arrays JS para manipular cada elemento del array), el operador *debounce* para ignorar eventos demasiado seguidos, el operador *merge* para combinar los eventos de 2 o más observables en uno…

En http://rxmarbles.com/ podemo ver gráficos animados que muestran el funcionamiento de estas funciones.

## HTTP

Vamos a ver aplicados los Observables en otro elemento de Angular 2. El módulo http.

Para poder utilizar el servicio Http antes que nada tienes que importarlo en el componente o servicio donde lo quieres usar, desde el paquete @angular/http, y pasarlo por DI.

```typescript
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MyComponent {
  constructor(private http: Http) { }
}
```

Es importante destacar que el servicio Http no pertenece al núcleo de Angular, por lo que hay que importar también su módulo HttpModule y pasarlo en la fase de bootstrap

```typescript
//main.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule{}
```

### GET:

```typescript
//productsService.ts
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsService {
  constructor(private http: Http) { }
  public categoryId = 0;

  get products() {
    return http.get(`base_url/category/${categoryId}/products`)
      .map(response => response.json());
  }
}
```

Como podemos ver, en el getter de productos, estamos usando el método GET del servicio Http y le pasamos únicamente la URL. Además, ejecutamos el método map sobre el Observable que me devuelve la llamada anterior, para coger los datos de la respuesta HTTP en formato JSON.

Hay que indicar que lo que está devolviendo *products()* es un Observable y eso abré la puesta a usar toda su potencia:

```typescript
//myApp.ts
import { ProductsService } from './productsService';

@Component({
  selector: 'my-app',
  template: `<div *ng-for="let product of products">{{product.name}} - {{product.price}}</div>`
})
export class App {
  constructor(productsService: ProductsService) {
    productsService.products
      .subscribe(
        products => this.products = products,
        error => console.error(`Error: ${error}`)
      );
  }
}
```

Veamos un ejemplo un poco mas elaborado:

```typescript
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web API
  constructor (private http: Http) {}
  getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
```

### POST 

```
//productsService.ts
import { Headers, RequestOptions } from '@angular/http';
//...more imports...

@Injectable()
export class ProductsService {
  constructor(private http: Http) { }
  //..previous stuff...

  sendOpinion(rating:number, description:string, productId:number){

    //build header options
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    //build POST body
    let body = JSON.stringify({rating, description});

    //send data to server
    this.http
       .post(`base_url/category/products/${productId}`, body, options)
       .map(response => response.json())
       .subscribe(
           data => console.log('Success uploading the opinion ', data),
           error => console.error(`Error: ${error}`
       );
  }
}
```

## Routing

Probablemente los mas importante es que usemos esto:



The ```<base>``` tag specifies the base URL/target for all relative URLs in a document.