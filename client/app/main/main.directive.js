'use strict';

angular.module('bitcoinServerApp')
  .directive('mainDirective', function(){
    return {
       link: function(scope, elm, attrs, ctrl) {
           
           elm.on('click', 'button.submit', function(event){
               
               event.preventDefault();
               
               scope.submit();
           });
           
           elm.on('click', 'button.remove', function(event){
               
               var id = angular.element(event.currentTarget).parents('tr')[0].attributes["data-id"].value;
               
               event.preventDefault();
               
               scope.remove(id);
           });
           
       }       
   };
});