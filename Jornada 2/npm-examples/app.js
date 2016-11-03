(function (angular) {
  'use strict';

  angular
    .module('myApp', [ 'sngRandomTextGenerator' ])

    .config(function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    })

    .controller('MainController', function () { });

})(angular);