import { Injectable } from '@angular/core';

@Injectable()
export class GlobalServiceService {

    value : number;

    constructor() {
        this.value = 0;
        console.log("[*] Calling constructor.");
    }

    public getValue() : number {
        console.log("[*] Get value: " + this.value);
        return this.value;
    }

    public incrementValue(){
        console.log("[*] Old value : " + this.value + " new value: " + (this.value+1));   
        return this.value++;
    }

}