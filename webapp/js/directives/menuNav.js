myApp.directive('menuNav', function(){
  return {
    restrict: 'E',
    scope: {
      title: '=',
      home: '=',
      photographers: '=',
      albums: '=',
      contact: '='
    },
    templateUrl: 'views/menuNav.html'
  };
});
