(function() {
  angular.module('boilerApp')
  .controller('dashController', dashController);
  dashController.$inject = ['$scope', '$http', 'SheetJSExportService', '$location', '$state', '$timeout'];

  function dashController($scope, $http, SheetJSExportService, $location, $state, $timeout) {
    var self = this;
    this.number = 7;

    $scope.gridOptions = {
  		columnDefs: [
  			{ field: 'name' },
  			{ field: 'gender', visible: false},
  			{ field: 'company' }
  		],
  		enableGridMenu: true,
  		enableSelectAll: true,
  		exporterMenuPdf: false,
  		exporterMenuCsv: false,
  		showHeader: true,
  		onRegisterApi: function(gridApi){
  			$scope.gridApi = gridApi;
  		},
  		/* SheetJS Service setup */
  		filename: "SheetJSAngular",
  		sheetname: "ng-SheetJS",
  		gridMenuCustomItems: [
  			{
  				title: 'Export all data as XLSX',
  				action: function ($event) { SheetJSExportService.exportXLSX($scope.gridApi); },
  				order: 200
  			},
  			{
  				title: 'Export all data as XLSB',
  				action: function ($event) { SheetJSExportService.exportXLSB($scope.gridApi); },
  				order: 201
  			}
  		]
  	};
    // $scope.headers = $scope.gridOptions.columnDefs;
    // $scope.rows = $scope.gridOptions.data;

    $scope.importedSkus = [];
    $scope.runthis = function () {
      var shoes = [];
      var shoes = $scope.rows;
      var attributes = $scope.headers;
      var sku = {
        name: $scope.skuname,
        sku: $scope.wsname,
        attributes: attributes,
        shoes: shoes
      }
      $scope.importedSkus.push(sku);
      // self.addNewSku(sku)

    };

    $scope.addNewSkus = function(i) {
      var sku_shoe = $scope.importedSkus[i];
      $http.post('/api/skus', sku_shoe)
      .then(function(response) {
        $scope.allSkus.push(response.data);
        self.activeSku = response.data;
        if (i < $scope.importedSkus.length - 1) {
          i++;
          $scope.addNewSkus(i);
        }
        if (i == $scope.importedSkus.length - 1) {
          function compare(a,b) {
          if (a.shoes.length > b.shoes.length)
            return -1;
          if (a.shoes.length < b.shoes.length)
            return 1;
          return 0;
          }
          $scope.allSkus.sort(compare);
          self.getShoes();
          // $scope.makeActiveSku($scope.allSkus[0])
          $scope.compareAllSkus()
        }
      })
      .catch(function(err) {
        console.log(err)
      });

    }

    $scope.allSkus = [];
    this.getSkus = function() {
      $http.get('/api/skus/')
      .then(function(response) {
        $scope.allSkus = response.data;
        function compare(a,b) {
        if (a.shoes.length > b.shoes.length)
          return -1;
        if (a.shoes.length < b.shoes.length)
          return 1;
        return 0;
        }
        $scope.allSkus.sort(compare);

        if ($scope.allSkus[0]) {
          // $scope.makeActiveSku($scope.allSkus[0]);
          $scope.compareAllSkus();
        }
      })
      .catch(function(err) {
        console.log('err', err);
      })
    };
    this.getSkus();

    this.getShoes = function() {
      $http.get('/api/shoes/')
      .then(function(response) {
        $scope.allShoes = response.data;
      })
      .catch(function(err) {
        console.log('err', err);
      })
    };
    this.getShoes();

    $scope.makeActiveSku = function(sku) {
      $http.get(`/api/skus/${sku._id}`)
      .then(function(response){
        $scope.activeSku = response.data;
        $scope.makeActiveAttribute(7);
        $scope.singleSku = true;
      })
      .catch(function(err) {
        console.log('err', err);
      })
    }
    $scope.compareAllSkus = function() {
      var skulabels = [];
      var skuvalues = [];
      for (var i = 0; i < $scope.allSkus.length; i++) {
        skulabels.push($scope.allSkus[i].name);
        skuvalues.push($scope.allSkus[i].shoes.length);
      }
      $scope.labels = skulabels;
      $scope.values = skuvalues;
      $scope.singleSku = false;
    }

    $scope.activeSkuActiveAttributeArrayRaw = [];
    $scope.makeActiveAttribute = function(index) {
      $scope.activeSkuActiveAttributeArrayRaw = [];
      $scope.activeSkuActiveAttribute = $scope.activeSku.attributes[index];
      for (var i = 0; i < $scope.activeSku.shoes.length; i++) {
        $scope.activeSkuActiveAttributeArrayRaw.push($scope.activeSku.shoes[i].data[$scope.activeSkuActiveAttribute]);
      }

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      $scope.uniqueSkuAttributeValues = $scope.activeSkuActiveAttributeArrayRaw.filter( onlyUnique ); // returns ['a', 1, 2, '1']
      // console.log("This is the unique values: " + JSON.stringify($scope.uniqueSkuAttributeValues));
      $scope.uniqueSkuAttributeValuesCounts = [];
      for (var i = 0; i < $scope.uniqueSkuAttributeValues.length; i++) {
        var count = 0;
        for (var j = 0; j < $scope.activeSkuActiveAttributeArrayRaw.length; j++) {
          if ($scope.activeSkuActiveAttributeArrayRaw[j] == $scope.uniqueSkuAttributeValues[i])
          count++
        }
        $scope.uniqueSkuAttributeValuesCounts.push(count)
      }
      $scope.values = $scope.uniqueSkuAttributeValuesCounts;
      $scope.labels = $scope.uniqueSkuAttributeValues;
    }

    $scope.deleteData = function() {
      $http.delete(`/api/skus/`)
      .then(function(response){
        $scope.allSkus = [];
        $scope.values = [];
        $scope.labels = [];
        $scope.allShoes = [];
        $scope.singleSku = false;
      })
    }
    // this.addNewSku = function(sku_shoe) {
    //   $http.post('/api/skus', sku_shoe)
    //   .then(function(response) {
    //     console.log(response.data);
    //     $scope.allSkus.push(response.data);
    //     self.activeSku = response.data;
    //   })
    //   .catch(function(err) {
    //     console.log(err)
    //   });
    // }

    // $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json').success(function(data) { $scope.gridOptions.data = data; });

    // var self = this;
    // $http.get('/api/helpers/get-user')
    //   .then(function(response) {
    //     self.currentUser = response.data.user;
    //     self.currentUserAdmin = self.currentUser.admin
    //   })
    //   .catch(function(err){
    //     console.log('err', err)
    //   })

    // this.valueChange = function(sku) {
    //   $http.put(`/api/skus`, sku)
    //   .then(function(response){
    //     console.log(response);
    //   })
    // }
    // this.findSku();

    this.updateActiveSku = function () {
      $http.put(`/api/skus`, self.activeSku)
      .then(function(response){
        $state.go('sku_show')
        console.log(response);
      })
    }



    this.deleteSku = function () {
      $http.delete(`/api/skus/${self.activeSku._id}`)
      .then(function(response){
        $state.go('skus_all');
      })
    }
    // this.logout = function() {
    // $http.delete('/api/users/logout')
    //   .then(function(response){
    //     $state.go('landing', {url: '/'});
    //   });
    // }
  }

})()
