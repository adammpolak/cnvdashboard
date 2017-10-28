(function(){
  var app = angular.module('boilerApp', ['ui.router','ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'chart.js']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('nameOfState', {
      url: '/nameOfState',
      templateUrl: 'templates/dashTemplate.html',
      controller: 'dashController',
      controllerAs: 'dash'
    });
  }
  app.factory('SheetJSExportService', SheetJSExportService);
  SheetJSExportService.inject = ['uiGridExporterService'];
  app.directive("importSheetJs", [SheetJSImportDirective]);
})()
