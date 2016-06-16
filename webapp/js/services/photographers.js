myApp.factory('photographers', ['$http', function($http){
  return $http.get('/getPhotographers').success(function(data){
    return data;
  }).error(function(err){
    return err;
  });
}]);
