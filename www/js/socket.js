angular.module('socket.services', ['btford.socket-io'])

.factory('socket', function (socketFactory) {
  return socketFactory();
});
