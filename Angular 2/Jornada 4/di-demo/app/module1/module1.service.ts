import { Injectable } from '@angular/core';

@Injectable()
export class Module1Service {

    value : number;

    constructor() {
        this.value = 0;
        console.log("[*] M1 - Calling constructor.");
    }

    public getValue() : number {
        console.log("[*] M1 - Get value: " + this.value);
        return this.value;
    }

    public incrementValue(){
        console.log("[*] M1 - Old value : " + this.value + " new value: " + (this.value+1));   
        return this.value++;
    }

}