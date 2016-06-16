myApp.controller('indexController', ['$scope','photographers', function($scope, photographers){
  $scope.title = 'Picture Viewer';
  $scope.description = 'Check out our pictures taken around the world';
  $scope.redirectHome = function(){
    window.location = '/Home';
  };

  photographers.success(function(data){
    $scope.photographers = data;
  });

}]);
