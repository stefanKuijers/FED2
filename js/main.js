/* filename: js/main.js */

//Include "use strict"; as the first statement in a wrapping function, so it only affects that function. 
//This prevents problems when concatenating scripts that aren't strict.
(function () {
	"use strict";
	// Require.js allows us to configure shortcut alias
	require.config({
		paths: {
			text: 'libs/require/text',
			templates: '../templates'
		}
	});

	require([
		// Load our app module and pass it to our definition function
		'app'

		// Some plugins have to be loaded in order due to their non AMD compliance
		// Because these scripts are not "modules" they do not pass any values to the definition function below
	], function (App) {
		// The "app" dependency is passed in as "App"
		// Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
		App.initialize();
	});

}());

/*
BUGS
GAME PAGE
after filtering the filter only displays default



*/