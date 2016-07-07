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

      showLoadingModal();
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
            showMessage('app_message_mail_sent', 'S');
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
        }).error(function(error){
            showMessage('app_message_something_wrong', 'E');
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
