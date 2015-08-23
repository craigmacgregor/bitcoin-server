'use strict';

angular.module('bitcoinServerApp')
  .controller('MainCtrl', function($scope, $http) {
      
    $scope.newWallet;   
    
    $scope.submit = function(){
        
        var request = $http({
            method: "post",
            url: "/api/wallets",
            data: $scope.newWallet
        });
        
        request.success(function(data){
            $scope.newWallet = null;
            $scope.getWalletList();
        });       
        
    };
    
    $scope.remove = function(id){
              
        var request = $http({
            method: "delete",
            url: "/api/wallets/"+id
        });
        
        request.success(function(data){
            console.log(data);
            $scope.getWalletList();
        });  
        
    };
    
    $scope.getWalletList = function(){
        $http.get('/api/wallets').success(function(wallets) {
            $scope.wallets = wallets;
            console.log($scope.wallets);
        });
    };
    
    $scope.init = function(){
        $scope.getWalletList();
    }();
    
    
  });
