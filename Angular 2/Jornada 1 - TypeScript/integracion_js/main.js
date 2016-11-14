var obj1 = {
    p1: "Hola",
    f1 : function(){
        console.log(this.p1);
    }
};

obj1.f1();