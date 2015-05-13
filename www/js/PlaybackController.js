angular.module('playback.controller', ['media.services', 'utils.storage', 'socket.services'])
.controller('PlaybackCtrl', function($scope, $stateParams, ShowDetails, Playback, socket) {
  $scope.status = "starting";
  $scope.down = "";
  $scope.up = "";
  $scope.downSpeed = "";
  $scope.upSpeed = "";

  ShowDetails.get({id: $stateParams.showId}).$promise.then(function(show) {
    $scope.show = show;
    console.log($scope.show);

    for(var i = 0; i < show.episodes.length; i++) {
      var episode = show.episodes[i];
      if(episode['season'] == $stateParams.season && episode['episode'] == $stateParams.episode) {
        $scope.episode = episode;
      }
    }
    //$scope.episode = show.episodes[$stateParams];
    console.log($scope.episode);
    socket.emit('playback:stream', {
      magnetUrl: $scope.episode.torrents[0].url
    });
    setInterval(function() {
      socket.emit('status:update', {});
    }, 2000);
    socket.emit('status:update', {});
  });

  socket.on('status:change', function(data) {
    console.log(data);
    $scope.status = data.status;
    $scope.down = data.down;
    $scope.up = data.up;
    $scope.downSpeed = data.downSpeed;
    $scope.upSpeed = data.upSpeed;
  });

    //$scope.details.title = $stateParams.title;
});
