function logProperty(target: any, key: string) {
 
  // property value
  var _val = this[key];
 
  // property getter
  var getter = function () {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };
 
  // property setter
  var setter = function (newVal) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };
 
  // Delete property.
  if (delete this[key]) {
 
    // Create new property with getter and setter
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

class Person { 
  @logProperty
  public name: string;
  public surname: string;

  constructor(name : string, surname : string) { 
    this.name = name;
    this.surname = surname;
  }
}

var p = new Person("remo", "Jansen");
p.name = "Remo";
var n = p.name;