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

El objeto *Routes* es un array de rutas que define el routing de la aplicación.

```typescript
const routes: Routes = [
    { path: 'component-one', component: ComponentOne },
    { path: 'component-two', component: ComponentTwo }
];
```

Estos son los atributos que puede tener:

* path - URL to be shown in the browser when application is on the specific route
* component - component to be rendered when the application is on the specific route
* redirectTo - redirect route if needed; each route can have either component or redirect attribute defined in the route (covered later in this chapter)
* pathMatch - optional property that defaults to 'prefix'; determines whether to match full URLs or just the beginning. When defining a route with empty path string set pathMatch to 'full', otherwise it will match all paths.
* children - array of route definitions objects representing the child routes of this route.

Necesitamos algo más:

*RouterModule.forRoot* toma el array de Routes, definido antes, y devuelve un modulo de rutas configurado. Este modulo router debe estar definido en la lista de *imports*.

_app.module.ts_

```typescript
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    { path: 'component-one', component: ComponentOne },
    { path: 'component-two', component: ComponentTwo }
];
export const routing = RouterModule.forRoot(routes);
@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        ComponentOne,
        ComponentTwo
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Podemos configurar redirecciones, esto puede ser muy intersante cuando entramos a la ruta por defecto pero queremos ir a una vista en concreto:

```typescript
export const routes: Routes = [
    { path: '', redirectTo: 'component-one', pathMatch: 'full' },
    { path: 'component-one', component: ComponentOne },
    { path: 'component-two', component: ComponentTwo }
];
```

Ahora vamos a definir un enlace a una ruta:

```html 
<a [routerLink]="['/component-one']">Component One</a>
```

Eso definiria un enlace a la ruta *component-one*.

También podemos navegar de forma dinámica.

```typescript
this.router.navigate(['/component-one']);
```

Aún nos queda un detalle muy importante por definir; dónde se van a pintar el resultado de esa navegación, en realidad estamos siempre en la misma página, es una apliación Angular 2.

Para eso necesitamos un elemento nuevo, ```<router-outlet></router-outlet>```: 

```typescript
import { Component } from '@angular/core';
@Component({
    selector: 'app',
    template: `
        <nav>
        <a [routerLink]="['/component-one']">Component One</a>
        <a [routerLink]="['/component-two']">Component Two</a>
        </nav>
        <router-outlet></router-outlet>
        <!-- Route components are added by router here -->
        `
})
export class AppComponent {}
```

Otro aspecto importante es que podemos pasar parámetros a nuestras rutas:

```typescript
export const routes: Routes = [
    { path: '', redirectTo: 'product-list', pathMatch: 'full' },
    { path: 'product-list', component: ProductList },
    { path: 'product-details/:id', component: ProductDetails }
];
```

En este caso, si queremos componer los enlaces haremos esto:

```html
<a *ngFor="let product of products"
    [routerLink]="['/product-details', product.id]">
    {{ product.name }}
</a>
```

o esto otro:

```typescript
goToProductDetails(id) {
    this.router.navigate(['/product-details', id]);
}
```

O también podemos pasar paramétros opcionales o Query Parameters:

> localhost:3000/product-list?page=2

```html
<a [routerLink]="['product-list']" [queryParams]="{ page: 99 }">Go to Page 99</a>
```

o 

```typescript
goToPage(pageNum) {
    this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
}
```

y, a su vez, podemos leer esos parámetros de esta forma:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'product-list',
    template: `<!-- Show product list -->`
})
export default class ProductList {
    constructor(
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                // Defaults to 0 if no query param provided.
                this.page = +params['page'] || 0;
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    nextPage() {
        this.router.navigate(['product-list'], { queryParams: { page: this.page + 1 } });
    }
}
```

Como ya hemos mencionado también podemos tener rutas hijas. Esto permite definir rutas que solo son accesibles desde otras rutas:

```typescript
export const routes: Routes = [
    { path: '', redirectTo: 'product-list', pathMatch: 'full' },
    { path: 'product-list', component: ProductList },
    { path: 'product-details/:id', component: ProductDetails,
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: Overview },
            { path: 'specs', component: Specs }
        ]
    }
];
```

