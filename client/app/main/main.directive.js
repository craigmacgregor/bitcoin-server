'use strict';

angular.module('bitcoinServerApp')
  .directive('mainDirective', function(){
           
    return {
       link: function(scope, elm, attrs, ctrl) {
           
           elm.on('click', 'button.submit', function(event){
               
               event.preventDefault();
               
               scope.submit();
           });
           
           elm.on('click', 'button.qrcode', function(event){
                              
               event.preventDefault();
               
               var address = angular.element(event.currentTarget).parents('tr')[0].attributes["data-address"].value;
               scope.$apply(function(){
                
                    scope.qrcodeAddress = address;
                    scope.openModal();
                   
               });                      
               
           });
           
           elm.on('click', 'button.add', function(event){
              
               scope.add();
               
           });
           
       }       
   };
});