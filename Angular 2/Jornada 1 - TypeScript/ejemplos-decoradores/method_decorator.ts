function logMethod(target, key, descriptor) {
 
    // save a reference to the original method this way we keep the values currently in the
    // descriptor and don't overwrite what another decorator might have done to the descriptor.
    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var originalMethod = descriptor.value;
 
    //editing the descriptor/value parameter
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var a = args.map(function (a) { return JSON.stringify(a); }).join();
        // note usage of originalMethod here
        var result = originalMethod.apply(this, args);
        var r = JSON.stringify(result);
        console.log("Call: " + key + "(" + a + ") => " + r);
        return result;
    };
 
    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
}

class Person { 
  
  public name: string;
  public surname: string;
  
  constructor(name : string, surname : string) { 
    this.name = name;
    this.surname = surname;
  }
  
  @logMethod
  public saySomething(something : string, somethingElse : string) : string { 
    return this.name + " " + this.surname + " says: " + something + " " + somethingElse; 
  }
}

var p = new Person("remo", "jansen");
p.saySomething("I love playing", "halo");