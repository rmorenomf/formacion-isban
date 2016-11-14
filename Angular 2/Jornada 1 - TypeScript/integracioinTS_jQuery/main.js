/// <reference path="./node_modules/@types/jquery/index.d.ts" />
var settingQuery = {
    url: "https://restcountries.eu/rest/v1/currency/eur",
    success: function (p1, p2, p3) {
        console.log(p1);
    }
};
jQuery.ajax(settingQuery);
