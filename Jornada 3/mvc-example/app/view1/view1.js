'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html', //Vista
    controller: 'View1Ctrl' //Controlador
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
  $scope.countriesModel = [];

  //Gestiona el uso que se hace del modelo.
  $scope.$on('$viewContentLoaded', function() {
    //Load a model data.
    $http.get('../models/countries.json').success(function(response) {
        $scope.countriesModel = response;
    });
  });

  //Gestiona los eventos de la vista.
  $scope.pressButton = function(evt) {
    console.log("[*] Button on controller for View 1 pressed. " + new Date().getTime() );
  }

  //Aún así se puede hacer mejor, ya que podemos sacar la lógica del controlador fuera
  //del controlador.

}]);