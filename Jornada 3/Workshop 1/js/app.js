console.log("[*] Application Loaded.");

/* Create the instance */

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

/* Test your songleton */

let cache = new Cache()
 console.log(cache.time);

 setTimeout(function(){
   let cache = new Cache();
   console.log(cache.time);
 },4000);