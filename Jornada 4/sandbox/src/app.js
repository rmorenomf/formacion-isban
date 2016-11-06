console.log("[*] Demo app.");

import { console } from "examples/console";

function goTo(action){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var element = document.getElementById('code');
            debugger;
            console("Response retrieved");
            element.innerHTML = xmlhttp.responseText;            
        }
    }
    xmlhttp.open("GET", './examples/' + action + '.js', true);
    xmlhttp.send();
}