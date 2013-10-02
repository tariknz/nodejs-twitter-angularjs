'use strict';

/* Services */

angular.module('myApp.utils', [])
	.factory('utils', function () {
		return {
			disableForm: function (){
				$(document).find('input, textarea, button, select').attr('disabled','disabled');
				showLoader(true);
			},

			enableForm: function (){
				$(document).find('input, textarea, button, select').removeAttr('disabled');
				showLoader(false);
			}
		};

		function showLoader (show) {
			if(show)
				$('.loader-icon').show();
			else
				$('.loader-icon').hide();
		}

	});