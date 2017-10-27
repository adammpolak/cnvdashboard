(function(){
  var app = angular.module('boilerApp', ['ui.router','ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('nameOfState', {
      url: '/nameOfState',
      templateUrl: 'templates/firstTemplate.html',
      controller: 'firstController',
      controllerAs: 'first'
    });
  }
  app.factory('SheetJSExportService', SheetJSExportService);
  SheetJSExportService.inject = ['uiGridExporterService'];
  app.directive("importSheetJs", [SheetJSImportDirective]);
})()
