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

## HTTP

Vamos a ver aplicados los Observables en otro elemento de Angular 2. El módulo http.



## Routing