En este caso, tenemos que especificar dentro del componente de la ruta padre el lugar donde vamos a pintar esa subruta. Como podeis ver en ```<router-outlet></router-outlet>```:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'product-details',
    template: `
        <p>Product Details: {{id}}</p>
        <!-- Product information -->
        <nav>
        <a [routerLink]="['overview']">Overview</a>
        <a [routerLink]="['specs']">Technical Specs</a>
        </nav>
        <router-outlet></router-outlet>
        <!-- Overview & Specs components get added here by the router -->
        `
})
export default class ProductDetails implements OnInit, OnDestroy {
    
    id: number;
    
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

Las rutas hijas también pueden acceder a las rutas padre:

```typescript
export default class Overview {
    parentRouteId: number;
    private sub: any;
    
    constructor(private router: Router,
                private route: ActivatedRoute) {}
    
    ngOnInit() {
        // Get parent ActivatedRoute of this route.
        this.sub = this.router.routerState.parent(this.route)
            .params.subscribe(params => {
                this.parentRouteId = +params["id"];
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
```

Podemos usar los siguiente indicadores de ruta:

* '/' =>  Root of the application
* nada => Current component children routes
* '../' => Current component parent routes

```html
<a [routerLink]="['route-one']">Route One</a>
<a [routerLink]="['../route-two']">Route Two</a>
<a [routerLink]="['/route-three']">Route Three</a>
```

También podemo controlar el acceso a las rutas, vamos a usar *Route Guards*:

En este ejemplo vamos a indicar que solo se pueda acceder a la ruta 'account' si el usuario está logado.

```typescript
import { Routes, RouterModule } from '@angular/router';
import { AccountPage } from './account-page';
import { LoginRouteGuard } from './login-route-guard';
import { SaveFormsGuard } from './save-forms-guard';
const routes: Routes = [
    { path: 'home', component: HomePage },
    {
        path: 'accounts',
        component: AccountPage,
        canActivate: [LoginRouteGuard],
        canDeactivate: [SaveFormsGuard]
    }
];
export const appRoutingProviders: any[] = [];
export const routing = RouterModule.forRoot(routes);
```

Pero tenemos que crear LoginRouteGuard:

```typescript
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login-service';

@Injectable()
export class LoginRouteGuard implements CanActivate {
    constructor(private loginService: LoginService) {}
    canActivate() {
        return this.loginService.isLoggedIn();
    }
}
```

When canActivate returns true, the user can activate the route. When canActivate returns false, the user cannot access the route. In the above example, we allow access when the user is logged in. 
canActivate can also be used to notify the user that they can't access that part of the application, or redirect them to the login page.

Bueno, parece que canActivate hace lo mismo pero a la inversa canDeactivate. Y es así. Pero con algunas diferencias. *canDeactivate* pasa el componente a ser desactivado como argumento de la función.

```typescript
export interface CanDeactivate<T> {
    canDeactivate(component: T, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean>|Promise<boolean>|boolean;
}
```

Podemos utilizar ese componente para determinar si el usuario puede desactivar:

```typescript
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountPage } from './account-page';

@Injectable()
export class SaveFormsGuard implements CanDeactivate<AccountPage> {
    canDeactivate(component: AccountPage) {
        return component.areFormsSaved();
    }
}
```

Como hemos visto, canActivate y canDeactivate, pueden devolver valores booleanos, pero si devuelven un Observable, podemos utilizarlo para devolver valores que vengan del servidor o de la interfaz de usuario, en este caso una confirmación:

```typescript
canDeactivate() {
    return dialogService.confirm('Discard unsaved changes?');
}
```

Rutas auxiliares:

Angular 2 también soporta el concepto de rutas auxiliares. Estas permiten navegar a multiples e independietnes rutas en una misma aplicación. Para ello cada componente dispone de cero o mas *outlets*:  

```typescript
import {Component} from '@angular/core';
@Component({
    selector: 'app',
    template: `
        <nav>
        <a [routerLink]="['/component-one']">Component One</a>
        <a [routerLink]="['/component-two']">Component Two</a>
        <a [routerLink]="[{ outlets: { 'sidebar': ['component-aux'] } }]">Component Aux<
        /a>
        </nav>
        <div style="color: green; margin-top: 1rem;">Outlet:</div>
        <div style="border: 2px solid green; padding: 1rem;">
        <router-outlet></router-outlet>
        </div>
        <div style="color: green; margin-top: 1rem;">Sidebar Outlet:</div>
        <div style="border: 2px solid blue; padding: 1rem;">
        <router-outlet name="sidebar"></router-outlet>
        </div>
    `
})
export class AppComponent {
}
```