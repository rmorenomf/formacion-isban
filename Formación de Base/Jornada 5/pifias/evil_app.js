console.log("[+] Vamos a liarla parda.");

//Podemos sobreescribir algo global necesario para que algo bueno funcione.
var loginName = "Login incorrecto"; 
var MYAPP = {

    doSomethingGood : function(){
        //Podemos errar el selector.
        $('button').css('background-color', 'green');
        console.log("[*] Hacemos algo malo. " + loginName);            
    }

};