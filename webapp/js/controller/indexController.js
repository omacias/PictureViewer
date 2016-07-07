myApp.controller('indexController', ['$scope', 'photographers', function($scope, photographers){
  $scope.redirectHome = function(){
    window.location = '/Home';
  };

  photographers.success(function(data){
    $scope.photographers = data;
  });
}]);
