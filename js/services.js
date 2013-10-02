'use strict';

/* Services */

angular.module('myApp.services', ['myApp.config', 'myApp.utils'])
	.value('version', '0.1')
	.factory('socket', ['$rootScope', 'TWITTER_SERVICE_URL', function ($rootScope, TWITTER_SERVICE_URL) {
		var socket = io.connect(TWITTER_SERVICE_URL); //set in config.js
		return {
			//recieve
			on: function (eventName, callback) {
				socket.on(eventName, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			},

			//send
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
		};
	}]);