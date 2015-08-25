'use strict';

//1HtY9z75VVi7uYWS6cbmPcH28dUJL5P92c

angular.module('bitcoinServerApp')
  .controller('MainCtrl', function($scope, $http, $modal) {
      
    $scope.newWallet;   
    $scope.qrcodeAddress;
    
    $scope.add = function(){
        console.log('add');
        var req = {
            method: "post",
            url: "/api/wallets"
        };
        
        $http(req)
          .then(function(response){
            console.log(response);
            $scope.getWalletList();
        },function(err){
            console.log(err);
        });
        
    };
    
    $scope.send = function(){
        
        $scope.invalidAddress = false;
        $scope.invalidAmount = false;
        $scope.successfulTransaction = false;
                
        var req = {
            method: "post",
            url: "/api/wallets/send",
            data: {
                address: $scope.send.address,
                amount: $scope.send.amount
            }
        };
        
        $http(req)
          .then(function(response){
            console.log(response);
            $scope.getWalletList();
            $scope.getBalance();
            $scope.successfulTransaction = true;
        },function(err){
            console.log(err);
            
            if(err.data.code === -6){
                $scope.invalidAmount = true;
            }
            
            if(err.data.isvalid === false){
                $scope.invalidAddress = true;
            }
            
        });
        
    };
    
     $scope.openModal = function (size) {

        var modalInstance = $modal.open({
          animation: true,
          templateUrl: 'app/main/modal.html',
          controller: 'ModalInstanceCtrl',
          size: 'sm',
          resolve: {
              items: function(){
                return  $scope.qrcodeAddress;
              }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          console.log('Modal dismissed at: ' + new Date());
        });
      };
    
    $scope.getWalletList = function(){
        console.log('getWalletList');
        var req = {
            method: "get",
            url: "/api/wallets"
        };
        
        $http(req)
          .then(function(response){
            console.log(response);
            $scope.wallets = response.data;
        },function(err){
            console.log(err);
        });
    };
    
    $scope.getBalance = function(){
        console.log('getBalance');
        var req = {
            method: "get",
            url: "/api/wallets/balance"
        };
        
        $http(req)
          .then(function(response){
            console.log(response);
            $scope.balance = response.data;
        },function(err){
            console.log(err);
        });
    };
    
    $scope.init = function(){
       console.log('init');
       $scope.getWalletList();
       $scope.getBalance();
    }();
    
  }).controller('ModalInstanceCtrl', function($scope, items) {
      
      $scope.qrcodeAddress = items;
      
  });
