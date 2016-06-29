myApp.controller('albumsController', ['$scope', '$http', function($scope, $http){
   $http.get('/getAlbums').success(function(data){
    $scope.albums = data;
  }).error(function(err){
    showMessage('app_message_no_albums', 'E');
  });
}]);
