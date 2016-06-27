myApp.controller('indexController', ['$scope', '$timeout','photographers', 'message', function($scope, $timeout, photographers, message){
  $scope.message = message;
  $scope.redirectHome = function(){
    window.location = '/Home';
  };

  photographers.success(function(data){
    $scope.photographers = data;
  });

  $scope.modalHeader = "";
  $scope.modalMessage = "";
  $scope.modalIcon = "";
  $scope.modalIconColor = "";

  $scope.showSuccessMessage = function(msj){
    closeLoadingModal();
    $timeout(function() {
      $scope.modalHeader = message.getMsg('app_modal_header_success');
      $scope.modalMessage = msj;
      $scope.modalIcon = 'fa-check-square-o';
      $scope.modalIconColor = '#4CAF50';
      jQuery('#myModal').modal('show');
    }, 500);
  };

  $scope.showErrorMessage = function(msj){
    closeLoadingModal();
    $timeout(function() {
      $scope.modalHeader = message.getMsg('app_modal_header_error');
      $scope.modalMessage = msj;
      $scope.modalIcon = 'fa-exclamation-triangle';
      $scope.modalIconColor = '#ED1B2E';
      $scope.$apply();
      jQuery('#myModal').modal('show');
    }, 500);
  };

  $scope.showInfoMessage = function(msj){
    closeLoadingModal();
    $timeout(function() {
      $scope.modalHeader = message.getMsg('app_modal_header_info');
      $scope.modalMessage = msj;
      $scope.modalIcon = 'fa-info-circle';
      $scope.modalIconColor = '#4169E1';
      $scope.$apply();
      jQuery('#myModal').modal('show');
    }, 500);
  };

}]);

function showMessage(message, type){
  if(type == 'I'){
    angular.element($('body')).scope().showInfoMessage(message);
  }else if (type == 'S') {
    angular.element($('body')).scope().showSuccessMessage(message);
  }else if (type == 'E') {
    angular.element($('body')).scope().showErrorMessage(message);
  }
}

function showLoadingModal(){
  $('#loadingModal').modal({
    backdrop: 'static',
    keyboard: false
  })
}

function closeLoadingModal(){
  $('#loadingModal').modal('hide');
}

myApp.controller('albumsController', ['$scope', '$http', function($scope, $http){
   $http.get('/getAlbums').success(function(data){
    $scope.albums = data;
  }).error(function(err){
    showMessage('We Couldn´t Load Albums, Try Later, ', 'E');
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
            showMessage('Mail Sent Successfully!', 'S');
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
            showMessage('Something Went Wrong, Try Again Later', 'E');
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
