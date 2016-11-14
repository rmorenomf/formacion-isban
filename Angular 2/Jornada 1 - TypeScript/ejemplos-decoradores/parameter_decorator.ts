function logParameter(target: any, key : string, index : number) {
  var metadataKey = `__log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  }
  else {
    target[metadataKey] = [index];
  }
}

function logMethod(target, key, descriptor) {
	
    if(descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }
    var originalMethod = descriptor.value;

    //editing the descriptor/value parameter
	  descriptor.value = function (...args: any[]) {

    	var metadataKey = `__log_${key}_parameters`;
    	var indices = target[metadataKey];

  		if (Array.isArray(indices)) { 
  			for (var i = 0; i < args.length; i++) { 
  		
  				if (indices.indexOf(i) !== -1) { 
  		
  				var arg = args[i];
  				var argStr = JSON.stringify(arg) || arg.toString();
  				console.log(`${key} arg[${i}]: ${argStr}`);
  				}
  			}
  			var result = originalMethod.apply(this, args);
  			return result;
  		}
  		else {
  			var a = args.map(a => (JSON.stringify(a) || a.toString())).join();
  			var result = originalMethod.apply(this, args);
  			var r = JSON.stringify(result);
  			console.log(`Call: ${key}(${a}) => ${r}`);
  			return result;
  		}
  	}

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
  public saySomething(@logParameter something : string, somethingElse : string) : string { 
    return this.name + " " + this.surname + " says: " + something + " " + somethingElse; 
  }
}

var p = new Person("remo", "jansen");
p.saySomething("I love playing", "halo");