console.log("[*] Application Loaded.");

let instance = null;

class Cache{  
    constructor() {
        if(!instance){
              instance = this;
        }

        // to test whether we have singleton or not
        this.time = new Date()

        return instance;
      }
}

let cache = new Cache()
console.log(cache.time);

 setTimeout(function(){
   let cache = new Cache();
   console.log(cache.time);
 },4000);