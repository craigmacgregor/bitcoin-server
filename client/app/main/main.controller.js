'use strict';

//1HtY9z75VVi7uYWS6cbmPcH28dUJL5P92c

angular.module('bitcoinServerApp')
  .controller('MainCtrl', function($scope, $http) {
      
    $scope.newWallet;   
    
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
    
    $scope.remove = function(id){
        console.log('remove');
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
    
    $scope.init = function(){
       console.log('init');
       $scope.getWalletList();
        
    }();
    
  });
