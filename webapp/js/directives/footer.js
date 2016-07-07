myApp.directive('footerApp', function(){
  return {
    restrict: 'E',
    scope: {description: '='},
    templateUrl: 'views/footerApp.html'
  };
});
