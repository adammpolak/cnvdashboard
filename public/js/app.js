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
  app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      // chartColors: ['#FF5252', '#FF8A80'],
      // responsive: false
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }

    });
    // Configure all line charts
    ChartJsProvider.setOptions('bar', {
      showLines: false
    });
  }])
  app.factory('SheetJSExportService', SheetJSExportService);
  SheetJSExportService.inject = ['uiGridExporterService'];
  app.directive("importSheetJs", [SheetJSImportDirective]);
})()
