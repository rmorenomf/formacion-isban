/// <reference path="./node_modules/@types/jquery/index.d.ts" />
let settingQuery: JQueryAjaxSettings = { // JQueryAjaxSettings es una interfaz por eso es necesario instanciar el objeto de forma declarativa.
    url: "https://restcountries.eu/rest/v1/currency/eur",
    success : function(p1: any, p2: string, p3: JQueryXHR) {
    console.log(p1);
    } 
};
jQuery.ajax(settingQuery);