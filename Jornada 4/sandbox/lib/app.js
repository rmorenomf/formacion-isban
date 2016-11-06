"use strict";

var _console = require("examples/console");

_console.console.log("[*] Demo app.");

function goTo(action) {
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var element = document.getElementById('code');
            debugger;
            (0, _console.console)("Response retrieved");
            element.innerHTML = xmlhttp.responseText;
        }
    };
    xmlhttp.open("GET", './examples/' + action + '.js', true);
    xmlhttp.send();
}
//# sourceMappingURL=app.js.map