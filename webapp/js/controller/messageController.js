myApp.controller('messageController', ['$scope', 'message', '$timeout', function($scope, message, $timeout){
  $scope.message = message;

  $scope.modalHeader = "";
  $scope.modalMessage = "";
  $scope.modalIcon = "";
  $scope.modalIconColor = "";

  $scope.showSuccessMessage = function(msj){
    closeLoadingModal();
    $timeout(function() {
      $scope.modalHeader = message.getMsg('app_modal_header_success');
      $scope.modalMessage = message.getMsg(msj);
      $scope.modalIcon = 'fa-check-square-o';
      $scope.modalIconColor = '#4CAF50';
      jQuery('#myModal').modal('show');
    }, 500);
  };

  $scope.showErrorMessage = function(msj){
    closeLoadingModal();
    $timeout(function() {
      $scope.modalHeader = message.getMsg('app_modal_header_error');
      $scope.modalMessage = message.getMsg(msj);
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
      $scope.modalMessage = message.getMsg(msj);
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
