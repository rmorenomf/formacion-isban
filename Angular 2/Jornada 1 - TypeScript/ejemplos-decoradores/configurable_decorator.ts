@logClassWithArgs({ when : { name : "remo"} })
class Person {
  public name: string;
 
  // ...
}

function logClassWithArgs(filter: Object) {
    return (target: Object) => {
        // implement class decorator here, the class decorator
        // will have access to the decorator arguments (filter)
        // because they are  stored in a closure
    }
}