myApp.service('message', function(){
  this.getMsg = function(key){
    if(messages.hasOwnProperty(key)){
      return messages[key];
    }
    return key;
  }
});
