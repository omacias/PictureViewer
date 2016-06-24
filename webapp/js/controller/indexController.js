myApp.controller('indexController', ['$scope','photographers', 'message', function($scope, photographers, message){
  $scope.message = message;
  $scope.title = 'Picture Viewer';
  $scope.description = 'Check out our pictures taken around the world';
  $scope.redirectHome = function(){
    window.location = '/Home';
  };

  photographers.success(function(data){
    $scope.photographers = data;
  });

}]);

myApp.controller('albumsController', ['$scope', '$http', function($scope, $http){
   $http.get('/getAlbums').success(function(data){
    $scope.albums = data;
  }).error(function(err){
    console.log(err);
  });
}]);

myApp.controller('contactController', ['$scope', '$http', function($scope, $http){
  var hasError = 'has-error';
  var hide = 'hide';
  $scope.name = {
    validClass: hide,
    classError: '',
    value: ''
  };
  $scope.email = {
    validClass: hide,
    validEmailClass: hide,
    classError: '',
    value: ''
  };
  $scope.msgText = {
    validClass: hide,
    classError: '',
    value: ''
  };

  $scope.submitButton = function(){
    if($scope.validateInput($scope.name)
        && $scope.validateInput($scope.email)
          && $scope.validateInput($scope.msgText)){

      $http({
            url: "https://formspree.io/salvador.macias.91@gmail.com",
            data: {
              username: $scope.name.value,
              useremail: $scope.email.value,
              usermessage: $scope.msgText.value,
              appName: 'Picture_Viewer',
              _replyto: $scope.email.value
            },
            dataType: "json",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function(response){
            console.log(response);
        }).error(function(error){
            console.log(error);
        });
    }
    return false;
  };

  $scope.validateInput = function(field, validateEmail){
    if($.trim(field.value).length != 0){
      if(validateEmail == true){
        var validMail = validationEmail(field.value);
        field.validClass = hide;
        field.validEmailClass = validMail ? hide : '';
        field.classError = validMail ? '' : hasError;
        return validMail;
      }else{
        field.validClass = hide;
        field.classError = '';
        return true;
      }
    }else{
      field.validClass = '';
      field.classError = hasError;
      return false;
    }
  }

}]);

function validationEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
