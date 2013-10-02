'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services', 'myApp.config'])
	.controller('TwitterCtrl', ['$scope', 'socket', 'utils', function($scope, socket, utils) {
		$scope.searchTerm = '';
		$scope.status = 'Ready';
		$scope.tweets = [];

		//calls the socket (stream or search) service from the server (see socket service in services.js)
		$scope.stream = function(){
			console.log('streaming');

			//disable and clear tweets form while loading
			utils.disableForm();
			$scope.tweets = [];
			socket.emit('getLiveTweets', { streamType: 'track', query: $scope.searchTerm });
		}


		$scope.search = function(){
			console.log('searching');
			utils.disableForm();
			$scope.tweets = [];
			socket.emit('getTweetsBySearch', { query: $scope.searchTerm });
		}

		//recieving socket data from stream - bind the data to tweets array
		socket.on('twitter', function(data){
			$scope.status = 'Streaming ...';
			$scope.tweets.unshift(data);
		});

		//recieve socket data from search and bind to tweets array
		socket.on('twitter-search', function(data){
			$scope.status = 'Searching ...';
			console.log(data);
			$scope.tweets = data.statuses;
		});

		//when socket is done streaming/searching then enable the form again.
		socket.on('twitter-done', function(data){
			utils.enableForm();
			$scope.status = 'Done (' + $scope.tweets.length + ' tweets retrieved).';
		});

	}]);
