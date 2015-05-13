angular.module('socket.services', ['btford.socket-io'])
.value('SOCKET_URL', 'localhost:3000')
.factory('socket', function (socketFactory, SOCKET_URL, $rootScope) {
  var socket = io.connect(SOCKET_URL);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  }
});
