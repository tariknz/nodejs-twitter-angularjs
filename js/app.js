'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers', 'myApp.config', 'myApp.utils'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider,  $locationProvider) {
		//$locationProvider.html5Mode(true);
		$routeProvider
		.when('/',
			{
				templateUrl: '/query/partials/twitter.html',
				controller: 'TwitterCtrl'
			}
		)

		$routeProvider.otherwise({redirectTo: '/'});
	}])
	.run(function($rootScope, $templateCache) {
		//don't cache partials - reload them when changed
		$rootScope.$on('$viewContentLoaded', function() {
			$templateCache.removeAll();
		});
	});
