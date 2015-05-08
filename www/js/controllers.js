angular.module('starter.controllers', ['media.services'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('HomeCtrl', function($scope) {})

.controller('ShowsCtrl', function($scope, ShowsResource) {
  $scope.shouldShowReorder = true;
  $scope.shows = ShowsResource.query({page: 1});
})
.controller('ShowDetailCtrl', function($scope, $stateParams, ShowDetails) {
  console.log($stateParams);
  $scope.show = ShowDetails.get({id: $stateParams.showId});
})
.controller('PlaybackCtrl', function($scope, $stateParams, ShowDetails, Playback) {
  console.log($stateParams)
  $scope.playback = {};
    //$scope.details.title = $stateParams.title;
  ShowDetails.get({id: $stateParams.showId}).$promise.then(function(show) {
    $scope.show = show;
    console.log(show);
    $scope.episode = show.episodes[$stateParams.episodeIndex];
    console.log($scope.episode);
    $scope.playback.status = Playback.get({ url: $scope.episode.torrents[0].url})
    .$promise.then(
      function(status) { console.log(status); });
    console.log($scope.playback);
  });


});
