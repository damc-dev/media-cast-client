angular.module('media.services', ['ngResource'])

.factory('ShowsResource', function($resource) {
  return $resource('http://localhost:4000/shows/:page')
})
.factory('ShowDetails', function($resource) {
  return $resource('http://localhost:4000/show/:id')
})
.factory('Playback', function($resource) {
  return $resource('http://localhost:3000/cast/magnet/:url')
});
