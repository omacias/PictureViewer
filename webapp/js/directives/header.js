myApp.directive('headerApp', function(){
  return {
    restrict: 'E',
    scope: {title: '=', description: '=', eventHandler: '&ngClick'},
    templateUrl: 'views/headerApp.html'
  };
});
